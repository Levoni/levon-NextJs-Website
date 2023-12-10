'use client';

import { useState } from "react";

export default function PasswordResetSettings(props:any) {
    const [email, setEmail] = useState(props.email)

    const handleEmailChange = async (e:any) => {
        setEmail(e.target.value)
        if(props.emailUpdateCallback) {
            props.emailUpdateCallback(e.target.value)
        }
    }

    return (
    <div className="column">
        <div className="card-header">Password Reset</div>
        <div className="row">
            <div style={{paddingLeft:'5px'}}>Email</div>
            <input value={email} onChange={handleEmailChange} type="text"/>
            <div style={{fontSize:'.8rem',paddingLeft:'5px'}}>Used for recovery purposes only</div>
        </div>
    </div>
    )
}