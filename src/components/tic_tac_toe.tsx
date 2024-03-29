'use client';

import TicTacToeGame from "@/data/tic_tac_toe";
import {  useEffect, useState } from "react";

export default function TicTacToe(props:any) {
    const [gameState, setGameState] = useState<TicTacToeGame>(props.initialState != null ? props.initialState : new TicTacToeGame('','',[],0,{},'stopped'))
    const [player,setPlayer] = useState(props.playerNum != null ? props.playerNum : 0)

    useEffect(() => {
        handleRecieveMessage(props.lastMessage)
    },[props.lastMessage])
    
    const handleRecieveMessage = (message:any) => {
        if(message == null) {
            return
        }
        let object = JSON.parse(message.data)
        console.log('new Message Recieved. GameState as follows:')
        console.log(gameState)
        if(object.action == 'placeMark') {
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
        } else if(object.action == 'sync') {
            setGameState((prevState) => {
                return {
                    game_id:object.room.pin,
                    type: object.room.type,
                    messages: prevState.messages,
                    current_Turn: object.room.currentPlayer,
                    board: object.room.board,
                    state: object.room.state
                }
            })
        } else if (object.action == 'start') {
            setGameState((prevState) => {
                return {
                    ...prevState,
                    current_Turn: object.startPlayer,
                    board: {},
                    state: 'started'
                }
            })
        }
    }

    const handleBoxCLick = (location:string) => {
        if(gameState.state == 'started'  && gameState.current_Turn == player) {
            props.SendMessageCallback(`{"action":"place","player":"${player}","location":"${location}"}`)
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
    //Do this so useEffect can refresh the method so we get the latest State for the GaseState
    // let handleRecieveCallback = handleRecieveMessage

    return (
    <div style={{flexWrap:'wrap'}}>
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