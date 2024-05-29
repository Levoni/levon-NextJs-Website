import Header from "@/components/header";
import { GetHighScores, retriveUser } from "@/components/service_fetch";
import HighScoreLeaderboard from "@/components/high_score_leaderboard"
import User from "@/data/user";
import { cookies } from "next/headers";


export default async function HighScorePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    let highScoresResult = await GetHighScores(token,'yahtzee',false)
    let highScores:Array<any> = []

    if(highScoresResult.success) {
        highScores = highScoresResult.data
    }

    return (
        <HighScoreLeaderboard highScores={highScores}></HighScoreLeaderboard>
    )

}