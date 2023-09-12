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
        var game = await GetTotGame(token,props.searchParams.id)
        console.log(game)
        return (
            <div>Game loaded</div>
        )
        
    } else {
        return (
            <div>No game exists with that ID.</div>
        )
    }
}