'use client';
import { useState } from "react"
import { sendAddRequestMessage, retriveRequestMessages, sendUpdateRequestStatus } from "./service_fetch";
import RequestMessage from "@/data/request_message";

export default function RequestResults(props:any) {
    const [isOpen,setIsOpen] = useState(false)
    const [messages,setMessages] = useState<Array<RequestMessage>>([])
    const [requestMessageParams, setRequestMessageParams] = useState<RequestMessage>(new RequestMessage(0,props.item.id,'',props.user.name,new Date()))
    const [status, setStatus] = useState('')

    const handleMessageClick = async (e:any) => {
        setIsOpen(!isOpen)
        if(messages.length == 0) {
            setMessages(await retriveRequestMessages(props.token,props.item.id))
        }
    }

    const handleMessageSubmit = async (e:any) => {
        let response = await sendAddRequestMessage(props.token, {id:requestMessageParams.request_id,message:requestMessageParams.message, user_name:requestMessageParams.user_name})
        if(response.success) {
            setStatus(response.responseMessage)
            setMessages([
                ...messages,
                new RequestMessage(0,requestMessageParams.request_id,requestMessageParams.message,requestMessageParams.user_name,new Date())
            ])
        }
    }

    const handleMessageChange = async (e:any) => {
        await setRequestMessageParams({
            ...requestMessageParams,
            message: e.target.value
        })
    }

    const handleChangeStatusButtonClick = async (e:any) => {
        e.stopPropagation();
        let result = await sendUpdateRequestStatus(props.token,{closed:!props.item.closed, id: props.item.id})
        //TODO: figure out how to show updated closed status
        if(result.success) {
            if(props.ChangeStatusHook) {
                props.ChangeStatusHook(props.item.id,!props.item.closed)
            }
        }
    }

                return(
                    <div className="virtical-div-list card">
                        <div className="virtical-div-list column" onClick={handleMessageClick}>
                        <button onClick={handleChangeStatusButtonClick} style={{alignSelf:'flex-end', cursor:'pointer'}}>{props.item.closed ? 'reopen request': 'close request'}</button>
                            <div className="row" style={{display:'flex', justifyContent:'space-around', paddingBottom:'20px'}}>
                                <div>Request Id: {props.item.id}</div>
                                <div>Request User: {props.item.user_name}</div>
                                <div>Request type: {props.item.type}</div>
                                <div>Request Date: {props.item.created_date}</div>
                            </div>
                            <div className="row">
                                <div>Request message: {props.item.message}</div>
                            </div>
                        </div>
                        {(messages && isOpen) && 
                            <div style={{borderBottom:'1px solid #2d3436', marginTop:'10px',marginBottom:'10px'}}>
                            
                            </div>}
                        {(messages && isOpen) && messages.map((element:any, index:number) => {
                            return (
                                <div key={index}>
                                    <div style={{paddingLeft: element.user_name != props.user.name ? '10px' : ''}}>
                                        {element.user_name}: {element.message}
                                    </div>
                                </div>
                            )
                        })}
                        {isOpen && 
                            <div className="row">
                                <div>Respond:</div>
                                <input onChange={handleMessageChange}/>
                                <button onClick={handleMessageSubmit}> Send Message</button>
                                {status && <div style={{paddingLeft:'10px'}}>{status}</div>}
                            </div>
                        }
                    </div>
                )
}