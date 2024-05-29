import PageClubhouseWrapper from "@/components/page_clubhouse_games";
import { retriveUserOrGuest } from "@/components/service_fetch";
import { cookies } from "next/headers";

export default async function clubHouseGamesPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user = {...await retriveUserOrGuest(token)}
    return (
        <div>
            <div>
                <div className="header">Clubhouse Games</div>
                <div className="body-text">This is a collection of multiplayer games that can be played in real time agienst other players.</div>
            </div>
            <PageClubhouseWrapper  user={user}></PageClubhouseWrapper>
        </div>
    )
  }
  