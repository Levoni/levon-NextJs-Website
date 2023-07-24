'use client';

import TicTacToeGame from "@/data/tic_tac_toe";
import {  useEffect, useMemo, useRef, useState } from "react";

export default function TicTacToe(props:any) {
    const [gameState, setGameState] = useState(new TicTacToeGame('','',[],0,{},'stopped'))
    const [joinPin, setJoinPin]= useState('')
    const [message, setMessage] = useState('')
    const [player,setPlayer] = useState(0)
    const wss = useRef<WebSocket|null>(null)

    useEffect(() => {
        if(wss.current != null) {
            wss.current.onmessage = (e) => {handleRecieveMessage(e)}
        }
        document.getElementById('textArea')!!.scrollTop = document.getElementById('textArea')!!.scrollHeight 
    },[wss,gameState])

    async function connectSocket(joinPin:string) {
        wss.current = new WebSocket('ws://localhost:8080')
        wss.current.onopen = (event:any) => {
            console.log('connection with ws made')
            setGameState(prevState => {return {
                ...prevState,
                type:'tictactoe'
            }})
            wss.current?.send(`{"action":"join","type":"ttt","pin":"${joinPin}","name":"${props.user.name}"}`)
        }
        wss.current.onerror = (error:any) => {
            console.log('caught error')
            console.log(error)
        }
        wss.current.onmessage = (e) => {handleRecieveMessage(e)}
    }

    const handleRecieveMessage = (message:MessageEvent<any>) => {
        let object = JSON.parse(message.data)
        if(object.action == 'message') {
            setGameState((prevState)=>{return {
                ...prevState,
                messages: [...gameState.messages, object.message]
            }})
        } else if(object.action == 'start') {
            setGameState((prevState)=>{return {
                ...prevState,
                state:'started',
                board: {},
                current_Turn: object.startPlayer
            }})
        } else if(object.action == 'placeMark') {
            setGameState((prevState)=>{return {
                ...prevState,
                current_Turn: gameState.current_Turn == 1 ? 2 : 1,
                board: {
                    ...gameState.board,
                    [object.place]:object.player
                }
            }})
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
        }
    }

    const handlePinChange = (e:any) => {
        setJoinPin(e.target.value)
    }

    const handlemessageChange = (e:any) => {
        setMessage(e.target.value)
    }

    const handleJoin = async () => {
        if(joinPin) {
            connectSocket(joinPin)
        }
    }

    const handleSendMessage = () => {
        if(wss) {
            wss.current?.send(`{"action":"message","message":"${message}"}`)
            setMessage('')
        }
    }

    const handleStart = () => {
        wss.current?.send(`{"action":"start"}`)
    }

    const handleBoxCLick = (location:string) => {
        if(gameState.state == 'started'  && gameState.current_Turn == player) {
            wss.current?.send(`{"action":"place","player":"${player}","location":"${location}"}`)
        }
    }

    const getTicTacToeClass = () => {
        return gameState.state == 'started' && gameState.current_Turn == player ? 'column header tic-tac-toe-board started' : 'column header tic-tac-toe-board'
    }

    const getTicTacToeSymbol = (data:any) => {
        if(data) {
            if(data == '1') {
                return 'X'
            } else if(data == '2') {
                return 'O'
            }
        }
    }

    return (
    <div className="body-padding row" style={{flexWrap:'wrap'}}>
        <div className="column" style={{flex:'1'}}>
            <div className="row">
                <div>Room Id:</div>
                <input disabled={gameState.game_id != ''} value={joinPin} onChange={handlePinChange}/>
                <button onClick={handleJoin} disabled={gameState.game_id != ''}>Join</button>
            </div>
            <div>Chat</div>
            <div>
                <textarea className="body-text"  id="textArea"  value={gameState.messages.join('\r\n')} disabled={true}></textarea>
            </div>
            <div>
                <div>Message:</div>
                <input value={message} onChange={handlemessageChange}/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div>
            <button onClick={handleStart} disabled={gameState.state == 'started' || player != 2}>Start</button>
            </div>
        </div>
        <div style={{flex:'1'}}>
            <div>Your symbol is: {getTicTacToeSymbol(player)}</div>
            <div className={getTicTacToeClass()}>
                <div className="row">
                    <div onClick={() => {handleBoxCLick('00')}} style={{borderBottom:'1px solid white', borderRight:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['00'])}</div>
                    <div onClick={() => {handleBoxCLick('01')}} style={{borderBottom:'1px solid white', borderLeft:'1px solid white', borderRight:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['01'])}</div>
                    <div onClick={() => {handleBoxCLick('02')}} style={{borderBottom:'1px solid white', borderLeft:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['02'])}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick('10')}} style={{border:'1px solid white', borderLeft:'0px'}}>{getTicTacToeSymbol(gameState.board['10'])}</div>
                    <div onClick={() => {handleBoxCLick('11')}} style={{border:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['11'])}</div>
                    <div onClick={() => {handleBoxCLick('12')}} style={{border:'1px solid white', borderRight:'0px'}}>{getTicTacToeSymbol(gameState.board['12'])}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick('20')}} style={{borderTop:'1px solid white', borderRight:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['20'])}</div>
                    <div onClick={() => {handleBoxCLick('21')}} style={{border:'1px solid white', borderBottom:'0px'}}>{getTicTacToeSymbol(gameState.board['21'])}</div>
                    <div onClick={() => {handleBoxCLick('22')}} style={{borderTop:'1px solid white', borderLeft:'1px solid white'}}>{getTicTacToeSymbol(gameState.board['22'])}</div>
                </div>
            </div>
        </div>
    </div>
    )
}