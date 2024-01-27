'use client';
import { useEffect, useState } from "react"
import AddTotGame from "./add_tot_game";
import TotGameOverview from "./tot_game_overview";
import { SendAcceptTotGame, SendAddTotGame, SendDeleteTotGame } from "./service_fetch";
import TotGames from "@/data/tot_game";
import ToasterData from "@/data/toaster";

export default function PageTotGameOverviewWrapper(props:any) {
    const [totGames, setTotGames] = useState<Array<any>>([])
    const [toaster,setNewToaster] = useState<ToasterData>()

    useEffect(() => {
        if(totGames.length != props.originalGames.length) {
            setTotGames(props.originalGames)
        }
    },[props.originalGames])


    const HandleDelete = async (id:number) => {
        if(id) {
            let result = await SendDeleteTotGame(props.token,id)
            if(result.success) {
                setTotGames((prev) => {
                    return prev.filter((item) => {
                        return item.id != id
                    })
                })
            } else {
                setNewToaster(new ToasterData('fail','Failed to delete tot game',2000))
            }
        }
    }

    const HandleAccept = async (id:number) => {
        if(id) {
            let result = await SendAcceptTotGame(props.token,id,props.user.name)
            if(!result.success) {
                setNewToaster(new ToasterData('fail','Failed to accept game',2000))
            }
        }
    }

    const HandleAdd = async (addData:any) => {
        if(addData.user_names && addData.user_names.length > 0) {
            let response = await SendAddTotGame(props.token,addData.type, addData.user_names[0],props.user.name)
            if(!response.success) {
                setNewToaster(new ToasterData('fail','Failed to accept game',2000))
            } else {
                let game = new TotGames(response.responseObject.id,addData.type,`${addData.user_names[0]},${props.user.name}`,'','pending','')
                setTotGames((prev) => {
                    return [
                        ...prev,
                        game
                    ]
                })
            }
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