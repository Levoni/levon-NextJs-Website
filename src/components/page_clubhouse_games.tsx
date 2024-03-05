'use client';
import {  useEffect, useMemo, useRef, useState } from "react";
import WebSocketConnection from "./websocket_connection";
import TicTacToe from "./tic_tac_toe";
import Stratego from "./stratego";
import Buzzer from "./buzzer";



export default function PageClubhouseWrapper(props:any) {
    const [clientMessage, setClientMessage]= useState('')
    const [selectedGameType, setSelectedGameType] = useState('')
    const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('')
    const [lastSocketMessage, setLastSocketMessage] = useState<any>(null)
    const [state, setState] = useState('not connected')

    useEffect(() => {
        handleRecieveCallback = handleRecieveMessage
        SendMessageCallback = handleSendMessagecallback
        if(document.getElementById('textArea')) {
            document.getElementById('textArea')!!.scrollTop = document.getElementById('textArea')!!.scrollHeight 
        }
    },[lastSocketMessage, messages])
    
    const handleRecieveMessage = (message:MessageEvent<any>) => {
        let object = JSON.parse(message.data)
        if(object.action == 'message') {
            setMessages(
                 [...messages, object.message]
            )
        } else if (object.action == 'connection') {
            setState('connected')
        } else if (object.action == 'start') {
            setState('started')
        }
        setLastSocketMessage(message)
    }

    const handlemessageChange = (e:any) => {
        setMessage(e.target.value)
    }

    const handleStart = () => {
        setClientMessage(`{"action":"start"}`)
    }

    const handleSendMessage = () => {
            setClientMessage(`{"action":"message","message":"${message}"}`)
            setMessage('')
    }

    const handleTypeChange = (e:any) => {
        setSelectedGameType(e.target.value)
    }

    const handleSendMessagecallback = (e:string) => {
        setClientMessage(e)
    }

    function handleKeyPress(e:any) {
        const code = e.keyCode ? e.keyCode : e.which
        if(code == 13) {
            handleSendMessage()
        }
    }

    //Do this so useEffect can refresh the method so we get the latest State for the GaseState
    let handleRecieveCallback = handleRecieveMessage
    let SendMessageCallback = handleSendMessagecallback

    return (
    <div className="body-padding row" style={{flexWrap:'wrap'}}>
        <div className="column" style={{flex:'1'}}>
            {state == 'not connected' ? <div className="row">
                <div>Game Type</div>
                <select value={selectedGameType} onChange={handleTypeChange}>
                    <option value={''}>None</option>
                    <option value={'ttt'}>tic-tac-toe</option>
                    <option value={'stratego'}>stratego</option>
                    <option value={'buzzer'}>buzzer</option>
                </select>
            </div> : null}
            {selectedGameType != '' && <WebSocketConnection nextMessage={clientMessage} recieveCallback={handleRecieveCallback} type={selectedGameType} user={props.user} ></WebSocketConnection>}
            {state != 'not connected' ? <div className="column" style={{flex:1}}>
                <div>Chat</div>
                <div>
                    <textarea className="body-text"  id="textArea"  value={messages.join('\r\n')} disabled={true}></textarea>
                </div>
                <div>
                    <div>Message:</div>
                    <input value={message} onKeyDown={handleKeyPress} onChange={handlemessageChange}/>
                    <button onClick={handleSendMessage}>Send</button>
                </div>
                <div>
                    <button disabled={state == 'started'} onClick={handleStart}>Start</button>
                </div>
            </div> : null}
        </div>
        {selectedGameType == 'ttt' && <TicTacToe SendMessageCallback={SendMessageCallback} lastMessage={lastSocketMessage}></TicTacToe>}
        {selectedGameType == 'stratego' && <Stratego SendMessageCallback={SendMessageCallback} lastMessage={lastSocketMessage}></Stratego>}
        {selectedGameType == 'buzzer' && <Buzzer SendMessageCallback={SendMessageCallback} lastMessage={lastSocketMessage}></Buzzer>}
    </div>
    )
}