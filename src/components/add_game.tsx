'use client';
import GameLink from "@/data/game_link"
import { useState } from "react"
import Toaster from "./toaster";
import ToasterData from "@/data/toaster";

export default function AddGame(props:any) {
    const [gameLink, setGameLink] = useState(new GameLink('','',false))
    const [statusMessage, setStatusMessaage] = useState('')
    const [newToaster,setNewToaster] = useState<ToasterData>()


    function handleGameListChange(e:any) {
        setGameLink({
            ...gameLink,
            game_name: e.target.value
        })
    }
    function handleInstalledClick(e: any) {
        setGameLink({
            ...gameLink,
            installed: e.target.checked
        })
    }
    const handleButtonClick = async (e:any) => {
        let sendGameLink = gameLink;
        if(gameLink.game_name == '' && props.gameList.length > 0) {
            sendGameLink = new GameLink('',props.gameList[0].name,gameLink.installed)
            setGameLink(sendGameLink)
        }
        const data = await fetch(process.env.API_URL + '/gamelink/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
            },
            body: JSON.stringify(sendGameLink),
            mode: 'cors'
        })
        if(data.status == 200) {
            let content = await data.json()
            setStatusMessaage('Success: ' + content.success)
            setNewToaster(new ToasterData('success','Added/updated game for user',2000))
        } else if (data.status == 400 || data.status == 401) {
            let content = await data.json()
            setNewToaster(new ToasterData('fail','Failed to add/update game for user',2000))
            setStatusMessaage(content.error)
        } else {
            setStatusMessaage('Error: Failed to add game')
            setNewToaster(new ToasterData('fail','Failed to add/update game for user',2000))
        }
    }

    return(
        <div className="card virtical-div-list">
            <div>Manage Game</div>
            <div className="row">
                <div>Game: </div>
                <select style={{maxWidth:'max-content'}} className="select-fill" onChange={handleGameListChange}>
                    {props.gameList && props.gameList.map((element:any,index:any) => {
                        return <option key={index}  value={element.name}>{element.name}</option>
                    })}
                </select>
            </div>
            <div className="row">
                <div>Installed</div>
                <input onChange={handleInstalledClick} type="checkbox"/>
            </div>
            <div className="row">
                <button className="small-button" onClick={handleButtonClick}>Add/Update</button>
                <div style={{paddingLeft:'10px'}}>{statusMessage}</div>
            </div>
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}