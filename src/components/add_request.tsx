'use client';
import { useState } from "react"

export default function AddRequest(props:any) {
    const [request,setRequest] = useState({type:'',message:''})

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

    const handleSubmit = (e:any) => {

    }

    return (
        <div className="card column">
            <div>Request Type:</div>
            <select onChange={handleTypeChange} style={{maxWidth:'max-content'}}>
                <option>plex</option>
                <option>website</option>
                <option>suggestion</option>
            </select>
            <div>Message:</div>
            <textarea onChange={handleMessageChange}/>
            <button onClick={handleSubmit}>Submit Request</button>
        </div>
    )
}