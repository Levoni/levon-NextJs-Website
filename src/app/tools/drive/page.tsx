import FileExplorer from "@/components/file_explorer";
import Header from "@/components/header";
import {createDirectory, retriveUser } from "@/components/service_fetch";
import Drive from "@/data/drive";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function PhotoSHare() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    await createDirectory(token)
    let userDrive = new Drive(0,'levon','users/levon',true)
    userDrive = Object.assign({}, userDrive);
    console.log(userDrive)

    return (
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header token={token} userName={user.name}></Header>
            <div className="body-padding">
                <FileExplorer token={token} drive={userDrive}></FileExplorer>
            </div>
        </div>
    )
}