'use client';

import {  useEffect, useMemo, useRef, useState } from "react";
import WebSocketConnection from "./websocket_connection";
import StrategoGame from "@/data/stratego";
import imgWater from '../public/water.png'
import imgGrass from '../public/grass.png'
import img112 from '../public/112.png'
import img111 from '../public/111.png'
import img110 from '../public/110.png'
import img19 from '../public/19.png'
import img18 from '../public/18.png'
import img17 from '../public/17.png'
import img16 from '../public/16.png'
import img15 from '../public/15.png'
import img14 from '../public/14.png'
import img13 from '../public/13.png'
import img12 from '../public/12.png'
import img11 from '../public/11.png'
import img212 from '../public/212.png'
import img211 from '../public/211.png'
import img210 from '../public/210.png'
import img29 from '../public/29.png'
import img28 from '../public/28.png'
import img27 from '../public/27.png'
import img26 from '../public/26.png'
import img25 from '../public/25.png'
import img24 from '../public/24.png'
import img23 from '../public/23.png'
import img22 from '../public/22.png'
import img21 from '../public/21.png'
import img1 from '../public/Blue Base.png'
import img2 from '../public/Red Base.png'
import blank from '../public/blank.png'
import Collapse from "./collapse";

export default function Stratego(props:any) {

    useEffect(() => {
        handleRecieveMessage(props.lastMessage)
    },[props.lastMessage])

    useEffect(() => {
        console.log('player num effect')
        if(props.playerNum != null) {
            console.log('props player num: ' + props.playerNum)
            setPlayer(props.playerNum)
        }
    },[props.playerNum])

    let ImgImportArray:any = {
        img112,
        img111,
        img110,
        img19,
        img18,
        img17,
        img16,
        img15,
        img14,
        img13,
        img12,
        img11,
        img212,
        img211,
        img210,
        img29,
        img28,
        img27,
        img26,
        img25,
        img24,
        img23,
        img22,
        img21,
        img1,
        img2
    }

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

    const [gameState, setGameState] = useState<StrategoGame>(props.initialState != null ? props.initialState : new StrategoGame('','',[],0,createStratigoBasicBoard(),createGraveyard(),'stopped',''))
    const [focusedPiece,setFocusedPiece] = useState<any>(null)
    const [focusedLocation, setFocusedLocation] = useState<any>(null)
    const [player,setPlayer] = useState(props.playerNum != null ? props.playerNum : 0)
    const [battleInfo,setBattleInfo] = useState<any>({attacker:null,defender:null})
    const [lastMove, setLastMove] = useState<any>(props.lastMove ? props.lastMove : null)

    const handleRecieveMessage = (message:MessageEvent<any>) => {
        if(!message) {
            return
        }
        let object = JSON.parse(message.data)
        if(object.action == 'start') {
            setGameState((prevState)=>{return {
                ...prevState,
                state:'placing',
                board: createStratigoBasicBoard(),
                graveyard: createGraveyard(),
                current_Turn: 0
            }})
        } else if(object.action == 'piecePlaced') {
            console.log('received place piece')
            setGameState((prevState)=>{
                let board = prevState.board
                let graveyard = prevState.graveyard
                let pieceIndex = graveyard.findIndex((element)=>{return element.owner == object.player && element.power == object.power})
                let piece = graveyard.splice(pieceIndex,1)[0]
                board[object.x][object.y].piece = piece
                return {
                ...prevState,
                graveyard: graveyard,
                board: board
            }})
        } else if(object.action == 'pieceRemoved') {
            setGameState((prevState)=>{
                let board = prevState.board
                let graveyard = prevState.graveyard
                let piece = board[object.x][object.y].piece
                graveyard.push(piece)
                board[object.x][object.y].piece = null
                return {
                ...prevState,
                graveyard: graveyard,
                board: board
            }}) 
        } else if (object.action == 'removeAndPlace') {
            setGameState((prevState)=>{
                let board = prevState.board
                let graveyard = prevState.graveyard
                let piece = board[object.x][object.y].piece
                graveyard.push(piece)
                board[object.x][object.y].piece = null
                let pieceIndex = graveyard.findIndex((element)=>{return element.owner == object.player && element.power == object.power})
                piece = graveyard.splice(pieceIndex,1)[0]
                board[object.x][object.y].piece = piece
                return {
                    ...prevState,
                    graveyard: graveyard,
                    board: board
            }}) 
        } else if (object.action == 'movePiece') {
            console.log(gameState.board)
            let movingPiece = gameState.board[object.xStart][object.yStart].piece
            console.log(movingPiece)
            setGameState((prevState)=>{
                prevState.board[object.xStart][object.yStart].piece = null
                prevState.board[object.x][object.y].piece = movingPiece
                return {
                    ...prevState,
                    current_Turn: gameState.current_Turn == 1 ? 2 : 1,
                }
            }) 
            setLastMove(`${object.xStart}${object.yStart},${object.x}${object.y}:${movingPiece.owner},${movingPiece.power}:`)
        } else if (object.action == 'battle') {
            setBattleInfo({
                    attacker:{
                        x:object.xStart,
                        y:object.yStart,
                        piece: gameState.board[object.xStart][object.yStart].piece,
                    },
                    defender:{
                        x:object.x,
                        y:object.y,
                        piece:gameState.board[object.x][object.y].piece
                    }
            })
            setGameState((prevState)=>{
                return {
                    ...prevState,
                    state:'battle'
                }
            }) 
        } else if (object.action == 'allPiecesPlayed') {
            console.log('received all pieces placed')
            setGameState((prevState) => { return {
                ...prevState,
                state:'started',
                current_Turn:1
            }
            })
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
        }  else if(object.action == 'sync') {
            setGameState((prevState) => {
                return {
                    game_id:object.room.pin,
                    type: object.room.type,
                    messages: prevState.messages,
                    current_Turn: object.room.currentPlayer,
                    graveyard: object.room.graveyard,
                    board: object.room.board,
                    state: object.room.state,
                    lastMove: object.room.lastMove
                }
            })
        }
    }

    const handleShow = () => {
        setGameState({
            ...gameState,
            state:'battleResults'
        })
    }

    const handleResolve = () => {
        let nextBoard = gameState.board
        let nextGraveyard = gameState.graveyard
        let piece = nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece
        let endPiece = nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece
        if(piece.power == 1 && endPiece.power == 10) {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece = piece
            nextGraveyard.push(endPiece)
        } else if (piece.power == 3 && endPiece.power == 11) {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece = piece
            nextGraveyard.push(endPiece)
        } else if (endPiece.power == 12) {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece = piece
            nextGraveyard.push(endPiece)
        } else if(piece.power > endPiece.power) {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece = piece
            nextGraveyard.push(endPiece)
        } else if(piece.power < endPiece.power) {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextGraveyard.push(piece)
        } else {
            nextBoard[battleInfo.attacker.x][battleInfo.attacker.y].piece = null
            nextBoard[battleInfo.defender.x][battleInfo.defender.y].piece = null
            nextGraveyard.push(piece)
            nextGraveyard.push(endPiece)
        }
        let newState = 'started'
        let newMessages = gameState.messages
        if(endPiece.power == 12) {
            newState = 'stopped'
            newMessages.push(`Game Over! The ${endPiece.owner == 1 ? 'red':'blue'} player wins!`)
        }
        
        setGameState((prevState) => {
            return {
                ...prevState,
                board:nextBoard,
                graveyard:nextGraveyard,
                state:newState,
                current_Turn: gameState.current_Turn == 1 ? 2 : 1,
            }
        })
        setBattleInfo({
            attacker:null,
            defender:null
        })
        setLastMove(`${battleInfo.attacker.x}${battleInfo.attacker.y},${battleInfo.defender.x}${battleInfo.defender.y}:${piece.owner},${piece.power}:${endPiece.owner},${endPiece.power}`)
    }

    const handleBoxCLick = (x:number,y:number) => {
        if(gameState.state == 'placing') {
            if(focusedPiece != null && gameState.board[x][y].piece == null) {
                if(player == 1 && x < 4) {
                    props.SendMessageCallback(`{"action":"place","player":"${focusedPiece.owner}","power":"${focusedPiece.power}","x":"${x}","y":"${y}"}`)
                    setFocusedPiece(null)
                } else if(player == 2 && x > 5) {
                    props.SendMessageCallback(`{"action":"place","player":"${focusedPiece.owner}","power":"${focusedPiece.power}","x":"${x}","y":"${y}"}`)
                    setFocusedPiece(null)
                }
            } else if(focusedPiece == null && gameState.board[x][y].piece != null){
                props.SendMessageCallback(`{"action":"remove","x":"${x}","y":"${y}"}`)
            } else if(focusedPiece != null && gameState.board[x][y].piece != null){
                props.SendMessageCallback(`{"action":"removeAndPlace","player":"${focusedPiece.owner}","power":"${focusedPiece.power}","x":"${x}","y":"${y}"}`)
                setFocusedPiece(null)
            }
        } else if(gameState.state == 'started' && player == gameState.current_Turn) {
            if(focusedPiece == null && gameState.board[x][y].piece != null
                && gameState.board[x][y].piece.owner == player) {
                console.log('selected piece ' + x.toString() + y.toString())
                setFocusedPiece(gameState.board[x][y].piece)
                setFocusedLocation({x:x,y:y})
            } else if(focusedPiece != null) {
                    if(gameState.board[x][y].piece != null && gameState.board[x][y].piece.owner == player) {
                        console.log('selected piece ' + x.toString() + y.toString())
                        setFocusedPiece(gameState.board[x][y].piece)
                        setFocusedLocation({x:x,y:y})
                    } else if(gameState.board[x][y].type == 0 && focusedPiece.power < 11) {
                        if(gameState.board[x][y].piece == null || gameState.board[x][y].piece.owner != player) {
                            let differenceX = Math.abs(focusedLocation.x - x)
                            let differenceY = Math.abs(focusedLocation.y - y)
                            let totalDifference = differenceX + differenceY
                            if(focusedPiece.power == 2) {
                                if((differenceX == 0 || differenceY == 0) && isClearPath(focusedLocation.x,x,focusedLocation.y,y)) {
                                    props.SendMessageCallback(`{"action":"movePiece","xStart":"${focusedLocation.x}","yStart":"${focusedLocation.y}","x":"${x}","y":"${y}"}`)
                                    setFocusedPiece(null)
                                    setFocusedLocation(null)
                                } else {
                                    return
                                }
                            }
                            else if(totalDifference == 1) {
                                props.SendMessageCallback(`{"action":"movePiece","xStart":"${focusedLocation.x}","yStart":"${focusedLocation.y}","x":"${x}","y":"${y}"}`)
                                setFocusedPiece(null)
                                setFocusedLocation(null)  
                            }
                        }
                    }
            }
        }
    }

    const isClearPath = (xStart:number, xEnd:number, yStart:number,yEnd:number) => {
        let iStart = Math.min(xStart,xEnd) + 1
        let iEnd = Math.max(xStart,xEnd) - 1
        let jStart = Math.min(yStart,yEnd) + 1
        let jEnd = Math.max(yStart,yEnd) - 1
        let clear = true;
        for(let i = iStart; i < iEnd; i++) {
            for(let j = jStart; j<jEnd;j++)
            if(gameState.board[i][j].piece != null ||
               gameState.board[i][j].type != 1){
                clear = false;
                break;
            }
        }
        return clear
    }

    const handleGraveyardClick = (piece:any) => {
        if(piece.owner == player)
        {
            setFocusedPiece(piece)
        }
    }

    const getStrategoClass = () => {
        return gameState.state == 'started' && gameState.current_Turn == player ? 'column header stratego-board started' : 'column header stratego-board'
    }

    const getStrategoSymbol = (data:any, ignorePlayer:boolean=false) => {
        if(data) {
            if(data.owner != player && !ignorePlayer && !data.shown) { //TODO: only use shown if varient is active
                return ImgImportArray['img'+data.owner].src
            } else {
                return ImgImportArray['img'+data.owner+data.power].src
            }
        }
        return blank.src
    }

    const getStrategoBackgroundImage = (x:any, y:any) => {
        if(gameState.board && gameState.board[x][y]) {
            return gameState.board[x][y].type == 0 ? imgGrass.src : imgWater.src
        }
    }

    const getBoardClass = (x:number,y:number) => {
        if(gameState.state=='started') {
            if(focusedLocation != null && focusedLocation.x == x && focusedLocation.y == y) {
                return 'focused'
            } else if (lastMove != null && lastMove[0] == x && lastMove[1] == y) {
                return 'last-move'
            } else if(lastMove != null && lastMove[3] == x && lastMove[4] == y) {
                return 'last-move-to'
            }
        }
        return ''
    }

    const getLastMoveJSX = () => {
        if(!lastMove) {
            return <div>No Last Move</div>
        }
        let splitLastMove = lastMove.split(':')
        console.log(splitLastMove)
        return (
            <div>
                <div style={{width:'50px',height:'50px'}}>
                    <img style={{maxWidth:'100%',maxHeight:'auto'}} src={getStrategoSymbol({owner:splitLastMove[1].split(',')[0],power:splitLastMove[1].split(',')[1]},(splitLastMove[2]? true : false))}/>
                </div>
                <div>
                    <div>{`Y${splitLastMove[0].split(',')[0][0]} X${splitLastMove[0].split(',')[0][1]} -----> Y${splitLastMove[0].split(',')[1][0]} X${splitLastMove[0].split(',')[1][1]}`}</div>
                </div>
                {splitLastMove[2] ? <div style={{width:'50px',height:'50px'}}>
                    <img style={{maxWidth:'100%',maxHeight:'auto'}} src={getStrategoSymbol({owner:splitLastMove[2].split(',')[0],power:splitLastMove[2].split(',')[1]},true)}/>
                </div> : null}
            </div>
        )
    }

    return (
    <div className="body-padding row" style={{flexWrap:'wrap'}}>
        <div className="column" style={{flex:'1'}}>
        <Collapse title='LastMove'>
            <div>
                {getLastMoveJSX()}
            </div>
        </Collapse>
            {(gameState.state == 'placing' || gameState.state == 'started') && <div className="graveyard">
                <div>{gameState.state == 'placing' ? 'Place Pieces' : 'Graveyard'}</div>
                <div style={{display:'flex',flexWrap:'wrap'}} className="stratego-graveyard">
                    {gameState && gameState.graveyard.map((element,index) => {
                        return (
                            <div onClick={() => {handleGraveyardClick(element)}} className={focusedPiece&&gameState.state=='placing'&&focusedPiece.owner==element.owner&&focusedPiece.power==element.power ? 'focused':''} key={'grave'+index} style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'5px', width:'50px',height:'50px'}}>
                                <img style={{width:'50px',height:'50px'}} src={gameState.state == 'placing' ? getStrategoSymbol(element) : getStrategoSymbol(element,true)}></img>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
        <div style={{flex:'1'}}>
            <div>Your color is: {player == 1 ? 'Blue' : 'Red'}</div>
            <div className={getStrategoClass()}>
                {gameState.board && gameState.board.map((xElement, xIndex) => {
                    return <div key={`board wrapper ${xIndex}`} className="row">
                        {xElement.map((yElement, yIndex) => {
                            return <div key={'board' + xIndex + yIndex} className={getBoardClass(xIndex,yIndex)} style={{padding:'5px',backgroundImage:`url('${getStrategoBackgroundImage(xIndex,yIndex)}')`}} onClick={() => {handleBoxCLick(xIndex,yIndex)}}>
                                <img style={{width:'50px',height:'50px'}} src={getStrategoSymbol(gameState.board[xIndex][yIndex].piece)}></img>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
        {battleInfo.attacker!=null && battleInfo.defender!=null && <div style={{padding:'10px',display:'flex', flexDirection:'column',position:'absolute', top:'20%', bottom:'20%', left:'20%',right:'20%', background:'green', border:'5px solid black'}}>
            <div style={{flex:'1', flexWrap:'wrap', display:'flex'}}>
                <div style={{flex:'1', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className={`flip-setup`} style={{width:'100px',height:'100px', backgroundImage:gameState.state=='battleResults' ? `url('${getStrategoSymbol(battleInfo.attacker.piece,true)}')` : `url('${getStrategoSymbol(battleInfo.attacker.piece,false)}')`}}></div>
                </div>
                <div style={{flex:'1', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className={`flip-setup`} style={{width:'100px',height:'100px', backgroundImage:gameState.state=='battleResults' ? `url('${getStrategoSymbol(battleInfo.defender.piece,true)}')` : `url('${getStrategoSymbol(battleInfo.defender.piece,false)}')`}}></div>
                </div>
            </div>
            <button onClick={gameState.state=='battle' ? handleShow : handleResolve} className="big-button">{gameState.state=='battle' ? 'Reveal' : 'Resolve'}</button>
        </div>}
    </div>
    )
}