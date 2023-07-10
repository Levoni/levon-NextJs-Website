import Header from "@/components/header";
import PageUserWrapper from "@/components/page_user";
import { retriveUser } from "@/components/service_fetch";
import SocialSettings from "@/components/social_settings";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function UserPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    let user:User = await retriveUser(token)


    return (
        <div style={{flex:'1', display:'flex',flexDirection:'column'}}>
            <Header userName={user.name}></Header>
            <div className="body-padding">
                <div className="header">Social</div>
                <PageUserWrapper token={token} user={user}></PageUserWrapper>
            </div>
        </div>
    )
}