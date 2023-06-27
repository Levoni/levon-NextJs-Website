import AddRequest from "@/components/add_request";
import Header from "@/components/header";
import RequestResults from "@/components/request_results";
import { retriveRequest, retriveUser } from "@/components/service_fetch";
import { User } from "next-auth";
import { cookies } from "next/headers";

export default async function RequestPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var requests:any = await retriveRequest(token, user.name)

    return (
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header userName={user.name}></Header>
            <div className='body-padding' style={{display:'flex',paddingBottom:'25px', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>Requests</div>
                    <div style={{paddingBottom:'10px'}}>This page is a tool for users to submit different request.
                    These request can be catagorized as site requests, plex requests, and Misc requests.
                    Any suggestions for improvements or possible additions to the site would be very appriciated.</div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <div>
                <AddRequest></AddRequest>
            </div>
            <div>
                {requests.map((element:any) => {
                    return(<RequestResults key={element.id} token={token} item={element}></RequestResults>)
                })}
            </div>
        </div>
    )
  }
  