import Header from "@/components/header";
import PageTotGameWrapper from "@/components/page_tot_game";
import { GetOrderedUsers, GetTotGames, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function TOTGamePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var users:Array<User> = await GetOrderedUsers(token)
    let originalTotGames = await GetTotGames(token,user.name)

    return (
        <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
            <Header userName={user['name']}></Header>
            <div className="body-padding">
                <div>
                    <div className="header">Turns over time (TOT) Games</div>
                    <div className="body-text">This is a collection of multiplayer games in which each turn can be taken when the player has time.</div>
                </div>
                <PageTotGameWrapper originalGames={originalTotGames} users={users} user={user}></PageTotGameWrapper>
            </div>
        </div>
    )
  }
  