'use client';
import FileObject from "@/data/FileObject"
import { GetFile, GetFileList, deleteFile, uploadFile } from "./service_fetch"
import { useEffect, useState } from "react";
import Drive from "@/data/drive";
import FileObjectRow from "./file_object_row";
import Loader from "./loader";

export default function FileExplorer(props:any) {
    const [drive, setDrive] = useState<Drive|null>(null)
    const [showPreviews,setShowPreviews] = useState<boolean>(false)
    const [files, setFiles] = useState<Array<FileObject>>([])
    const [uFile,setUFile] = useState<File|null>(null)
    const [prevEnabled,setPrevEnabled] = useState<boolean>(false)
    const [nextEnabled,setNextEnabled] = useState<boolean>(false)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(0)

    useEffect(() => {
        if(props.drive != drive) {
            setDrive(props.drive)
            handleChangeDrive(props.drive)
        }
    },[props.drive])

    let handleChangeDrive = async (drive:Drive) => {
        if(drive == null) {
            setPage(0)
            setFiles([])
            setNextEnabled(false)
            setPrevEnabled(false)
            return
        }
        setLoading(true)
        let newFiles = await GetFileList(props.token,drive.path,0,showPreviews)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(false)
        setPage(0)
        setLoading(false)
    }

    let handleDeleteCallback = async (fileName:string) => {
        var result = await deleteFile(props.token,drive!!.path,fileName)
        if(result.success) {
            let newFiles = files.filter(x => {
                return x.name != fileName
            })
            setFiles(newFiles)
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
                    let newFile = await GetFile(props.token,drive.path,e.name)
                    return new FileObject(e.name,newFile.data.data,newFile.data.data)
                } else {
                    return e
                }
            }))
            setFiles(newFiles)
        }
    }

    let handleFileSelect = async (event:React.ChangeEvent<HTMLInputElement>) => {
        let f = event.target.files!![0]
        setUFile(f)
    }

    let handleUploadClick = async () => {
        if(uFile) {
            let result = await uploadFile(props.token,drive!!.path,uFile.name,Buffer.from(await uFile.arrayBuffer()))
            setUFile(null)
        }
    }

    let changePage = async (incriment:number) => {
        let newPage = page + incriment
        setPage(newPage)
        setLoading(true)
        let newFiles = await GetFileList(props.token,drive!!.path,newPage,showPreviews)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(newPage!=0)
        setLoading(false)
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
            <div className="column">
                {getHeaderUI()}
                <div style={{height:'500px'}}>
                    <Loader local={true}></Loader>
                </div>
            </div>
        )
    } else {
        return (
            <div className="column">
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
        )
    }
}