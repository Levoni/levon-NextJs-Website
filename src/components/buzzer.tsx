'use client';

import BuzzGame from "@/data/BuzzGame";
import {  useEffect, useState } from "react";

export default function Buzzer(props:any) {
    const [gameState, setGameState] = useState<BuzzGame>(props.initialState != null ? props.initialState : new BuzzGame('','',[],'','stopped'))
    const [player,setPlayer] = useState(props.playerNum != null ? props.playerNum : 0)
    const [buzzed,setBuzzed] = useState(false)
    const [buzzedPlayers,setBuzzedPlayers] = useState<Array<string>>([])
    const [lastCallId,setLastCallId] = useState(0)

    useEffect(() => {
        handleRecieveMessage(props.lastMessage)
    },[props.lastMessage])
    
    const handleRecieveMessage = (message:any) => {
        if(message == null) {
            return
        }
        let object = JSON.parse(message.data)
        if(object.action == 'buzz') {
            setBuzzedPlayers(buzzedPlayers => {
                return [
                    ...buzzedPlayers,
                    object.player
                ]
            })
        }else if(object.action == 'resetBuzz') {
            setBuzzed(false)
            setBuzzedPlayers([])
        } else if(object.action == 'connection') {
            setGameState((prevState)=>{return {
                ...prevState,
                messages: [...gameState.messages, 'You have joined Game: ' + object.pin],
                type:object.type,
                game_id: object.pin
            }})
            setPlayer(object.player)
        } else if(object.action == 'end') {
            setGameState((prevState)=>{return {
                ...prevState,
                state:'stopped'
            }})
        } else if(object.action == 'sync') {
            console.log(object)
            setGameState((prevState) => {
                return {
                    game_id:object.room.pin,
                    type: object.room.type,
                    messages: prevState.messages,
                    state: object.room.state,
                    host: object.room.host
                }
            })
        } else if (object.action == 'start') {
            setGameState((prevState) => {
                return {
                    ...prevState,
                    state: 'started'
                }
            })
        }
    }

    const handleBuzzCLick = () => {
        if(gameState.state == 'started') {
            props.SendMessageCallback(`{"action":"buzz","id":"${lastCallId}"}`)
            setBuzzed(true)
            setLastCallId(lastCallId + 1)
        }
    }

    const handleResetBuzzCLick = () => {
        if(gameState.state == 'started') {
            props.SendMessageCallback(`{"action":"resetBuzz","id":"${lastCallId}"}`)
            setLastCallId(lastCallId + 1)
        }
    }

    //Do this so useEffect can refresh the method so we get the latest State for the GaseState
    // let handleRecieveCallback = handleRecieveMessage

    return (
    <div className="column" style={{flexWrap:'wrap', justifyContent:'space-around', flex:1,display:'flex'}}>
        <div style={{display:'flex',flex:'1'}}>
            {player == 1 && <button style={{minHeight:'200px',flex:1,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handleResetBuzzCLick}>reset</button>}
            <button style={{minHeight:'200px',flex:1, display:'flex',alignItems:'center',justifyContent:'center'}} disabled={buzzed} onClick={handleBuzzCLick}>buzz</button>
        </div>
        <div className="column" style={{flex:'1',minHeight:'200px'}}>
            <textarea style={{display:'flex', flex:1, width:'auto',height:'auto'}} className="body-text" id="textAreaBuzz" value={buzzedPlayers.join('\r\n')} disabled={true}></textarea>
        </div>
    </div>
    )
}