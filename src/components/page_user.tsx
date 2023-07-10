'use client';

import { useState } from "react";
import { SendUserSocialupdate } from "./service_fetch";
import SocialSettings from "./social_settings";

export default function PageUserWrapper(props:any) {
    const [user,setUser] = useState(props.user)

    const handleSave = async () => {
        let resuts = await SendUserSocialupdate(props.token, user.public)
    }

    const socialUpdateCallback = (isPublic:boolean) => {
        setUser({
            ...user,
            public:isPublic
        })
    }

    return (
        <div>
                <SocialSettings socialUpdateCallback={socialUpdateCallback} shared={user.public}></SocialSettings>
                <div>
                    <button onClick={handleSave}>Save</button>
                </div>
        </div>
    )
}