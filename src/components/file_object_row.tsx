'use client';
import { useEffect, useState } from "react";
import ImageOverlay from "./image_overlay";
import { GetFile } from "./service_fetch";
import FileObject from "@/data/FileObject";

import fileImg from '../public/file icon.png'
import imageImg from '../public/image icon.png'
import folderImg from '../public/folder icon.png'
import Loader from "./loader";
import Confirm from "./confirm";
import { filesize } from "filesize";

export default function FileObjectRow(props: any) {

    const [file, setfile] = useState<FileObject>(props.file)
    const [showFullImage, setShowFullImage] = useState(false)
    const [hasFullFile, setHasFullFile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if (props.file.buffer) {
            setHasFullFile(true)
        }
        setfile(props.file)
    }, [props.file])

    let handleRowClick = async () => {
        if (file.metaData.type === 0) {
            props.directorySelectedCallback(file)
        } else {
            getFullFile()
        }
    }

    let getFullFile = async () => {
        setIsLoading(true)
        if (!hasFullFile) {
            var newfile = await GetFile(props.token, props.drive.id, props.file.metaData.parentRecordId, props.file.name, false, true)
            setfile({
                ...file,
                buffer: newfile.buffer
            })
            setHasFullFile(true)
        }
        setIsLoading(false)
        toggleFullImage()
    }

    let toggleFullImage = async () => {
        setShowFullImage(!showFullImage);
    }

    let CreatePreview = () => {
        if (file.preview != null) {
            return `data:image/png;base64,${Buffer.from(file.preview).toString('base64')}`
        } else {
            if (file.metaData.type === 1) {
                return imageImg.src
            } else if (file.metaData.type === 0) {
                return folderImg.src
            }
            else {
                return fileImg.src
            }
        }
    }

    let deleteF = async (e: any) => {
        e.stopPropagation();
        setShowDialog(true)
    }

    let handleConfirm = (result: boolean) => {
        if (result) {
            props.deleteCallback(file.id, file.name)
        }
        setShowDialog(false)
    }

    return (
        <tr onClick={handleRowClick} className="highlight" style={{ borderBottom: '1px solid white' }}>
            <td>
                <div className="thumbnail">
                    <img className="thumbnail-img" src={CreatePreview()}></img>
                </div>
            </td>
            <td>
                {props.file.name}
            </td>
            <td>
                {props.file.metaData.owner}
            </td>
            <td>
                {props.file.metaData.createdOn.toDateString()}
            </td>
            <td>
                {filesize(props.file.metaData.fileSize)}
            </td>
            <td>
                <button onClick={deleteF} style={{ flex: 2 }} className="big-button">Delete</button>
            </td>
            {showFullImage && <ImageOverlay file={file}></ImageOverlay>}
            {showDialog ? <Confirm clickCallback={handleConfirm}></Confirm> : null}
            {isLoading ? <Loader></Loader> : null}
        </tr>
    )
}