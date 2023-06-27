'use client';
import { useState } from "react"
import { retriveRequestMessages } from "./service_fetch";

export default function RequestResults(props:any) {
    const [isOpen,setIsOpen] = useState(false)
    const [messages,setMessages] = useState([])

    const handleMessageClick = async (e:any) => {
        if(messages.length == 0) {
            setMessages(await retriveRequestMessages(props.token,props.item.id))
        }
    }

                return(
                    <div onClick={handleMessageClick} className="card">
                        <div className="row">
                            <div>Request Id: {props.item.id}</div>
                        </div>
                        <div className="row">
                            <div>Request type: {props.item.type}</div>
                        </div>
                        <div className="row">
                            <div>Request message: {props.item.message}</div>
                        </div>
                        <div className="row">
                            <div>Request Date: {props.item.created_date}</div>
                        </div>
                        <br/>
                        {messages.map((element:any, index:number) => {
                            return (
                                <div key={index}>
                                    {element.user_name}: {element.message}
                                </div>
                            )
                        })}
                    </div>
                )
}