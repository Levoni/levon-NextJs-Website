'use client';
import {  useEffect, useState } from "react";
import TicTacToe from "./tic_tac_toe";
import Stratego from "./stratego";
import { sendTotGameAction } from "./service_fetch";
import TicTacToeGame from "@/data/tic_tac_toe";
import StrategoGame from "@/data/stratego";



export default function PageTotGameWrapper(props:any) {
    const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('')
    const [returnQueue, setReturnQueue] = useState<Array<any>>([])
    const [lastSocketMessage, setLastSocketMessage] = useState<any>(null)

    useEffect(() => {
        handleRecieveCallback = handleRecieveMessage
        if(returnQueue.length > 0) {
            handleRecieveMessage(returnQueue[0])
            if(returnQueue.length > 1) {
                setReturnQueue(returnQueue.slice(1))
            } else {
                setReturnQueue([])
            }
        }
        document.getElementById('textArea')!!.scrollTop = document.getElementById('textArea')!!.scrollHeight 
    },[lastSocketMessage, returnQueue , messages])

    useEffect(() => {
        if(messages.length == 0 && props.game) {
            let gameState = JSON.parse(props.game.game_json)
            if(gameState.messages.length>0) {
                console.log(gameState.messages)
                setMessages(gameState.messages)
            }
        }
    },[props.game])
    
    const handleRecieveMessage = (message:string) => {
        console.log('handling receive')
        console.log(message)
        if(message) {
            let object = JSON.parse(message)
            if(object.action == 'message') {
                setMessages(
                     [...messages, object.message]
                )
            }
            setLastSocketMessage({data:message})
        }
    }

    const handlemessageChange = (e:any) => {
        setMessage(e.target.value)
    }

    const handleStart = () => {
        console.log('start occurred')
        SendMessageCallback(`{"action":"start"}`)
    }

    const handleSendMessage = () => {
        console.log('send message occurred')
        SendMessageCallback(`{"action":"message","message":"${message}"}`)
        setMessage('')
    }

    //Do this so useEffect can refresh the method so we get the latest State for the GaseState
    let handleRecieveCallback = handleRecieveMessage

    let SendMessageCallback = async (actionJson: string) => {
        console.log('action callback occurred')
        console.log(actionJson)
        let returnItems = await sendTotGameAction(props.token,actionJson,props.game.id)
        console.log(returnItems)
        if(returnItems.responseObject) {
            handleRecieveMessage(returnItems.responseObject[0])
            if(returnItems.responseObject.length > 1) {
                setReturnQueue(returnItems.responseObject.slice(1))
            }
        }
    }

    let GetStartDisabled = () => {
        let gameState = JSON.parse(props.game.game_json)
        return gameState.state != 'stopped' || props.game.status == 'complete' || props.game.status == 'pending'
    }

    let CreateTicTacToeGameState= () => {
        let gameState = JSON.parse(props.game.game_json)
        return new TicTacToeGame(props.game.id,props.game.type,gameState.messages,gameState.currentPlayer,gameState.board,gameState.state)
    }

    let CreateStrategoState = () => {
        let gameState = JSON.parse(props.game.game_json)
        return new StrategoGame(props.game.id,props.game.type,gameState.messages,gameState.currentPlayer,gameState.board,gameState.graveyard,gameState.state,gameState.lastMove)
    }

    let GetLastMoveFromGameState = () => {
        let gameState = JSON.parse(props.game.game_json)
        return gameState.lastMove 
    }

    return (
    <div className="body-padding row" style={{flexWrap:'wrap'}}>
        <div className="column" style={{flex:'1'}}>
            <div>Chat</div>
            <div>
                <textarea className="body-text"  id="textArea"  value={messages.join('\r\n')} disabled={true}></textarea>
            </div>
            <div>
                <div>Message:</div>
                <input value={message} onChange={handlemessageChange}/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div>
                <button disabled={GetStartDisabled()} onClick={handleStart}>Start</button>
            </div>
        </div>
        {props.game.type == 'tic-tac-toe' && <TicTacToe initialState={CreateTicTacToeGameState()} playerNum={props.game.player_num} SendMessageCallback={SendMessageCallback} lastMessage={lastSocketMessage}></TicTacToe>}
        {props.game.type == 'stratego' && <Stratego lastMove={GetLastMoveFromGameState()} initialState={CreateStrategoState()} SendMessageCallback={SendMessageCallback} playerNum={props.game.player_num} lastMessage={lastSocketMessage}></Stratego>}
    </div>
    )
}