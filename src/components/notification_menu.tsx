'use client';
import  Notification  from "@/components/notification"
import notificationImage from "@/public/notification.png"
import { GetNotifications, GetOrderedUsers } from "./service_fetch";
import { useEffect, useState } from "react";

export default function NotificationMenu(props:any) {
    const [notifications,setNotifications] = useState<Array<any>>([])
    
    useEffect(()=>{
        let getData = async () => {
            try{
                let result = await GetNotifications(props.token,props.userName)
                if(result.success) {
                    if(notifications.length == 0){
                        setNotifications((prev:any) => {return result.rows})
                    }
                }
            } catch(ex) {
                console.log(ex)
            }
        }
        getData()
    },[])

    return <div className="header-bar-item" style={{paddingRight:'10px', position:'relative'}}>
            <div style={{width:'25px',height:'25px', backgroundSize:'cover', backgroundImage:`url(${notificationImage.src})`}}></div>
            <div>
                {notifications.length > 0 && <div style={{position:'absolute', top:'-5px', right:'0px', color:'white', backgroundColor:'red',borderRadius:'25px', fontSize:'1rem', fontWeight:'bold'}}>{notifications.length}</div>}
                {(notifications && notifications.length > 0) && <div className="card notification-menu header-bar-item-options" style={{minWidth:'200px', backgroundColor:'#222526', position:'absolute', top:'100%',right:'0px'}}>
                    {notifications.map((element, index) => {
                        return (
                            <Notification key={'notification'+index} type={element.type} message={element.message} link={element.link}></Notification>
                        )
                    })}    
                </div>}
                <div></div>
            </div>

        </div>
}