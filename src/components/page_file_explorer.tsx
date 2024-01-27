'use client';
import { useState } from "react";
import { CreateDrive, DeleteDrive, GetDriveUsers, UpdateDriveUsers } from "./service_fetch";
import Collapse from "./collapse";
import MultiSelect from "./multi-select";
import Drive from "@/data/drive";
import User from "@/data/user";
import FileExplorer from "./file_explorer";
import Confirm from "./confirm";
import Toaster from "./toaster";
import ToasterData from "@/data/toaster";

export default function PageFileExplorer(props:any) {
    const [drives, setDrives] = useState<Array<Drive>>(props.drives)
    const [drive, setDrive] = useState<Drive|null>(null)
    const [createDriveName,setCreateDriveName] = useState<string>('')
    const [users,setUsers] = useState<Array<User>>(props.users)
    const [driveUsers,setDriveUsers] = useState([])
    const [refreshUsers,setRefreshUsers] = useState(false)
    const [showConfirm,setShowConfirm] = useState(false)
    const [newToaster,setNewToaster] = useState<ToasterData>()


    let handleChangeDrive = async (e:any) => {
        let newDriveString = e.target.value
        if(newDriveString == '') {
            setDrive(null)
            //drive users
            setRefreshUsers(true)
            setDriveUsers([])
            return
        }
        let newDrive = drives.find(x => x.name == newDriveString) as Drive
        setDrive(newDrive)
        //get files
        //get drive users
        let newDriveUsers = await GetDriveUsers(props.token, newDrive!!.id)
        setRefreshUsers(true)
        setDriveUsers(newDriveUsers.map((x:any) => x.user_name))
    }

    let handleCreateDrive = async (e:any) => {
        if(createDriveName != '') {
            let result = await CreateDrive(props.token,createDriveName)
            if(result.success) {
                setNewToaster(new ToasterData('success','Drive Created',2000))
                let newdrive = new Drive(result.responseObject.id,createDriveName,createDriveName,true)
                setCreateDriveName('')
                setDrives([
                    ...drives,
                    newdrive
                ])
                handleChangeDrive({target:{value:''}})
            } else {
                setNewToaster(new ToasterData('fail','Drive failed to be Created',2000))
            }
        }
    }

    let handleDeleteDrive = async (e:any) => {
        setShowConfirm(true)
    }

    let handleUserChange = async (e:any) => {
        let newDriveusers = e.filter((x:any) => {
            return x.selected
        })
        newDriveusers = newDriveusers.map((x:any) => {
            return x.text
        })
        setRefreshUsers(false)
        setDriveUsers(newDriveusers)
    }

    let handleCreateDriveNameChange = async (e:any) => {
        setCreateDriveName(e.target.value)
    }

    let handleUpdateUserAcces = async (e:any) => {
        let allowedUsers:any = [
            ...driveUsers
        ]
        //Can't let owner remove themselves
        if(driveUsers.findIndex((x) => x == props.user.name) == -1) {
            allowedUsers.push(props.user.name)
            setDriveUsers(allowedUsers)
        }

        let result = await UpdateDriveUsers(props.token, allowedUsers,drive!!.id)
        if(!result.success) {
            setNewToaster(new ToasterData('fail','Users failed to update',2000))
            console.log(result.responseMessage)
        } else {
            setNewToaster(new ToasterData('success','Users Updated',2000))
        }
    }

    let handleConfirm = async (result:boolean) => {
        if (drive != null && result) {
            let result = await DeleteDrive(props.token,drive!!.id)
            if(result.success) {
                setNewToaster(new ToasterData('success','Drive Deleted',2000))
                let newDrives = drives.filter(x => {
                    return x.id != drive.id
                })
                setDrives(newDrives)
                handleChangeDrive({target:{value:''}})
            } else {
                setNewToaster(new ToasterData('fail','Drive failed to be deleted',2000))
            }
        }
        setShowConfirm(false)
    }

    let getShareSetting = () => {
        return (
            <div>
                <Collapse maxHeight={'500px'} title={'Drive Settings'}>
                    <div className="row" style={{justifyContent:'space-between'}}>
                        <div>
                            <div className="row">
                                <div>Drive:</div>
                                <select onChange={handleChangeDrive} value={drive?.name}>
                                    <option value={''}>None</option>
                                    {drives.map((x,index) => {
                                        return (
                                            <option key={'driveoption' + index} value={x.name}>{x.name}</option>
                                        )
                                    })}
                                </select>
                                <button onClick={handleDeleteDrive} className="small-button">Delete</button>
                            </div>
                            {(drive != null && drive.is_owner) ? <div className="row">
                                <div>Allowed users:</div>
                                <MultiSelect handleMultiSelectChange={handleUserChange} refresh={refreshUsers} options={users.map(x => {return {text:x.name,selected:driveUsers.findIndex((y) =>{return y == x.name}) != -1}})}></MultiSelect>
                                <button onClick={handleUpdateUserAcces} className="small-button">Update</button>
                            </div> : null}
                        </div>
                        <div>
                            <input value={createDriveName} onChange={handleCreateDriveNameChange} type="text"/>
                            <button onClick={handleCreateDrive} disabled={!createDriveName}>Create</button>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }

    return (
        <div className="body-padding">
            <div className="column">
                {getShareSetting()}
                <FileExplorer drive={drive} token={props.token}></FileExplorer>
            </div>
            {showConfirm ? <Confirm clickCallback={handleConfirm}></Confirm> : null}
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}