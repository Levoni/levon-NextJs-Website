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
        await SendDeleteTotGame(props.token,id)
    }

    const HandleAccept = async (id:number) => {
        await SendAcceptTotGame(props.token,id,props.user.name)
    }

    const HandleAdd = async (addData:any) => {
        console.log('sent add tot game')
        await SendAddTotGame(props.token,addData.type,addData.challagedUser,addData.creatorUser)
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