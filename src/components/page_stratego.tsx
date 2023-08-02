'use client';

import {  useEffect, useMemo, useRef, useState } from "react";
import WebSocketConnection from "./websocket_connection";
import StrategoGame from "@/data/stratego";

export default function PageStratego(props:any) {

    const createStratigoBasicBoard = () => {
        let board = []
        for(let i = 0; i < 10; i++) {
            let row = []
            for(let y = 0; y < 10; y++) {
                if((i == 4 || i == 5) && (y == 2 || y ==3 || y == 6 || y == 7)) {
                    row.push(createStratigoBasicTile(1))
                } else {
                    row.push(createStratigoBasicTile(0))
                }
            }
            board.push(row)
        }
        return board
    }
    // 1=land,2=water
    const createStratigoBasicTile = (type:number) => {
        return {type:type,piece:null}
    }
    
    const createGraveyard = () => {
        let graveyard = []
        for(let i = 0;i < 1; i++) {
            graveyard.push({owner:1,power:12})
            graveyard.push({owner:2,power:12})
            graveyard.push({owner:1,power:10})
            graveyard.push({owner:2,power:10})
            graveyard.push({owner:1,power:9})
            graveyard.push({owner:2,power:9})
        }
        for(let i = 0;i < 6; i++) {
            graveyard.push({owner:1,power:11})
            graveyard.push({owner:2,power:11})
        }
        for(let i = 0;i < 2; i++) {
            graveyard.push({owner:1,power:8})
            graveyard.push({owner:2,power:8})
        }
        for(let i = 0;i < 3; i++) {
            graveyard.push({owner:1,power:7})
            graveyard.push({owner:2,power:7})
        }
        for(let i = 0;i < 4; i++) {
            graveyard.push({owner:1,power:6})
            graveyard.push({owner:2,power:6})
            graveyard.push({owner:1,power:5})
            graveyard.push({owner:2,power:5})
            graveyard.push({owner:1,power:4})
            graveyard.push({owner:2,power:4})
        }
        for(let i = 0;i < 5; i++) {
            graveyard.push({owner:1,power:3})
            graveyard.push({owner:2,power:3})
        }
        for(let i = 0;i < 8; i++) {
            graveyard.push({owner:1,power:2})
            graveyard.push({owner:2,power:2})
        }
        for(let i = 0;i < 1; i++) {
            graveyard.push({owner:1,power:1})
            graveyard.push({owner:2,power:1})
        }
        return graveyard
    }

    const [gameState, setGameState] = useState(new StrategoGame('','',[],0,createStratigoBasicBoard(),createGraveyard(),'stopped',''))
    const [clientMessage, setClientMessage]= useState('')
    const [message, setMessage] = useState('')
    const [focusedPiece,setFocusedPiece] = useState<any>(null)
    const [player,setPlayer] = useState(0)

    useEffect(() => {
        handleRecieveCallback = handleRecieveMessage
        document.getElementById('textArea')!!.scrollTop = document.getElementById('textArea')!!.scrollHeight 
    },[gameState])
    
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
                state:'placing',
                board: createStratigoBasicBoard(),
                current_Turn: 0
            }})
        } else if(object.action == 'piecePlaced') {
            console.log('recieved place piece')
            setGameState((prevState)=>{
                let board = prevState.board
                let pieceIndex = prevState.graveyard.findIndex((element)=>{return element.owner == object.player && element.power == object.power})
                let piece = prevState.graveyard.splice(pieceIndex,1)[0]
                board[object.x][object.y].piece = piece
                return {
                ...prevState,
                board: board
            }})
            console.log()
        } else if(object.action == 'connection') {
            setGameState((prevState)=>{return {
                ...prevState,
                messages: [...gameState.messages, 'You have joined Game: ' + object.pin + ' as player ' + object.player],
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

    const handlemessageChange = (e:any) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
            setClientMessage(`{"action":"message","message":"${message}"}`)
            setMessage('')
    }

    const handleStart = () => {
        setClientMessage(`{"action":"start"}`)
    }

    const handleBoxCLick = (x:number,y:number) => {
        if(gameState.state == 'placing') {
            if(focusedPiece != null) {
                if(player == 1 && x < 4) {
                    setClientMessage(`{"action":"place","player":"${focusedPiece.owner}","power":"${focusedPiece.power}","x":"${x}","y":"${y}"}`)
                    setFocusedPiece(null)
                } else if(player == 2 && x > 5) {
                    setClientMessage(`{"action":"place","player":"${focusedPiece.owner}","power":"${focusedPiece.power}","x":"${x}","y":"${y}"}`)
                    setFocusedPiece(null)
                }
            }
        } else if(gameState.state == 'started') {

        }
        // if(gameState.state == 'started'  && gameState.current_Turn == player) {
        //     setClientMessage(`{"action":"place","player":"${player}","location":"${location}"}`)
        // }
    }

    const handleGraveyardClick = (piece:any) => {
        if(piece.owner == player)
        {
            setFocusedPiece(piece)
            console.log(piece)
        }
    }

    const getStrategoClass = () => {
        return gameState.state == 'started' && gameState.current_Turn == player ? 'column header stratego-board started' : 'column header stratego-board'
    }

    const getStrategoSymbol = (data:any) => {
        if(data) {
            if(data.owner != player) {
                return data.owner + '0'
            } else {
                return data.owner + '' +data.power
            }
        }
    }

    //Do this so useEffect can refresh the method so we get the latest State for the GaseState
    let handleRecieveCallback = handleRecieveMessage

    return (
    <div className="body-padding row" style={{flexWrap:'wrap'}}>
        <div className="column" style={{flex:'1'}}>
            <WebSocketConnection nextMessage={clientMessage} recieveCallback={handleRecieveCallback} type='stratego' user={props.user} ></WebSocketConnection>
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
            {/* disabled={gameState.state == 'started' || player != 2} */}
                <button onClick={handleStart} >Start</button> 
            </div>
            {(gameState.state == 'placing' || gameState.state == 'start') &&<div>
                <div>{gameState.state == 'placing' ? 'Place Pieces' : 'Graveyard'}</div>
                <div style={{display:'flex',flexWrap:'wrap'}} className="stratego-graveyard">
                    {gameState && gameState.graveyard.map((element,index) => {
                        return (
                            <div onClick={() => {handleGraveyardClick(element)}} key={index} style={{display:'flex', alignItems:'center', justifyContent:'center', width:'50px',height:'50px'}}>{getStrategoSymbol(element)}</div>
                        )
                    })}
                </div>
            </div>}
        </div>
        <div style={{flex:'1'}}>
            <div>Your color is: {getStrategoSymbol(player)}</div>
            <div className={getStrategoClass()}>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(0,0)}}>{getStrategoSymbol(gameState.board[0][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,1)}}>{getStrategoSymbol(gameState.board[0][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,2)}}>{getStrategoSymbol(gameState.board[0][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,3)}}>{getStrategoSymbol(gameState.board[0][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,4)}}>{getStrategoSymbol(gameState.board[0][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,5)}}>{getStrategoSymbol(gameState.board[0][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,6)}}>{getStrategoSymbol(gameState.board[0][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,7)}}>{getStrategoSymbol(gameState.board[0][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,8)}}>{getStrategoSymbol(gameState.board[0][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(0,9)}}>{getStrategoSymbol(gameState.board[0][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(1,0)}}>{getStrategoSymbol(gameState.board[1][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,1)}}>{getStrategoSymbol(gameState.board[1][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,2)}}>{getStrategoSymbol(gameState.board[1][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,3)}}>{getStrategoSymbol(gameState.board[1][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,4)}}>{getStrategoSymbol(gameState.board[1][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,5)}}>{getStrategoSymbol(gameState.board[1][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,6)}}>{getStrategoSymbol(gameState.board[1][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,7)}}>{getStrategoSymbol(gameState.board[1][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,8)}}>{getStrategoSymbol(gameState.board[1][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(1,9)}}>{getStrategoSymbol(gameState.board[1][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(2,0)}}>{getStrategoSymbol(gameState.board[2][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,1)}}>{getStrategoSymbol(gameState.board[2][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,2)}}>{getStrategoSymbol(gameState.board[2][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,3)}}>{getStrategoSymbol(gameState.board[2][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,4)}}>{getStrategoSymbol(gameState.board[2][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,5)}}>{getStrategoSymbol(gameState.board[2][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,6)}}>{getStrategoSymbol(gameState.board[2][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,7)}}>{getStrategoSymbol(gameState.board[2][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,8)}}>{getStrategoSymbol(gameState.board[2][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(2,9)}}>{getStrategoSymbol(gameState.board[2][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(3,0)}}>{getStrategoSymbol(gameState.board[3][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,1)}}>{getStrategoSymbol(gameState.board[3][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,2)}}>{getStrategoSymbol(gameState.board[3][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,3)}}>{getStrategoSymbol(gameState.board[3][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,4)}}>{getStrategoSymbol(gameState.board[3][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,5)}}>{getStrategoSymbol(gameState.board[3][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,6)}}>{getStrategoSymbol(gameState.board[3][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,7)}}>{getStrategoSymbol(gameState.board[3][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,8)}}>{getStrategoSymbol(gameState.board[3][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(3,9)}}>{getStrategoSymbol(gameState.board[3][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(4,0)}}>{getStrategoSymbol(gameState.board[4][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,1)}}>{getStrategoSymbol(gameState.board[4][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,2)}}>{getStrategoSymbol(gameState.board[4][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,3)}}>{getStrategoSymbol(gameState.board[4][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,4)}}>{getStrategoSymbol(gameState.board[4][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,5)}}>{getStrategoSymbol(gameState.board[4][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,6)}}>{getStrategoSymbol(gameState.board[4][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,7)}}>{getStrategoSymbol(gameState.board[4][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,8)}}>{getStrategoSymbol(gameState.board[4][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(4,9)}}>{getStrategoSymbol(gameState.board[4][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(5,0)}}>{getStrategoSymbol(gameState.board[5][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,1)}}>{getStrategoSymbol(gameState.board[5][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,2)}}>{getStrategoSymbol(gameState.board[5][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,3)}}>{getStrategoSymbol(gameState.board[5][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,4)}}>{getStrategoSymbol(gameState.board[5][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,5)}}>{getStrategoSymbol(gameState.board[5][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,6)}}>{getStrategoSymbol(gameState.board[5][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,7)}}>{getStrategoSymbol(gameState.board[5][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,8)}}>{getStrategoSymbol(gameState.board[5][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(5,9)}}>{getStrategoSymbol(gameState.board[5][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(6,0)}}>{getStrategoSymbol(gameState.board[6][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,1)}}>{getStrategoSymbol(gameState.board[6][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,2)}}>{getStrategoSymbol(gameState.board[6][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,3)}}>{getStrategoSymbol(gameState.board[6][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,4)}}>{getStrategoSymbol(gameState.board[6][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,5)}}>{getStrategoSymbol(gameState.board[6][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,6)}}>{getStrategoSymbol(gameState.board[6][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,7)}}>{getStrategoSymbol(gameState.board[6][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,8)}}>{getStrategoSymbol(gameState.board[6][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(6,9)}}>{getStrategoSymbol(gameState.board[6][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(7,0)}}>{getStrategoSymbol(gameState.board[7][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,1)}}>{getStrategoSymbol(gameState.board[7][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,2)}}>{getStrategoSymbol(gameState.board[7][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,3)}}>{getStrategoSymbol(gameState.board[7][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,4)}}>{getStrategoSymbol(gameState.board[7][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,5)}}>{getStrategoSymbol(gameState.board[7][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,6)}}>{getStrategoSymbol(gameState.board[7][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,7)}}>{getStrategoSymbol(gameState.board[7][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,8)}}>{getStrategoSymbol(gameState.board[7][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(7,9)}}>{getStrategoSymbol(gameState.board[7][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(8,0)}}>{getStrategoSymbol(gameState.board[8][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,1)}}>{getStrategoSymbol(gameState.board[8][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,2)}}>{getStrategoSymbol(gameState.board[8][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,3)}}>{getStrategoSymbol(gameState.board[8][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,4)}}>{getStrategoSymbol(gameState.board[8][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,5)}}>{getStrategoSymbol(gameState.board[8][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,6)}}>{getStrategoSymbol(gameState.board[8][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,7)}}>{getStrategoSymbol(gameState.board[8][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,8)}}>{getStrategoSymbol(gameState.board[8][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(8,9)}}>{getStrategoSymbol(gameState.board[8][9].piece)}</div>
                </div>
                <div className="row">
                    <div onClick={() => {handleBoxCLick(9,0)}}>{getStrategoSymbol(gameState.board[9][0].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,1)}}>{getStrategoSymbol(gameState.board[9][1].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,2)}}>{getStrategoSymbol(gameState.board[9][2].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,3)}}>{getStrategoSymbol(gameState.board[9][3].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,4)}}>{getStrategoSymbol(gameState.board[9][4].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,5)}}>{getStrategoSymbol(gameState.board[9][5].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,6)}}>{getStrategoSymbol(gameState.board[9][6].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,7)}}>{getStrategoSymbol(gameState.board[9][7].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,8)}}>{getStrategoSymbol(gameState.board[9][8].piece)}</div>
                    <div onClick={() => {handleBoxCLick(9,9)}}>{getStrategoSymbol(gameState.board[9][9].piece)}</div>
                </div>
            </div>
        </div>
    </div>
    )
}