'use client';
import { useEffect, useState } from "react"
import AddTotGame from "./add_tot_game";
import TotGameOverview from "./tot_game_overview";
import { SendAcceptTotGame, SendAddTotGame, SendDeleteTotGame } from "./service_fetch";

export default function PageTotGameWrapper(props:any) {
    const [totGames, setTotGames] = useState([])

    useEffect(() => {
        if(totGames.length != props.originalGames.length) {
            setTotGames(props.originalGames)
        }
    },[props.originalGames])


    const HandleDelete = async (id:number) => {
        if(id) {
            await SendDeleteTotGame(props.token,id)
        }
    }

    const HandleAccept = async (id:number) => {
        if(id) {
            await SendAcceptTotGame(props.token,id,props.user.name)
        }
    }

    const HandleAdd = async (addData:any) => {
        if(addData.user_names && addData.user_names.length > 0) {
            await SendAddTotGame(props.token,addData.type, addData.user_names[0],props.user.name)
        }
    }


    return (
        <div className="row">
            <div style={{flex:'1'}}>
                <div>game list</div>
                {totGames && totGames.map((element:any,index) => {
                    return (
                        <TotGameOverview key={index} item={element} acceptGameCallback={HandleAccept} DeleteGameCallback={HandleDelete}></TotGameOverview>
                    )
                })}
            </div>
            <div style={{flex:'1'}}>
                <AddTotGame addCallback={HandleAdd} user={props.user} users={props.users}></AddTotGame>
            </div>
        </div>
    )
}