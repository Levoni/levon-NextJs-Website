import Header from "@/components/header";
import PageFileExplorer from "@/components/page_file_explorer";
import { GetDriveList, GetOrderedUsers, retriveUser } from "@/components/service_fetch";
import Drive from "@/data/drive";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function PhotoSHare() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var driveList:Drive[] = await GetDriveList(token)
    var users:Array<User> = await GetOrderedUsers(token)

    return (
        <PageFileExplorer token={token} drives={driveList} user={user} users={users} files={[]}></PageFileExplorer>
    )
}