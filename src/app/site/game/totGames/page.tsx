import Header from "@/components/header";
import PageTotGameOverviewWrapper from "@/components/page_tot_game_overview";
import { GetOrderedUsers, GetTotGameOverview, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function TOTGamePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var users:Array<User> = await GetOrderedUsers(token)
    users = users.filter((item) => {return item.name != user.name})
    let originalTotGames = await GetTotGameOverview(token,user.name)

    return (
        <div style={{width:'100%'}}>
            <div style={{marginBottom:'50px'}}>
                <div className="header">Turns over time (TOT) Games</div>
                <div className="body-text">This is a collection of multiplayer games in which each turn can be taken when the player has time.</div>
            </div>
            <PageTotGameOverviewWrapper originalGames={originalTotGames} token={token} users={users} user={user}></PageTotGameOverviewWrapper>
        </div>
    )
  }
  