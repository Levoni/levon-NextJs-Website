'use client';

import { useEffect, useState } from "react";
import AddList from "./add_List";
import List from "@/data/list";
import ListResults from "./list_result";
import ListQuickView from "./list_quick_view";
import { GetListQuickView, SendDeleteList, SendDeleteListItem } from "./service_fetch";
import Toaster from "./toaster";
import ToasterData from "@/data/toaster";

export default function PageListManagerWrapper(props:any) {
    const [lists,setLists] = useState<Array<List>>([])
    const [selectedList,setSelectedList] = useState<List|any>()
    const [newToaster,setNewToaster] = useState<ToasterData>()

    useEffect(()=> {
        if(lists.length == 0 && props.initialLists) {
            setLists(props.initialLists)
        }
    },[props.initialLists])

    const handleAddListCallback = (list:List) => {
        if(list == null ) {
            setNewToaster(new ToasterData('fail','List failed to add',2000))
            return
        }
        setNewToaster(new ToasterData('success','List added',2000))
        setLists([
            ...lists,
            list
        ])
    }

    const handleDeleteListCallback = async (id:number) => {
        let result = await SendDeleteList(props.token,id)
        if(result.success) {
            setNewToaster(new ToasterData('success','List deleted',2000))
            let newList = lists.filter((element) => {
                return element.id != id
            })
            setLists(newList)
            if(selectedList && selectedList.id && selectedList.id == id) {
                setSelectedList(null)
            }
        } else {
            setNewToaster(new ToasterData('fail','List failed to be deleted',2000))
        }
    }

    const handleSelectListCallback = async (id:number) => {
        let results = await GetListQuickView(props.token, id)
        if(results)  {
            setSelectedList(results)
        }
    }

    const handleQuickViewDeleteCallback = async(itemId:number) => {
        let result = await SendDeleteListItem(props.token,itemId)
        if(result.success) {
            setSelectedList({
                ...selectedList,
                items: [
                    ...selectedList?.items.filter((element:any) => {return element.id != itemId})
                ]
            })
        }
        console.log(result)
    }

    return (
        <div className="row" style={{gap:'25px', flex:'1', flexFlow:'wrap'}}>
            <div className="column" style={{flex:'1',gap:'25px'}}>
                <AddList lists={lists} AddListCallback={handleAddListCallback} user={props.user} users={props.users} token={props.token}></AddList>
                <div style={{borderBottom:'5px solid #2d3436'}} className="header">Lists:</div>
                {lists.map((element:List) => {
                    return (
                        <ListResults key={element.id} selectListCallback={handleSelectListCallback}  DeleteListCallback={handleDeleteListCallback} item={element}></ListResults>
                    )
                })}
            </div>
            <div style={{flex:'1'}}>
                <ListQuickView deleteCallback={handleQuickViewDeleteCallback} item={selectedList}></ListQuickView>
            </div>
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}