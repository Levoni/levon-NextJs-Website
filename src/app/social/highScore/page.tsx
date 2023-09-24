import Header from "@/components/header";
import { GetHighScores, retriveUser } from "@/components/service_fetch";
import HighScoreLeaderboard from "@/components/high_score_leaderboard"
import User from "@/data/user";
import { cookies } from "next/headers";


export default async function HighScorePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    let highScoresResult = await GetHighScores(token,'yahtzee')
    let highScores:Array<any> = []

    if(highScoresResult.success) {
        highScores = highScoresResult.data
    }

    return (
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header token={token} userName={user.name}></Header>
            <HighScoreLeaderboard highScores={highScores}></HighScoreLeaderboard>
        </div>
    )

}