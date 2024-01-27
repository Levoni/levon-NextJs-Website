'use client';

import { useEffect, useState } from "react";
import AddRequest from "./add_request";
import RequestResults from "./request_results";
import Request from "@/data/request";
import { retriveAllRequest, retriveRequest } from "./service_fetch";
import ToasterData from "@/data/toaster";
import Toaster from "./toaster";

export default function PageRequestWrapper(props:any) {

    useEffect(() => {
        if(!requests || requests.length == 0) {
            setRequests(props.initialRequests)
        }
    },[props.initialRequests])

    const [requests,setRequests] = useState<Array<Request>>([])
    const [onlyOpen,setOnlyOpen] = useState<boolean>(true)
    const [toaster, setToaster] = useState<ToasterData>()

    const handleRequestAddHook = (request:Request) => {
        if(request == null) {
            setToaster(new ToasterData('fail','Failed to add request',2000))
            return
        }
        setToaster(new ToasterData('success','Added request',2000))
        setRequests([...requests,request])
    }

    const handleRequestStatusUpdateHook = (id:number, closed:boolean) => {
        var nextRequests;
        if(onlyOpen && closed) {
            nextRequests = requests.filter((element:Request) => {
                return element.id != id
            })
        } else {
            nextRequests = requests.map((element:Request) => {
                if(element.id == id) {
                    return {
                        ...element,
                        closed:closed
                    }
                } else {
                    return element
                }
            })
        }
        setRequests(nextRequests)
    }
    
    const handleCheckedUpdate = (e:any) => {
        setOnlyOpen(e.target.checked)
    }

    const handleRefresh = async () => {
        //TODO:track closed input state and use that
        var newRequests;
        if(props.user.is_admin) {
            newRequests = await retriveAllRequest(props.token,onlyOpen ? 0 : null)
        } else {
            newRequests = await retriveRequest(props.token,props.user.name, onlyOpen ? 0 : null)
        } 
        setRequests(newRequests)
    }

    return (
    <div style={{paddingTop:'0px'}} className="body-padding">
        <div>
            <AddRequest submitRequestCallback={handleRequestAddHook} token={props.token} user={props.user}></AddRequest>
        </div>
        <div className="column" style={{gap:'25px'}}>
            <div style={{marginTop:'25px', borderBottom:'5px solid #2d3436',alignItems:'center'}} className="row">
                <div style={{paddingBottom:'0px', marginRight:'20px'}} className="header" >Requests:</div>
                <button onClick={handleRefresh} className="small-button">refresh</button>
                <input onChange={handleCheckedUpdate} checked={onlyOpen} style={{height:'25px', width:'25px', marginRight:'10px'}} type="checkbox"/>
                <div className="text-body">Show only open requests</div>
            </div>
            {requests.map((element:any) => {
                return(<RequestResults ChangeStatusHook={handleRequestStatusUpdateHook}  user={props.user} key={element.id} token={props.token} item={element}></RequestResults>)
            })}
        </div>
        <Toaster newToaster={toaster}></Toaster>
    </div>
    )
}