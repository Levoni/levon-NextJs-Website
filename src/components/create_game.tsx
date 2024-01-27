'use client';
import Game from '@/data/game';
import { useState } from 'react';
import Toaster from './toaster';
import ToasterData from '@/data/toaster';

export default function CreateGame(props:any) {
    var [createGame, setCreateGame] = useState(new Game('','',0,0,''))
    const [statusMessage, setStatusMessaage] = useState('')
    const [newToaster,setNewToaster] = useState<ToasterData>()

    function handleNameInput(e: any) {
        createGame.name
        setCreateGame({
            ...createGame,
            name: e.target.value
        })
    }
    function handlePlatformInput(e: any) {
        createGame.name
        setCreateGame({
            ...createGame,
            platform: e.target.value
        })
    }
    function handlePlayerMinInput(e: any) {
        createGame.name
        setCreateGame({
            ...createGame,
            player_min: e.target.value
        })
    }
    function handlePlayerMaxInput(e: any) {
        createGame.name
        setCreateGame({
            ...createGame,
            player_max: e.target.value
        })
    }
    function handleGenreInput(e: any) {
        createGame.name
        setCreateGame({
            ...createGame,
            genre: e.target.value
        })
    }
    const handleCreate = async (e:any) => {
        const data = await fetch(process.env.API_URL + '/game/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
            },
            body: JSON.stringify(createGame),
            mode: 'cors'
        })
        
        if(data.status == 200) {
            let content = await data.json()
            setStatusMessaage('Success: ' + content.success)
            setNewToaster(new ToasterData('success','Game Created',2000))
        } else if (data.status == 400 || data.status == 401) {
            let content = await data.json()
            setNewToaster(new ToasterData('fail','Failed to create game',2000))
            setStatusMessaage(content.error)
        } else {
            setNewToaster(new ToasterData('fail','Failed to create game',2000))
            setStatusMessaage('Error: Failed to create game')
        }
    }

    return (
        <div className="card virtical-div-list">
            <div>Create Game</div>
            <div className="row">
                <div className='input-label-medium'>Name:</div>
                <input onChange={handleNameInput} type="text"/>
            </div>
            <div className="row">
                <div className='input-label-medium'>Platform:</div>
                <input onChange={handlePlatformInput} type="text"/>
            </div>
            <div className="row">
                <div className='input-label-medium'>Min Players:</div>
                <input onChange={handlePlayerMinInput} type="text"/>
            </div>
            <div className="row">
                <div className='input-label-medium'>Max Players:</div>
                <input onChange={handlePlayerMaxInput} type="text"/>
            </div>
            <div className="row">
                <div className='input-label-medium'>Genre:</div>
                <input onChange={handleGenreInput} type="text"/>
            </div>
            <div className='row'>
                <button onClick={handleCreate}>Create/Update</button>
                <div style={{paddingLeft:'10px'}}>{statusMessage}</div>
            </div>
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}