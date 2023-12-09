import FileObjectRow from "@/components/file_object_row";
import Header from "@/components/header";
import PageFileExplorer from "@/components/page_file_explorer";
import { GetDriveList, GetFileList, GetHighScores, GetOrderedUsers, retriveUser } from "@/components/service_fetch";
import FileObject from "@/data/FileObject";
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
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header token={token} userName={user.name}></Header>
            <PageFileExplorer token={token} drives={driveList} user={user} users={users} files={[]}></PageFileExplorer>
        </div>
    )
}