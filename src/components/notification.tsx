'use client';
import { useRouter } from "next/navigation";

export default function Notification(props:any) {
    const router = useRouter()
    var notification:Array<any> = []

    const handleClick = () => {
        router.push(props.link)
    }

    return <div className="notification-hover notification" onClick={handleClick} style={{cursor:'pointer'}}>
        <div>{props.type}</div>
        <div className="small-text" style={{paddingLeft:'5px'}}>{props.message}</div>
    </div>
}