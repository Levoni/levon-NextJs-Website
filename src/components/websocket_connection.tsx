'use client';

import { useEffect, useRef, useState } from "react";

export default function WebSocketConnection(props:any) {
    const [joinPin, setJoinPin]= useState('')
    //0:not connected,1:connected,2:roomed
    const [connectionStatus,setConnectionStatus] = useState(0)
    const wss = useRef<WebSocket|null>(null)
    const [lastMessage,setLastMessage] = useState('')

    useEffect(() => {
        if(wss.current!= null && props.nextMessage != lastMessage) {
            console.log(props.nextMessage)
            setLastMessage(props.nextMessage)
            wss.current!!.send(props.nextMessage)
        }
    },[props.nextMessage])

    useEffect(() => {
        if(wss.current != null) {
            wss.current.onmessage = (e) => props.recieveCallback(e)
        }
    },[props.recieveCallback])

    async function connectSocket(joinPin:string) {
        wss.current = new WebSocket(process.env.SOCKET_URL!!)
        wss.current.onopen = (event:any) => {
            console.log('connection with ws made')
            setConnectionStatus(1)
            wss.current?.send(`{"action":"join","type":"${props.type}","pin":"${joinPin}","name":"${props.user.name}"}`)
        }

        wss.current.onerror = (error:any) => {
            console.log('caught error')
            console.log(error)
        }
        wss.current.onmessage = (e) => {props.recieveCallback(e)}
    }

    const handlePinChange = (e:any) => {
        setJoinPin(e.target.value)
    }

    const handleJoin = () => {
        if(connectionStatus == 0) {
            connectSocket(joinPin)
        } else {
            wss.current?.send(`{"action":"sync"}`)
        }
    }

    return (
        <div className="row">
            <div>Room Id:</div>
            <input disabled={connectionStatus != 0} value={joinPin} onChange={handlePinChange}/>
            <button onClick={handleJoin}>{connectionStatus == 1 ? 'Sync' : 'Join'}</button>
        </div>
    )
}