'use client';
import { useState } from "react"
import { sendAddRequest } from "./service_fetch";
import Request from "@/data/request";

export default function AddRequest(props:any) {
    const [request,setRequest] = useState({type:'plex',message:'', user_name:props.user.name})
    const [status,setStatus] = useState('')

    const handleTypeChange = (e:any) => {
        setRequest({
            ...request,
            type:e.target.value
        })
    }

    const handleMessageChange = (e:any) => {
        setRequest({
            ...request,
            message:e.target.value
        })
    }

    const handleSubmit = async (e:any) => {
        let result = await sendAddRequest(props.token,{...request})
        setStatus(result.responseMessage)
        if(result.success && props.submitRequestCallback) {
            console.log(result)
            let newRequest = new Request(result.responseObject.id,request.type, request.message,request.user_name, new Date(), false)
            console.log(newRequest)
            props.submitRequestCallback(newRequest)
        } else {
            props.submitRequestCallback(null)
        }
    }

    return (
        <div className="virtical-div-list card column">
            <div className="row">
                <div>Request Type:</div>
                <select onChange={handleTypeChange} style={{maxWidth:'max-content'}}>
                    <option>plex</option>
                    <option>website</option>
                    <option>suggestion</option>
                    <option>misc</option>
                </select>
            </div>
            <div>Message:</div>
            <div style={{display:'flex', flex:'1'}}>
                <textarea style={{flex:'1'}} onChange={handleMessageChange}/>
            </div>
            <div>
                <button onClick={handleSubmit}>Submit Request</button>
            </div>
            {status && <div>{status}</div>}
        </div>
    )
}