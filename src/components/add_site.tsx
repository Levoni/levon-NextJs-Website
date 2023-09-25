'use client'
import DailySite from "@/data/daily_site"
import { useState } from "react"

export default function AddSite(props:any) {
    const [site, setSite] = useState(new DailySite('',0,'',6,false))
    const [statusMessage, setStatusMessaage] = useState('')

    const updateName = (e:any) => {
        setSite({
            ...site,
            name: e.target.value
        })
    }
    const updateResetTime = (e:any) => {
        setSite({
            ...site,
            reset_time: e.target.value
        })
    }
    const updateLink = (e:any) => {
        setSite({
            ...site,
            link: e.target.value
        })
    }

    const submitSite = async (e:any) => {
        const data = await fetch(process.env.API_URL + '/site/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
            },
            body: JSON.stringify(site),
            mode: 'cors'
        })
        if(data.status == 200) {
            let content = await data.json()
            setStatusMessaage('Success: ' + content.success)
        } else {
            setStatusMessaage('Error: Failed to add game')
        }
    }

    return  (
     <div style={{flex:'1'}} className="virtical-div-list card">
        <div>Add Site</div>
        <div className="row">
          <div className="input-label-medium">Name: </div>
          <input onChange={updateName} type="text"/>
        </div>
        <div className="row">
          <div className="input-label-medium">Reset Time: </div>
          <input onChange={updateResetTime} type='number'/>
        </div>
        <div className="row">
          <div className="input-label-medium">Link: </div>
          <input onChange={updateLink} type="text"/>
        </div>
        <div className="row">
            <button onClick={submitSite}>Add/Update</button>
            <div></div>
            <div>{statusMessage}</div>
        </div>
      </div>
    )
}