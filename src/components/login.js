'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddLoginCookie } from '@/components/server_actions'
import '../app/test.css'


export default function Login() {
    const router = useRouter();
    const [statusMessage, setStatusMessage] = useState('')

    //Make server end call out to api by giving submit function prop to this component
    const handleSubmit = async event => {
        event.preventDefault()
        var name = event.target.name.value
        var password = event.target.password.value
        var newUser = event.target.signUp.checked
        var url = process.env.API_URL
        url += newUser ? '/signup' : '/login'
        let body = {"name":name,"password":password}
        const data = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
        let content = await data.json().catch((e) => {
            console.log(e)
        })
        if(data.status == 200) {
            localStorage.setItem("numberGuessToken",content.token)
            localStorage.setItem("userName",name.toLowerCase())
            await AddLoginCookie(content.token)
            router.push('/')
            return
        } else if(data.status == 400) {
            setStatusMessage(content.error)
        } else if (data.status== 500) {
            setStatusMessage(`Error occurred: ${content.error}`)
        }
        else {
            setStatusMessage(`Error occurred`)
            console.log(content)
        }
    }


    return( 
    <div className="login-card">
        <form className="card-header" style={{display:'flex',flex:'1', flexDirection:'column'}} action="/test" method='post' onSubmit={handleSubmit}>
            <div style={{marginBottom:'10px',flex:'.1', alignSelf:'center'}}>Login</div>
            <div style={{display:'flex', justifyContent:'space-around', flex:'1', flexDirection:'column'}}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>User Name</div>
                    <input className="big-input" id="name" type="text" name="name"/>
                </div>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', flex:'1'}}>
                    <div style={{paddingBottom:'10px'}}>Password</div>
                    <input className="big-input" id="password" name="password" type="text"/>
                </div>
                <button className="big-button" >Login</button>
                <div className="body-text" style={{paddingTop:'10px', display:'flex', flex:'.5',flexDirection:'row'}}>
                    <div style={{paddingRight:'5px', alignSelf:'center'}}>New User</div>
                    <input className="big-checkbox" id="signUp" name="signUp" type="checkbox"/>
                    <div style={{paddingLeft:'20px', flex:'1', alignSelf:'center'}}>{statusMessage}</div>
                </div>
            </div>
        </form>
    </div>
    )
}