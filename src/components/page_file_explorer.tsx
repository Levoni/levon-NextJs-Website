'use client';
import { useState } from "react";
import FileObjectRow from "./file_object_row";
import FileObject from "@/data/FileObject";
import { CreateDrive, DeleteDrive, GetDriveUsers, GetFile, GetFileList, UpdateDriveUsers, deleteFile, uploadFile } from "./service_fetch";
import Collapse from "./collapse";
import MultiSelect from "./multi-select";
import Drive from "@/data/drive";
import User from "@/data/user";

export default function PageFileExplorer(props:any) {
    const [drives, setDrives] = useState<Array<Drive>>(props.drives)
    const [drive, setDrive] = useState<Drive|null>(null)
    const [page,setPage] = useState(0)
    const [files, setFiles] = useState<Array<FileObject>>([])
    const [loading,setLoading] = useState(false)
    const [uFile,setUFile] = useState<File|null>(null)
    const [prevEnabled,setPrevEnabled] = useState<boolean>(false)
    const [nextEnabled,setNextEnabled] = useState<boolean>(false)
    const [showPreviews,setShowPreviews] = useState<boolean>(false)
    const [createDriveName,setCreateDriveName] = useState<string>('')
    const [users,setUsers] = useState<Array<User>>(props.users)
    const [driveUsers,setDriveUsers] = useState([])
    const [refreshUsers,setRefreshUsers] = useState(false)

    let handleDeleteCallback = async (fileName:string) => {
        var result = await deleteFile(props.token,drive!!.name,fileName)
        if(result.success) {
            let newFiles = files.filter(x => {
                return x.name != fileName
            })
            setFiles(newFiles)
        }
    }

    let handleChangeDrive = async (e:any) => {
        let newDriveString = e.target.value
        setPage(0)
        if(newDriveString == '') {
            setNextEnabled(false)
            setPrevEnabled(false)
            setDrive(null)
            setFiles([])
            //drive users
            setRefreshUsers(true)
            setDriveUsers([])
            return
        }
        let newDrive = drives.find(x => x.name == newDriveString) as Drive
        setDrive(newDrive)
        //get files
        setLoading(true)
        let newFiles = await GetFileList(props.token,newDrive!!.name,0,showPreviews)
        setFiles(newFiles)
        //get drive users
        let newDriveUsers = await GetDriveUsers(props.token, newDrive!!.id)
        setRefreshUsers(true)
        setDriveUsers(newDriveUsers.map((x:any) => x.user_name))
        //setup pagnation
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(false)
        setLoading(false)
    }

    let handleCreateDrive = async (e:any) => {
        if(createDriveName != '') {
            let result = await CreateDrive(props.token,createDriveName)
            if(result.success) {
                let newdrive = new Drive(result.responseObject.id,createDriveName,createDriveName,true)
                setCreateDriveName('')
                setDrives([
                    ...drives,
                    newdrive
                ])
                handleChangeDrive({target:{value:''}})
            }
        }
    }

    let handleDeleteDrive = async (e:any) => {
        if (drive != null) {
            let result = await DeleteDrive(props.token,drive!!.id)
            if(result.success) {
                let newDrives = drives.filter(x => {
                    return x.id != drive.id
                })
                setDrives(newDrives)
                handleChangeDrive({target:{value:''}})
            }
        }
    }

    let changePage = async (incriment:number) => {
        let newPage = page + incriment
        setPage(newPage)
        setLoading(true)
        let newFiles = await GetFileList(props.token,drive!!.name,newPage,showPreviews)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(newPage!=0)
        setLoading(false)
    }

    let handleFileSelect = async (event:React.ChangeEvent<HTMLInputElement>) => {
        let f = event.target.files!![0]
        setUFile(f)
    }

    let handleUploadClick = async () => {
        if(uFile) {
            let result = await uploadFile(props.token,drive!!.name,uFile.name,Buffer.from(await uFile.arrayBuffer()))
            setUFile(null)
        }
    }

    let handlePreviewChange = async () => {
        setShowPreviews(!showPreviews)
        if(!drive) {
            return
        }
        if(!showPreviews) { //Not in this case since the next state will be true
            let newFiles = await Promise.all(files.map(async (e) => {
                let loweredFileName = e.name.toLowerCase()
                if(!e.preview && (loweredFileName.includes('.png') || loweredFileName.includes('.jpeg')
                || loweredFileName.includes('.jpg'))) {
                    let newFile = await GetFile(props.token,drive.name,e.name)
                    return new FileObject(e.name,newFile.data.data,newFile.data.data)
                } else {
                    return e
                }
            }))
            setFiles(newFiles)
        }
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
            console.log(result.responseMessage)
        }
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

    let getHeaderUI = () => {
        return (
            <div className="row" style={{borderBottom:'2px solid white', justifyContent:'space-between', alignItems:'center'}}>
                <div className="row" style={{justifyContent:'flex-start', alignItems:'center',flex:3}}>
                    <div style={{marginRight:10}} className="header">{drive?.name}</div>
                    <input type="checkbox" onChange={handlePreviewChange} value={showPreviews.toString()} />
                    <div>Show Preview</div>
                </div>
                <div className="row" style={{justifyContent:'center',flex:1}}>
                    <input onChange={handleFileSelect} disabled={!drive} id="file" name="file" type="file"/>
                    <button onClick={handleUploadClick} disabled={!uFile || !drive} className="small-button">Upload</button>
                </div>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="body-padding">
            <div className="column">
                {getShareSetting()}
                {getHeaderUI()}
                <div>loading...</div>
            </div>
        </div>
        )
    } else {
        return (
        <div className="body-padding">
            <div className="column">
                {getShareSetting()}
                {getHeaderUI()}
                {files && files.map((x:FileObject) => {
                    return <FileObjectRow key={x.name} deleteCallback={handleDeleteCallback} drive={drive} file={x}></FileObjectRow>
                })}
                <div className="row" style={{justifyContent:'flex-end',alignItems:'center'}}>
                    <button disabled={!prevEnabled} onClick={() => {changePage(-1)}} className="small-button">Back</button>
                    <div style={{paddingLeft:'5px',paddingRight:'5px'}}>{page + 1}</div>
                    <button disabled={!nextEnabled} onClick={() => {changePage(1)}} className="small-button">Next</button>
                </div>
            </div>
        </div>
        )
    }
}