'use client';
import { useEffect, useState } from "react";
import ImageOverlay from "./image_overlay";
import { GetFile } from "./service_fetch";
import FileObject from "@/data/FileObject";

import fileImg from '../public/file icon.png'
import imageImg from '../public/image icon.png'

export default function FileObjectRow(props:any) {

    const [file,setfile] = useState<FileObject>(props.file)
    const [showFullImage,setShowFullImage] = useState(false)
    const [hasFullFile, setHasFullFile] = useState(false)

    useEffect(() => {
        if(props.file.buffer) {
            setHasFullFile(true)
        }
        setfile(props.file)
    },[props.file])

    let getFullFile = async () => {
        if(!hasFullFile) {
            var newfile = await GetFile(props.token,props.drive.path,props.file.name)
            setfile({
                ...file,
                buffer: newfile.data.data
            })
            setHasFullFile(true)
        }
        toggleFullImage()
    }
    let toggleFullImage = async () => {
        setShowFullImage(!showFullImage);
    }

    let CreatePreview = () => {
        let loweredFile = file.name.toLowerCase();
        if(file.preview != null) {
            return `data:image/png;base64,${Buffer.from(file.preview as Buffer).toString('base64')}`
        } else {
            if(loweredFile.includes('.png') || loweredFile.includes('.jpg' || loweredFile.includes('.jpeg'))) {
                return imageImg.src
            } else {
                return fileImg.src
            }
        }
    }

    let deleteF = async (e:any) => {
        e.stopPropagation();
        props.deleteCallback(file.name)
    }

    return (
        <div onClick={getFullFile} className="row highlight" style={{justifyContent:'space-between', borderBottom:'1px solid white'}}>
            <div  className="row" style={{flex:8, alignItems:"center"}}>
                <div  style={{height:100,width:100, display:'flex', justifyContent:'center'}}>
                    <img style={{alignSelf:'center', maxWidth:100,maxHeight:100}} src={CreatePreview()}></img>
                </div>
                <div>
                    {props.file.name}
                </div>
            </div>
            <div className="row" style={{alignItems:'center'}}>
                <button onClick={deleteF} style={{flex:2}} className="big-button">Delete</button>
            </div>
            {showFullImage && <ImageOverlay file={file}></ImageOverlay>}
        </div>
    )
}