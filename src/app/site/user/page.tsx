import Header from "@/components/header";
import PageUserWrapper from "@/components/page_user";
import { GetUserNotificationPreference, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function UserPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    let user:User = await retriveUser(token)
    let notificationPreference:any = await GetUserNotificationPreference(token)
    notificationPreference = notificationPreference.rows.length == 0 ? [] : notificationPreference.rows[0]

    return (
        <div className="column" style={{width:'100%'}}>
            <div className="header">Settings</div>
            <PageUserWrapper notificationPreference={notificationPreference} token={token} user={user}></PageUserWrapper>
        </div>
    )
}