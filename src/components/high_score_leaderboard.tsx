'use client';
import { useState } from "react";
import DataTable from "./data_table";
import { GetHighScores } from "./service_fetch";

export default function HighScoreLeaderboard(props:any) {
    const [game,setGame] = useState('test')
    const [highScores,setHighScores] = useState(props.highScores)

    let getDataTable = () => {
        return {
            header:[{text:'Name',value:'user_name'},
                    {text:'score',value:'score'}],
            values:highScores
        }
    }

    let handleGameChange = async (e:any) => {
        setGame(e.target.value)
        let result = await GetHighScores(props.token,e.target.value)
        let scores = []
        if(result.success) {
            scores = result.data
        }
        setHighScores(scores)
    }

    return (
        <div className="body-padding">
            <div className="row" style={{alignItems:'center'}}>
                <div className="header">Leaderboard</div>
                <select onChange={handleGameChange} value={game} style={{maxHeight:'25px', marginBottom:'25px'}}>
                    <option>yahtzee</option>
                </select>
            </div>
            {highScores.length == 0 && <div>No Scores for This game</div>}
            {highScores.length> 0 && <DataTable data={getDataTable()}></DataTable>}
        </div>
    )
}