import FileExplorer from "@/components/file_explorer";
import Header from "@/components/header";
import {CreateDrive, GetDrive, GetUserDriveList, retriveUser } from "@/components/service_fetch";
import Drive from "@/data/drive";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function PhotoShare() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    let driveList:Drive[] = await GetUserDriveList(token);
    let drive = driveList.filter(x => x.name == user.name)
    let userDrive
    if(drive.length == 0) {
        console.log('not found')
        let response = await CreateDrive(token,user.name,'users')
        if(response.success) {
            let userDriveResponse = await GetDrive(token,response.responseObject.id)
            userDrive = userDriveResponse
            userDrive = Object.assign({}, userDrive);
        }
    } else {
        console.log('found')
        userDrive = drive[0]
    }

    return (
        <>
            <FileExplorer token={token} drive={userDrive}></FileExplorer>
        </>
    )
}