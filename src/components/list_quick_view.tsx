import ListItem from "@/data/list_item";
import { useState } from "react";

export default function ListQuickView(props:any) {

    const handleDeleteClick = (id:number) => {
        if(props.deleteCallback) {
            props.deleteCallback(id)
        }
    }
    
    if(props.item) {
    return (
        <div className="card">
            <div>
                <div className="header">{props.item.name}</div>
                <div className="column" style={{gap:'5px'}}>
                    {props.item && props.item.items.map((element:any) => {
                        return (
                            <div className="row" style={{justifyContent:'space-between'}} key={element.id}>
                                <div>
                                    {element.name}    
                                </div>
                                <div>
                                    <button onClick={() =>{handleDeleteClick(element.id)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    } else {
        return <div></div>
    }
}