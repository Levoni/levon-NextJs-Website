'use client';
import { useState } from "react";
import '../app/test.css'
import { ResetPassword, StartPasswordReset } from "./service_fetch";


export default function PasswordReset(props:any) {
    const [statusMessage, setStatusMessage] = useState('')

    //Make server end call out to api by giving submit function prop to this component
    const handleSubmit = async (event:any) => {
        event.preventDefault()
        var password = event.target.password.value
        var password2 = event.target.password2.value
        if(password != password2) {
            setStatusMessage('Passwords do not match')
            return
        }
        var result = await ResetPassword(password,props.resetCode)
        setStatusMessage(result.responseMessage)
    }


    return( 
    <div className="login-card">
        <form className="card-header" style={{display:'flex',flex:'1', flexDirection:'column'}} action="/test" method='post' onSubmit={handleSubmit}>
            <div style={{marginBottom:'10px',flex:'.1', alignSelf:'center'}}>Reset Password</div>
            <div style={{display:'flex', justifyContent:'space-around', flex:'1', flexDirection:'column'}}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>Password</div>
                    <input className="big-input" id="password" type="password" name="password"/>
                </div>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>Re-Type Password</div>
                    <input className="big-input" id="password2" name="password2" type="password"/>
                </div>
                <button className="big-button" >Login</button>
                <div className="body-text" style={{paddingTop:'10px', display:'flex',flex:'.1'}}>
                    <a href="/login">Login Page</a>
                </div>
                <div className="body-text" style={{paddingTop:'10px', display:'flex', flex:'.5',flexDirection:'row'}}>
                    <div style={{paddingLeft:'20px', flex:'1', alignSelf:'center'}}>{statusMessage}</div>
                </div>
            </div>
        </form>
    </div>
    )
}