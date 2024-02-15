'use client';
import { useState } from "react";
import '../app/test.css'
import { StartPasswordReset } from "./service_fetch";


export default function ResetStart(props:any) {
    const [statusMessage, setStatusMessage] = useState('')

    //Make server end call out to api by giving submit function prop to this component
    const handleSubmit = async (event:any) => {
        event.preventDefault()
        var name = event.target.name.value
        var email = event.target.email.value
        var result = await StartPasswordReset('',name,email)
        setStatusMessage(result.responseMessage)
    }


    return( 
    <div className="login-card">
        <form className="card-header" style={{display:'flex',flex:'1', flexDirection:'column'}} action="/test" method='post' onSubmit={handleSubmit}>
            <div style={{marginBottom:'10px',flex:'.1', alignSelf:'center'}}>Start Reset</div>
            <div style={{display:'flex', justifyContent:'space-around', flex:'1', flexDirection:'column'}}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>User Name</div>
                    <input className="big-input" id="name" type="text" name="name"/>
                </div>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>Email</div>
                    <input className="big-input" id="email" name="email" type="email"/>
                </div>
                <button className="big-button" >Send Email</button>
                <div className="body-text" style={{paddingTop:'10px', display:'flex', flex:'.5',flexDirection:'row'}}>
                    <div style={{paddingLeft:'20px', flex:'1', alignSelf:'center'}}>{statusMessage}</div>
                </div>
            </div>
        </form>
    </div>
    )
}