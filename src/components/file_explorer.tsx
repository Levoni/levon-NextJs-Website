'use client';
import FileObject from "@/data/FileObject"
import { GetFile, GetFileList, SearchFiles, deleteFile, uploadFile, uploadFolder } from "./service_fetch"
import { useEffect, useState } from "react";
import Drive from "@/data/drive";
import FileObjectRow from "./file_object_row";
import Loader from "./loader";
import ToasterData from "@/data/toaster";
import Toaster from "./toaster";
import ContextButton from "./context_menu";
import FileObjectMetaData from "@/data/FileObjectMetaData";
import noSortImg from "../public/no-sort arrows.png"
import ascSortImg from "../public/asc arrows.png"
import descSortImg from "../public/desc arrows.png"

export default function FileExplorer(props: any) {
    const initialRootInfo = new FileObject('root', 0, null, null, new FileObjectMetaData({}))
    const [drive, setDrive] = useState<Drive | null>(null)
    const [showPreviews, setShowPreviews] = useState<boolean>(false)
    const [files, setFiles] = useState<Array<FileObject>>([])
    const [uFile, setUFile] = useState<File | null>(null)
    const [prevEnabled, setPrevEnabled] = useState<boolean>(false)
    const [nextEnabled, setNextEnabled] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [page, setPage] = useState(0)
    const [currentDirectoryId, setCurrentDirectoryId] = useState(0)
    const [toaster, setToaster] = useState<ToasterData>()
    const [dialogType, setDialogType] = useState('')
    const [folderName, setFolderName] = useState('')
    const [directoryRoute, setDirectoryRoute] = useState<Array<FileObject>>([initialRootInfo])
    const [searchText, setSearchText] = useState('')
    const [sortInfo, setSortInfo] = useState({ sortBy: 'name', sortDirection: 'asc' })

    useEffect(() => {
        if (props.drive != drive) {
            setDrive(props.drive)
            handleChangeDrive(props.drive)
        }
    }, [props.drive])

    let handleChangeDrive = async (drive: Drive) => {
        if (drive == null) {
            setPage(0)
            setFiles([])
            setNextEnabled(false)
            setPrevEnabled(false)
            return
        }
        setToaster(new ToasterData('success', `drive: ${drive.name} selected`, 5000))
        setLoading(true)
        let newFiles = await GetFileList(props.token, drive.id, 0, 0, showPreviews, sortInfo.sortBy, sortInfo.sortDirection)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(false)
        setPage(0)
        setLoading(false)
    }

    let handleDeleteCallback = async (driveRecordId: number, driveRecordName: string) => {
        var result = await deleteFile(props.token, driveRecordId)
        if (result.success) {
            setToaster(new ToasterData('success', `Record: ${driveRecordName} deleted`, 5000))
            let newFiles = files.filter(x => {
                return x.id != driveRecordId
            })
            setFiles(newFiles)
        } else {
            setToaster(new ToasterData('fail', result.responseMessage, 5000))
        }
    }

    let handlePreviewChange = async () => {
        setShowPreviews(!showPreviews)
        if (!drive) {
            return
        }
        if (!showPreviews) { //Not in this case since the next state will be true
            let newFiles = await Promise.all(files.map(async (e) => {
                let loweredFileName = e.name.toLowerCase()
                if (!e.preview && (loweredFileName.includes('.png') || loweredFileName.includes('.jpeg')
                    || loweredFileName.includes('.jpg'))) {
                    let newFile = await GetFile(props.token, drive.id, e.metaData.parentRecordId!, e.name, showPreviews)
                    return newFile
                } else {
                    return e
                }
            }))
            setFiles(newFiles)
        }
    }

    let handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let f = event.target.files!![0]
        setUFile(f)
    }

    let handleUploadClick = async () => {
        if (uFile) {
            setUploading(true)
            let result = await uploadFile(props.token, drive!!.id, currentDirectoryId, uFile.name, Buffer.from(await uFile.arrayBuffer()))
            let imageBuffer = showPreviews ? Buffer.from(await uFile.arrayBuffer()) : null
            let newFileObject = new FileObject(uFile.name, result.responseObject.id, imageBuffer, imageBuffer, result.responseObject)
            setFiles([...files, newFileObject])
            handleDialogClose()
            setUploading(false)
            if (result.success) {
                setToaster(new ToasterData('success', `file: ${uFile.name} uploaded`, 5000))
                setUFile(null)
            } else {
                setToaster(new ToasterData('fail', result.responseMessage, 5000))
                console.log('file too large')
            }
        }
    }

    let handleFolderCreationClick = async () => {
        var result = await uploadFolder(props.token, drive!!.id, currentDirectoryId, folderName)
        if (result.success) {
            let newFileObject = new FileObject(folderName, result.responseObject.id, null, null, new FileObjectMetaData({ type: 0 }))
            setFiles([...files, newFileObject])
            setFolderName('')
            handleDialogClose()
            setToaster(new ToasterData('success', `folder ${folderName} created.`, 5000))
        } else {
            setToaster(new ToasterData('fail', `folder ${folderName} creation failed.`, 5000))
        }
    }

    let handleFolderChange = async (directoryInfo: FileObject, freshDirectory: boolean = false) => {
        setLoading(true)
        let newFiles = await GetFileList(props.token, drive!!.id, directoryInfo.id!!, 0, showPreviews, sortInfo.sortBy, sortInfo.sortDirection)
        setFiles(newFiles)
        setCurrentDirectoryId(directoryInfo.id!!)
        if (!freshDirectory) {
            setDirectoryRoute([...directoryRoute, directoryInfo])
        } else {
            let newRoute: Array<FileObject> = []
            for (let i = 0; i < directoryRoute.length; i++) {
                newRoute.push(directoryRoute[i])
                if (directoryInfo.id === directoryRoute[i].id) {
                    break
                }
            }
            setDirectoryRoute(newRoute)
        }
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(false)
        setPage(0)
        setLoading(false)
    }

    let handleDialogClose = async () => {
        setDialogType('')
    }

    let handleSearchInput = async (e: any) => {
        if (e.keyCode == 13) {
            setLoading(true)
            let newFiles = await SearchFiles(props.token, drive!!.id, searchText, showPreviews)
            setFiles(newFiles)
            setNextEnabled(newFiles.length == 20)
            setPrevEnabled(false)
            setPage(0)
            setLoading(false)
        }
    }

    let changePage = async (incriment: number) => {
        let newPage = page + incriment
        setPage(newPage)
        setLoading(true)
        let newFiles = await GetFileList(props.token, drive!!.id, 0, newPage, showPreviews, sortInfo.sortBy, sortInfo.sortDirection)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(newPage != 0)
        setLoading(false)
    }

    let addContextHandler = async (action: string) => {
        setDialogType(action)
    }

    let updateSortInfo = async (column: string) => {
        console.log('updating sort')
        let newSortInfo
        if (sortInfo.sortBy !== column) {
            newSortInfo = {
                sortBy: column,
                sortDirection: 'asc'
            }
        } else {
            if (sortInfo.sortDirection === 'asc') {
                newSortInfo = {
                    sortBy: sortInfo.sortBy,
                    sortDirection: 'desc'
                }
            } else {
                newSortInfo = {
                    sortBy: sortInfo.sortBy,
                    sortDirection: 'asc'
                }
            }
        }
        setSortInfo(newSortInfo)

        setLoading(true)
        let newFiles = await GetFileList(props.token, drive!!.id, currentDirectoryId, page, showPreviews, newSortInfo.sortBy, newSortInfo.sortDirection)
        setFiles(newFiles)
        setNextEnabled(newFiles.length == 20)
        setPrevEnabled(false)
        setLoading(false)
    }

    let determineSortImage = (column: string) => {
        if (sortInfo.sortBy !== column) {
            return noSortImg.src
        } else {
            if (sortInfo.sortDirection === 'asc') {
                return ascSortImg.src
            } else {
                return descSortImg.src
            }
        }
    }

    let getHeaderUI = () => {
        return (
            <div className="row" style={{ flexWrap: 'wrap-reverse', gap: '10px', borderBottom: '2px solid white', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="row" style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 3 }}>
                    <div style={{ marginRight: 10 }} className="header">{drive?.name}</div>
                    <div>
                        <div className="row">
                            <div>Search:</div>
                            <input type="text" onKeyDown={handleSearchInput} value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                        </div>
                        <div className="row">
                            <input type="checkbox" onChange={handlePreviewChange} value={showPreviews.toString()} />
                            <div>Show Preview</div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: '10px' }}>
                        {directoryRoute.length > 0 && directoryRoute.map((section) => {
                            return (<span key={`${section.name}-${section.id}`}>
                                <span className="clickable" onClick={() => { handleFolderChange(section, true) }} >{section.name}</span>
                                <span>/</span>
                            </span>)
                        })}
                    </div>
                </div>
                <ContextButton alignment={'right'} options={['Add File', 'Add Folder']} selectionCallback={addContextHandler} ></ContextButton>
                {dialogType === 'Add File' && <div className="dialog">
                    <div className="dialog-title">
                        <div>Choose file</div>
                        <button onClick={handleDialogClose} className="dialog-exit flat">X</button>
                        <div>
                            <input className="file-upload" onChange={handleFileSelect} disabled={!drive} id="file" name="file" type="file" />
                        </div>
                    </div>
                    <div className="dialog-buttons">
                        <button onClick={handleUploadClick} disabled={!uFile || !drive} className="small-button">
                            {uploading ? <Loader local={true}></Loader> : 'Upload'}</button>
                    </div>
                </div>}
                {dialogType === 'Add Folder' && <div className="dialog">
                    <div className="dialog-title">
                        <div>Set Folder Name</div>
                        <button onClick={handleDialogClose} className="dialog-exit flat">X</button>
                        <div>
                            <input id="folderName" value={folderName} onChange={(e) => { setFolderName(e.target.value) }} type="text" />
                        </div>
                    </div>
                    <div className="dialog-buttons">
                        <button onClick={handleFolderCreationClick} className="small-button">Create</button>
                    </div>
                </div>}
            </div>
        )
    }

    let getBodyUi = () => {
        if (loading) {
            return (
                <div style={{ height: '200px' }}>
                    <Loader key={'toaster'} local={true}></Loader>
                </div>
            )
        } else {
            return (
                <>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th><span onClick={() => { updateSortInfo('type') }}>Type/Preview</span><img className="sort-img" src={determineSortImage('type')} /></th>
                                <th><span onClick={() => { updateSortInfo('name') }}>Name</span><img className="sort-img" src={determineSortImage('name')} /></th>
                                <th><span onClick={() => { updateSortInfo('created_by') }}>Owner</span><img className="sort-img" src={determineSortImage('created_by')} /></th>
                                <th><span onClick={() => { updateSortInfo('created_on') }}>Created On</span><img className="sort-img" src={determineSortImage('created_on')} /></th>
                                <th><span onClick={() => { updateSortInfo('file_size') }}>size</span><img className="sort-img" src={determineSortImage('file_size')} /></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.length > 0 && files.map((x: FileObject) => {
                                return <FileObjectRow directorySelectedCallback={handleFolderChange} key={x.name} deleteCallback={handleDeleteCallback} currentDirectoryId={currentDirectoryId} drive={drive} file={x}></FileObjectRow>
                            })}
                        </tbody>
                    </table>
                    <div className="row" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button disabled={!prevEnabled} onClick={() => { changePage(-1) }} className="small-button">Back</button>
                        <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>{page + 1}</div>
                        <button disabled={!nextEnabled} onClick={() => { changePage(1) }} className="small-button">Next</button>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="column" style={{ width: '100%' }}>
            {getHeaderUI()}
            {getBodyUi()}
            <Toaster key={'toaster'} newToaster={toaster}></Toaster>
        </div>
    )
}