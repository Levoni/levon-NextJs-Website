'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Confirm from "./confirm";

export default function ListResults(props:any) {
    const router = useRouter();
    const [showConfirm,setShowConfirm] = useState(false)

    const handleDeleteClick = (e:any) => {
        e.stopPropagation();
        setShowConfirm(true)
    }

    const handleSelectClick = () => {
        if(props.selectListCallback) {
            props.selectListCallback(props.item.id)
        }
    }

    const handleDetailsClick = (e:any) => {
        e.stopPropagation();
        router.push(`/tools/list?id=${props.item.id}`)
    }

    const handleConfirm = (result:boolean) => {  
        if(result && props.DeleteListCallback) {
            props.DeleteListCallback(props.item.id)
        }
        setShowConfirm(false)
    }

    return (
        <div onClick={handleSelectClick} className="virtical-div-list card">
            <div className="row" style={{justifyContent:'space-between'}}>
                <div className="row card-header" style={{alignItems:'center'}}>
                    <div>{props.item.name}</div>
                    <button onClick={handleDetailsClick} className="small-button">Details</button>
                </div>
                <button className="small-button" onClick={handleDeleteClick}>Delete</button>
            </div>
            <div>
                <div>Type: {props.item.type}</div>
            </div>
            <div className="row">
                <div>Template:</div>
                <div>{props.item.is_template ? 'Yes' : 'No'}</div>
            </div>
            {showConfirm ? <Confirm clickCallback={handleConfirm}></Confirm> : null}
        </div>
    )
}