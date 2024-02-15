'use client';
import GameLink from "@/data/game_link"
import { useState } from "react"
import MultiSelect from "./multi-select";

export default function AddTotGame(props:any) {
    const [statusMessage, setStatusMessaage] = useState('')
    
    let typeList = [
        'tic-tac-toe',
        'stratego'
    ]
    const [paramList,setParamList] = useState<any>({type:'tic-tac-toe', user_names:[],variants:{shown:false}})

    function handleGameListChange(e:any) {
        setParamList({
            ...paramList,
            type: e.target.value
        })
    }
    const handleSubmitClick = async (e:any) => {
        if(props.addCallback) {
            props.addCallback(paramList)
        }
    }

    const handleUserSelectChange = async (object:Array<any>) => {
        var users = object.filter((element)=> {
            return element.selected
        })
        if(users.length < 2) {
            users = users.map((element) => {
                return element.text
            })
    
            setParamList({
                ...paramList,
                user_names:users
            })
        }
    }
    const handleShowChange = (e:any) => {
        setParamList({
            ...paramList,
            variants: {
                ...paramList.variants,
                shown: e.target.checked
            }
        })
    }

    return(
        <div className="card virtical-div-list">
            <div>Manage Game</div>
            <div className="row">
                <div>Type: </div>
                <select style={{maxWidth:'max-content'}} className="select-fill" onChange={handleGameListChange}>
                    {typeList.map((element:any,index:any) => {
                        return <option key={index}  value={element}>{element}</option>
                    })}
                </select>
            </div>
            <div className="row">
                <div>variants:</div>
                <div className="row">
                    <div>Show face on battle</div>
                    <input onChange={handleShowChange} value={paramList.variants.shown} type="checkbox"/>
                </div>
                {/* <div className="row">
                    <div>Resurrection</div>
                    <input type="checkbox"/>
                </div>   */}
            </div>
            <div className="row">
                <div>Users:</div>
                <MultiSelect  options={props.users.map((element:any)=>{return {text:element.name, selected:false}})} handleMultiSelectChange={handleUserSelectChange}></MultiSelect>
            </div>
            <div className="row">
                <button className="small-button" onClick={handleSubmitClick}>Create</button>
                <div style={{paddingLeft:'10px'}}>{statusMessage}</div>
            </div>
        </div>
    )
}