'use client';

import { useState } from "react";
import Guesser from "./guess";
import InfoColumn from '@/components/info_column'

export default function PageGuessWrapper(props:any) {
    var [minigameSession, setMinigameSession] = useState({games:1, currentRange:100})
    function setupMiniGame(minigameObject:any) {
        setMinigameSession({
            games: minigameSession.games + 1,
            currentRange: minigameObject.max - minigameObject.min
        })
    }
    var tempInfo: Array<object> = [
        {name:'Session Game Count', value:minigameSession.games},
        {name:'Current Range', value:minigameSession.currentRange}
    ]
    return (
        <div className="body-padding" style={{paddingTop:'0px', display:'flex', flex:'1', gap:'25px', justifyContent:'space-around', flexFlow:'wrap'}}>
            <div style={{display:'flex', flex:'1', flexDirection:'column', justifyContent:'space-around'}}>
                <div style={{flex:'3'}}>
                    <Guesser
                     type='Minigame'
                     regenClick = {setupMiniGame}
                     key='miniGuess'
                     token={props.token}></Guesser>
                </div>
            </div>
            <div style={{display:'flex', flex:'1', justifyContent:'center'}}>
                <InfoColumn title='Stats' info={tempInfo}></InfoColumn>
            </div>
        </div>
    )
}