'use client';

import NotificationPreferece from "@/data/notification_preference";
import { useState } from "react";

export default function NotificationPreferenceSettings(props:any) {
    const [preference, setPreference] = useState(new NotificationPreferece('',props.preference.daily_guess,props.preference.tot_game))

    const handleDailyGameChange = async (e:any) => {
        let nextPreference = {
            ...preference,
            daily_guess:e.target.checked
        }
        setPreference(nextPreference)
        if(props.socialUpdateCallback) {
            props.notificationUpdateCallback(nextPreference)
        }
    }

    const handleTotGameChange = async (e:any) => {
        console.log(e.target.checked)
        console.log(preference)
        let nextPreference = {
            ...preference,
            tot_game:e.target.checked
        }
        setPreference(nextPreference)
        if(props.notificationUpdateCallback) {
            props.notificationUpdateCallback(nextPreference)
        }
    }

    return (
        <div className="column">
            <div className="card-header">Notification Preferences</div>
            <div className="row" style={{paddingLeft:'5px'}}>
                <div>Recieve Daily Guess Notifications</div>
                <input checked={preference.daily_guess} onChange={handleDailyGameChange} type="checkbox"/>
            </div>
            <div className="row" style={{paddingLeft:'5px'}}>
                <div>Recieve Tot Game Notifications</div>
                <input checked={preference.tot_game} onChange={handleTotGameChange} type="checkbox"/>
            </div>
            {/* <div className="row">
                <div>Recieve Daily Result Notifications</div>
                <input checked={shared} onChange={handleSharedChange} type="checkbox"/>
            </div> */}
        </div>
    )
}