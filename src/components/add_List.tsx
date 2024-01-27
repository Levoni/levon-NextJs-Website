'use client';

import List from "@/data/list";
import { useState } from "react";
import Collapse from "./collapse";
import MultiSelect from "./multi-select";
import User from "@/data/user";
import { SendAddList, SendAddTemplateItems } from "./service_fetch";

export default function AddList(props:any) {
    const [listParams, setListParams] = useState<List>(new List(0,'','',false,[],[],''))
    const [selectedTemplate, setSelectedTemplate] = useState<number>(0)
    const [status, setStatus] = useState<string>('')


    const handleIsTemplateChange = (e:any) => {
        setListParams({
            ...listParams,
            is_template:e.target.checked
        })
    }

    const handleTypeChange = (e:any) => {
        setListParams({
            ...listParams,
            type:e.target.value
        })
    }

    const handleNameChange = (e:any) => {
        setListParams({
            ...listParams,
            name:e.target.value
        })
    }

    const handleUserSelectChange = async (object:Array<any>) => {
        var users = object.filter((element)=> {
            return element.selected
        })
        users = users.map((element) => {
            return element.text
        })

        setListParams({
            ...listParams,
            user_names:users
        })
    }

    const handleTemplateChange = (e:any) => {
        setSelectedTemplate(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async () => {
        console.log(listParams)
        let newListId = await SendAddList(props.token,listParams,props.user.name)
        setStatus(newListId.responseMessage)
        if(newListId.success) {
            let newlistParams = {...listParams, id: newListId.responseObject.id}
            setListParams(newlistParams)
            if(props.AddListCallback) {
                props.AddListCallback(newlistParams)
            }
            if(!listParams.is_template && selectedTemplate != -1) {
                let TemplateAddResult = await SendAddTemplateItems(props.token, newListId.responseObject.id,selectedTemplate)
                setStatus(status + TemplateAddResult.responseMessage)
            }
        } else {
            if(props.AddListCallback) {
                props.AddListCallback(null)
            }
        }
    }


    return (
        <div>
            <Collapse title={'Add List'}>
                <div className="virtical-div-list column">
                    <div className="row">
                        <div className="input-label-medium">Template:</div>
                        <select onChange={handleTemplateChange} disabled={listParams.is_template} style={{maxWidth:'max-content'}}>
                            <option value={-1}>none</option>
                            {props.lists && props.lists.filter((element:List)=> {
                                return element.is_template
                            }).map((element:List)=> {
                                return (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <div></div>
                        <div><input onChange={handleIsTemplateChange} checked={listParams.is_template} type="checkbox"/></div>
                        <div>New Template</div>
                    </div>
                    <div className="row">
                        <div className="input-label-medium">List Type:</div>
                        <input onChange={handleTypeChange} value={listParams.type} />
                    </div>
                    <div className="row">
                        <div className="input-label-medium">Name:</div>
                        <input onChange={handleNameChange} value={listParams.name}/>
                    </div>
                    <div className="row">
                        <div className="input-label-medium">Shared Owners:</div>
                        <MultiSelect options={props.users.map((element:any)=>{return {text:element.name, selected:false}})} handleMultiSelectChange={handleUserSelectChange}></MultiSelect>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Submit Request</button>
                        {status && <div style={{paddingLeft:'10px'}}>{status}</div>}
                    </div>
                </div>
            </Collapse>
        </div>
    )
}