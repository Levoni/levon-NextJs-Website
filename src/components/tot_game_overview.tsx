'use client';

import { useRouter } from "next/navigation";

export default function TotGameOverview(props:any) {
    const router = useRouter();

    const handleDeleteClick = (e:any) => {
        e.stopPropagation();
        if(props.DeleteGameCallback) {
            console.log('delete callback')
            props.DeleteGameCallback(props.item.tot_id)
        }
    }

    const handleSelectClick = (e:any) => {
        e.stopPropagation();
        if(props.selectGameCallback) {
            console.log('accept callback')
            props.selectGameCallback(props.item.tot_id)
        }
    }

    const handleAcceptClick = (e:any) => {
        e.stopPropagation();
        if(props.acceptGameCallback) {
            props.acceptGameCallback(props.item.id)
        }
    }

    const handleDetailsClick = (e:any) => {
        e.stopPropagation();
        router.push(`/game/totGames/game?id=${props.item.id}`)
    }

    const getAcceptDeleteButton = () => {
        if(props.item.status != 'accepted') {
            if(!props.item.accepted) {
                return <button className="small-button" onClick={handleAcceptClick}>Accept</button>
            } else {
                if(props.item.is_creator) {
                    return <button className="small-button" onClick={handleDeleteClick}>Delete</button>
                }
            }
        }
        return null
    }

    return (
        <div onClick={handleSelectClick} className="virtical-div-list card">
            <div className="row" style={{justifyContent:'space-between'}}>
                <div className="row card-header" style={{alignItems:'center'}}>
                    <div>{props.item.type}</div>
                    <button onClick={handleDetailsClick} className="small-button">Details</button>
                </div>
                {getAcceptDeleteButton()}    
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