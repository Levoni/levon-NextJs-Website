import Header from "@/components/header";
import PageClubhouseWrapper from "@/components/page_clubhouse_games";
import PageTotGameWrapper from "@/components/page_tot_game";
import { GetOrderedUsers, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function clubhouseGamesPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    let originalTotGames = null

    return (
        <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
            <Header userName={user['name']}></Header>
            <div className="body-padding">
                <div>
                    <div className="header">Clubhouse Games</div>
                    <div className="body-text">This is a collection of multiplayer games that can be played in real time agienst other players.</div>
                </div>
                <PageClubhouseWrapper originalGames={originalTotGames}  user={user}></PageClubhouseWrapper>
            </div>
        </div>
    )
  }
  