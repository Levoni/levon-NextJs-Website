'use client';
import { useEffect, useState } from "react"
import { GetListQuickView, SendAddListItem, SendAddTemplateItems, SendDeleteListItem } from "./service_fetch"
import List from "@/data/list"
import ListItem from "@/data/list_item"
import Collapse from "./collapse";
import Toaster from "./toaster";
import ToasterData from "@/data/toaster";

export default function PageListWrapper(props:any) {
    useEffect(() => {
        if(list.id == 0 && props.list) {
            setList(props.list)
        }
    },[props.list])

    const [addName,setAddName] = useState<string>('')
    const [list, setList] = useState<List>(new List(0,'','',false,[],[],''))
    const [templateId, setTemplateId] = useState<number>(-1)
    const [toaster,setToaster] = useState<ToasterData>()

    const handleAddClick = async () => {
        let result = await SendAddListItem(props.token, addName ,props.list.id,1)
        if(result.success) {
            setToaster(new ToasterData('success','List item created',2000))
            setList({
                ...list,
                items: [
                    ...list?.items,
                    new ListItem(result.responseObject.id,list?.id,addName,1)
                ]
            })
            setAddName('')
        } else {
            setToaster(new ToasterData('fail','List item failed to be created',2000))
        }
    }
    const handleAddNameChange = async (e:any) => {
        setAddName(e.target.value)
    }

    const handleDeleteClick = async (id:number) => {
        let result = await SendDeleteListItem(props.token,id)
        if(result.success) {
            setList({
                ...list,
                items:[
                    ...list.items.filter((element)=> {return element.id != id})
                ]
            })
        }
    }

    const handleTemplateChane = async (e:any) => {
        setTemplateId(e.target.value)
    }

    const handleAddTemplate = async () => {
        if(templateId != -1) {
            let result = await SendAddTemplateItems(props.token,list.id,templateId)
            if(result.success) {
                let listsResult = await GetListQuickView(props.token,list.id)
                console.log(listsResult)
                if(listsResult && listsResult.items.length > 0) {
                    setList(listsResult)
                }
            }
        }
    }

    const handleItemClick = async () => {
        
    }

    function handleGuessKeyPress(e:any) {
        const code = e.keyCode ? e.keyCode : e.which
        if(code == 13) {
            handleAddClick()
        }
    }

    return (
    <div style={{width:'100%'}}>
        <div className="header">
            <div>{list.name}</div>
            <div className="body-text">Type: {list.type}</div>
            <div className="body-text">Allowed Access: {list.user_names.join(',')}</div>
            <div className="body-text" style={{paddingTop:'5px'}}>
                <Collapse maxHeight={'100px'} className="body-text" title={'Options'}>
                    <div>
                        <select onChange={handleTemplateChane}>
                            <option value={-1}>None</option>
                            {props.templates.map((element:any) => {
                                return (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <button onClick={handleAddTemplate}>Add Template Items</button>
                    </div>
                </Collapse>
            </div>
        </div>
        <div className="column" style={{gap:'25px'}}>
            {list.items.map((element:any) => {
                return (
                    <div key={element.id} className="row card" style={{justifyContent:'space-between'}}>
                        <div>{element.count} {element.name}</div>
                        <button onClick={() => {handleDeleteClick(element.id)}} >Delete</button>
                    </div>
                )
            })}
        </div>
        <div className="row" style={{paddingTop:'10px'}}>
            <input onKeyDown={handleGuessKeyPress} onChange={handleAddNameChange} value={addName} type="text"/>
            <button onClick={handleAddClick}>Add</button>
        </div>
        <Toaster newToaster={toaster}></Toaster>
    </div>
    )
}