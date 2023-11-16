'use client';
import { useState } from "react";
import DataTable from "./data_table";
import { GetHighScores } from "./service_fetch";

export default function HighScoreLeaderboard(props:any) {
    const [game,setGame] = useState('test')
    const [daily,setDaily] = useState('All Time')
    const [highScores,setHighScores] = useState(props.highScores)

    let getDataTable = () => {
        var orderedHighScores = highScores.sort((a:any, b:any) => {
            if(a.score < b.score) return -1
            if(a.score > b.score) return 1
            return 0
        })
        return {
            header:[{text:'Name',value:'user_name'},
                    {text:'score',value:'score'}],
            values:orderedHighScores
        }
    }

    let handleGameChange = async (e:any) => {
        setGame(e.target.value)
        let result = await GetHighScores(props.token,e.target.value,daily == 'Today')
        let scores = []
        if(result.success) {
            scores = result.data
        }
        setHighScores(scores)
    }

    let handleDateChange = async (e:any) => {
        setDaily(e.target.value)
        let result = await GetHighScores(props.token,game,e.target.value == 'Today')
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
                    <option>Domain</option>
                </select>
                <select onChange={handleDateChange} value={daily} style={{maxHeight:'25px', marginBottom:'25px'}}>
                    <option>All Time</option>
                    <option>Today</option>
                </select>
            </div>
            {highScores.length == 0 && <div>No Scores for This game</div>}
            {highScores.length> 0 && <DataTable data={getDataTable()}></DataTable>}
        </div>
    )
}