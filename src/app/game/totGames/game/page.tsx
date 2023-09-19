import Header from "@/components/header";
import PageTotGameWrapper from "@/components/page_tot_game";
import { GetTotGame, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

type Props = {
    params?: {
      num?: string;
    };
    searchParams?:any
  };

export default async function ListPage(props:Props) {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);


    if(props.searchParams && props.searchParams.id) {
        var game = await GetTotGame(token,props.searchParams.id, user.name)
        console.log(game)
        if(game.length > 0) {
            return (
                <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
                    <Header token={token} userName={user['name']}></Header>
                    <PageTotGameWrapper game={game[0]}></PageTotGameWrapper>
                </div>
            )
        } else {
            return (
                <div>No game exists with that ID.</div>
            )
        }
        
    } else {
        return (
            <div>No game exists with that ID.</div>
        )
    }
}