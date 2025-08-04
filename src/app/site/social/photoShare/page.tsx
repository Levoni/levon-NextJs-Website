import Header from "@/components/header";
import PageFileExplorer from "@/components/page_file_explorer";
import { GetUserDriveList, GetOrderedUsers, retriveUser } from "@/components/service_fetch";
import Drive from "@/data/drive";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function PhotoShare() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var driveList:Drive[] = await GetUserDriveList(token)
    var users:Array<User> = await GetOrderedUsers(token)

    return (
        <PageFileExplorer token={token} drives={driveList} user={user} users={users} files={[]}></PageFileExplorer>
    )
}