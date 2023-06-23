'use client';

import { useState } from "react";
import Collapse from "./collapse";
import MultiSelect from "./multi-select";
import GameResults from '@/components/game_results'
import GameSearch from "@/data/game_search";

export default function PagePickerWrapper(props:any) {
    var [games, setGames] = useState<Array<any>>([])
    var [searchParams, setSearchParams] = useState(new GameSearch('','',0,'', false))

    const GetUsersGames = async () => {
        const data = await fetch(process.env.API_URL + '/users/game' + getSearchQueryParamaters(),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
            },
            mode: 'cors'
        })
        if(data.status == 200) {
            const content = await data.json()
            let reducedContent = content.reduce((endArray:Array<any>,element:any) => {
                let index = endArray.findIndex(obj =>{
                    return obj.game_name == element.game_name
                })
                if(index == -1) {
                    return [...endArray,element]
                } else {
                    endArray[index].user_name += ',' + element.user_name
                    return endArray
                }
            },[])
            let filteredContent = reducedContent.filter((element:any) => {
                let users = searchParams.users.split(',')
                let hasAllUsers = true
                for(var i = 0; i < users.length; i++) {
                    if(!element.user_name.includes(users[i]) ) {
                        hasAllUsers = false
                        break
                    }
                }
                return hasAllUsers
            })
            let orderedContent = filteredContent.sort((a:any, b:any) => {
                if(a.game_name.toLowerCase() < b.game_name.toLowerCase()) return -1
                if(a.game_name.toLowerCase() > b.game_name.toLowerCase()) return 1
                return 0
            })
            setGames(filteredContent)
        } else {
            setGames([])
        }
    }

    function getSearchQueryParamaters() {
        let qString = `?users=${searchParams.users}` +
                      `&games=${searchParams.games}` +
                      `&playerCount=${searchParams.playerCount}` +
                      `&genre=${searchParams.genre}` +
                      (searchParams.installed ? '&installed=1' : '&installed=')
        return qString
    }

    const handleUserMultiSelectChange = (object:any) =>{
        let users = object.reduce((accumulator:any, current:any, index:Number) => {
            if(current.selected) {  
                if(!accumulator) {
                    return `${current.text}`
                } else {
                    return `${accumulator},${current.text.toString()}`
                }
            }
            return accumulator
        },'')
        setSearchParams({
            ...searchParams,
            users: users
        })
    }

    const handleGameMultiSelectChange = (object:any) =>{
        let games = object.reduce((accumulator:any, current:any, index:Number) => {
            if(current.selected) {  
                if(!accumulator) {
                    return `${current.text}`
                } else {
                    return `${accumulator},${current.text.toString()}`
                }
            }
            return accumulator
        },'')
        setSearchParams({
            ...searchParams,
            games: games
        })
    }

    const handleGenreMultiSelectChange = (object:any) =>{
        let games = object.reduce((accumulator:any, current:any, index:Number) => {
            if(current.selected) {  
                if(!accumulator) {
                    return `${current.text}`
                } else {
                    return `${accumulator},${current.text.toString()}`
                }
            }
            return accumulator
        },'')
        setSearchParams({
            ...searchParams,
            genre: games
        })
    }

    function handlePlayerCountChange(e: any) {
        setSearchParams({
            ...searchParams,
            playerCount: e.target.value
        })
    }

    const handleInstalledChange = (e:any) => {
        setSearchParams({
            ...searchParams,
            installed:e.target.checked
        })
    }

    const handleRandomGameCallback = () => {
        if(games.length > 0) {
            let random = Math.floor(Math.random() * 1000)
            let randomInt = random % games.length
            let randomGame = games[randomInt]
            setGames([randomGame])
        }
    }

    return (
        <div style={{flex:'1'}}>
        <div style={{display:'flex'}}>
            <div style={{paddingRight:'10px'}}>Search Games</div>
            <button onClick={GetUsersGames}>search</button>
        </div>
        <div style={{paddingTop:'10px', paddingBottom:'10px'}}>
            <Collapse maxHeight='12rem' title={'Search Options'}>
                <div>User(s)</div>
                <MultiSelect handleMultiSelectChange={handleUserMultiSelectChange} options={props.initialUsers.map((element:any) => {return {text: element.name, selected:false}})}></MultiSelect>
                <div>Game</div>
                <MultiSelect handleMultiSelectChange={handleGameMultiSelectChange}  options={props.initialGames.map((element:any) => {return {text: element.name, selected:false}})}></MultiSelect>
                <div>Genre</div>
                <MultiSelect handleMultiSelectChange={handleGenreMultiSelectChange}  options={props.initialGenres.map((element:any) => {return {text: element, selected:false}})}></MultiSelect>
                <div>Player count</div>
                <input onChange={handlePlayerCountChange} />
                <div className='row'>
                    <div>Installed:</div>
                    <input onChange={handleInstalledChange} type='checkbox'/>
                </div>
            </Collapse>
        </div>
        <GameResults randomGameCallback={handleRandomGameCallback} games={games}></GameResults>
    </div>
    )
}