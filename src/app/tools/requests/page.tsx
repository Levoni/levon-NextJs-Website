import AddRequest from "@/components/add_request";
import Header from "@/components/header";
import PageRequestWrapper from "@/components/page_requests";
import RequestResults from "@/components/request_results";
import { retriveAllRequest, retriveRequest, retriveUser } from "@/components/service_fetch";
import User from "@/data/user"
import { cookies } from "next/headers";

export default async function RequestPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var requests:any
    if(user.is_admin) {
        requests = await retriveAllRequest(token, 0)
    } else {
        requests = await retriveRequest(token, user.name, 0)
    }
    

    return (
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header token={token} userName={user.name}></Header>
            <div className='body-padding column' style={{paddingBottom:'0px', gap:'25px'}}>
                <div style={{display:'flex',paddingBottom:'25px', flexFlow:'wrap'}}>
                    <div style={{flex:'1'}}>
                        <div className='header'>Requests</div>
                        <div style={{paddingBottom:'10px'}}>This page is a tool for users to submit different request.
                        These request can be catagorized as site requests, plex requests, and Misc requests.
                        Any suggestions for improvements or possible additions to the site would be very appriciated.</div>
                    </div>
                    <div className='hide-on-mobile' style={{flex:'1'}}></div>
                </div>
            </div>
            <PageRequestWrapper initialRequests={requests} user={user} token={token}></PageRequestWrapper>
        </div>
    )
  }
  