'use client';
import { useEffect, useState } from "react"
import AddTotGame from "./add_tot_game";
import TotGameOverview from "./tot_game_overview";
import { SendAcceptTotGame, SendAddTotGame, SendDeleteTotGame } from "./service_fetch";
import TotGames from "@/data/tot_game";

export default function PageTotGameOverviewWrapper(props:any) {
    const [totGames, setTotGames] = useState<Array<any>>([])

    useEffect(() => {
        if(totGames.length != props.originalGames.length) {
            setTotGames(props.originalGames)
        }
    },[props.originalGames])


    const HandleDelete = async (id:number) => {
        console.log(id)
        if(id) {
            let result = await SendDeleteTotGame(props.token,id)
            if(result.success) {
                setTotGames((prev) => {
                    return prev.filter((item) => {
                        return item.id != id
                    })
                })
            }
        }
    }

    const HandleAccept = async (id:number) => {
        if(id) {
            await SendAcceptTotGame(props.token,id,props.user.name)
        }
    }

    const HandleAdd = async (addData:any) => {
        if(addData.user_names && addData.user_names.length > 0) {
            let response = await SendAddTotGame(props.token,addData.type, addData.user_names[0],props.user.name)
            let game = new TotGames(response.responseObject.id,addData.type,`${addData.user_names[0]},${props.user.name}`,'','pending','')
            setTotGames((prev) => {
                return [
                    ...prev,
                    game
                ]
            })
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