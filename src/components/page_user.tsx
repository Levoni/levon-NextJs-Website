'use client';

import { useState } from "react";
import { SendUserEmailUpdate, SendUserNotificationPreferenceUpdate, SendUserSocialupdate } from "./service_fetch";
import SocialSettings from "./social_settings";
import NotificationPreferenceSettings from "./settings_preference";
import NotificationPreferece from "@/data/notification_preference";
import PasswordResetSettings from "./password_reset_settings";

export default function PageUserWrapper(props:any) {
    const [user,setUser] = useState(props.user)
    const [notificationPreference,setNotificationPreference] = useState(props.notificationPreference)
    const [responseMessage, setResponseMessage] = useState('')

    const handleSave = async () => {
        let resuts = await SendUserSocialupdate(props.token, user.public)
        let notificationResults = await SendUserNotificationPreferenceUpdate(props.token,notificationPreference)
        let emailResults = await SendUserEmailUpdate(props.token,user.email)
        if(resuts.success && notificationResults.success && emailResults.success) {
            setResponseMessage('Saved all preferences')
        } else {
            console.log(`shared: ${resuts.responseMessage}, notification: ${notificationResults.responseMessage}, email: ${emailResults.responseMessage}` )
            setResponseMessage(`Failed to save preferences ${resuts.success ? '' : 'social'} - ${notificationResults.success ? '' : 'notification'} - ${emailResults.success ? '' : 'email'}`)
        }
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

    const emailUpdateCallback = (email:string) => {
        setUser({
            ...user,
            email:email
        })
    }

    return (
        <div className="column" style={{gap:'50px'}}>
                <SocialSettings socialUpdateCallback={socialUpdateCallback} shared={user.public}></SocialSettings>
                <NotificationPreferenceSettings notificationUpdateCallback={notificationUpdateCallback} preference={notificationPreference}></NotificationPreferenceSettings>
                <PasswordResetSettings email={user.email} emailUpdateCallback={emailUpdateCallback}></PasswordResetSettings>
                <div className="row">
                    <button onClick={handleSave}>Save</button>
                    <div style={{paddingLeft:'10px'}}>{responseMessage}</div>
                </div>
        </div>
    )
}