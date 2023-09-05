'use client';

import { useRouter } from "next/navigation";

export default function TotGameOverview(props:any) {
    const router = useRouter();

    const handleDeleteClick = (e:any) => {
        e.stopPropagation();
        if(props.DeleteListCallback) {
            props.DeleteGameCallback(props.item.id)
        }
    }

    const handleSelectClick = () => {
        if(props.selectListCallback) {
            props.selectGameCallback(props.item.id)
        }
    }

    const handleAcceptClick = () => {
        if(props.selectListCallback) {
            props.acceptGameCallback()
        }
    }

    const handleDetailsClick = (e:any) => {
        e.stopPropagation();
        // router.push(`/future Game Page/list?id=${props.item.id}`)
    }

    return (
        <div onClick={handleSelectClick} className="virtical-div-list card">
            <div className="row" style={{justifyContent:'space-between'}}>
                <div className="row card-header" style={{alignItems:'center'}}>
                    <div>{props.item.type}</div>
                    <button onClick={handleDetailsClick} className="small-button">Details</button>
                </div>
                {props.item.accepted == 'pending' && <button className="small-button" onClick={handleAcceptClick}>Accept</button>}
                {props.item.accepted != 'pending' && <button className="small-button" onClick={handleDeleteClick}>Delete</button>}
                
            </div>
            <div className="row">
                <div>Players: {props.item.users}</div>
            </div>
            <div className="row">
                <div>Status:</div>
                <div>{props.item.status}</div>
            </div>
            {props.item.winner && <div className="row">
                <div>Winner:</div>
                <div>{props.item.winner}</div>
            </div>}
        </div>
    )
}