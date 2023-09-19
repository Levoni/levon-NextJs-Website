'use client';

import { useState } from "react";

export default function SocialSettings(props:any) {
    const [shared, setShared] = useState(props.shared)

    const handleSharedChange = async (e:any) => {
        setShared(e.target.checked)
        if(props.socialUpdateCallback) {
            props.socialUpdateCallback(e.target.checked)
        }
    }

    return (
    <div className="column">
        <div className="card-header">Social</div>
        <div className="row">
            <div style={{paddingLeft:'5px'}}>Allow Others Viewers to See your User</div>
            <input checked={shared} onChange={handleSharedChange} type="checkbox"/>
        </div>
    </div>
    )
}