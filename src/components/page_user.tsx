'use client';

import { useState } from "react";
import { SendUserNotificationPreferenceUpdate, SendUserSocialupdate } from "./service_fetch";
import SocialSettings from "./social_settings";
import NotificationPreferenceSettings from "./settings_preference";
import NotificationPreferece from "@/data/notification_preference";

export default function PageUserWrapper(props:any) {
    const [user,setUser] = useState(props.user)
    const [notificationPreference,setNotificationPreference] = useState(props.notificationPreference)

    const handleSave = async () => {
        let resuts = await SendUserSocialupdate(props.token, user.public)
        let notificationResults = await SendUserNotificationPreferenceUpdate(props.token,notificationPreference)
    }

    const socialUpdateCallback = (isPublic:boolean) => {
        setUser({
            ...user,
            public:isPublic
        })
    }

    const notificationUpdateCallback = (preference:NotificationPreferece) => {
        console.log(preference)
        setNotificationPreference({
            ...notificationPreference,
            daily_guess:preference.daily_guess,
            tot_game:preference.tot_game
        })
    }

    return (
        <div className="column" style={{gap:'50px'}}>
                <SocialSettings socialUpdateCallback={socialUpdateCallback} shared={user.public}></SocialSettings>
                <NotificationPreferenceSettings notificationUpdateCallback={notificationUpdateCallback} preference={notificationPreference}></NotificationPreferenceSettings>
                <div>
                    <button onClick={handleSave}>Save</button>
                </div>
        </div>
    )
}