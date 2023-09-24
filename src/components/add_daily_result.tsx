'use client'
import DailySite from "@/data/daily_site"
import UserSiteLink from "@/data/user_site_link"
import { useEffect, useState } from "react"

export default function AddDailyResult(props:any) {
    
    const GetMMDDYYYY = (date:Date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let dateString = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
        return dateString
    }
    
    const [userSiteLink, setUserSiteLink] = useState(new UserSiteLink('','',GetMMDDYYYY(new Date()),0,true))
    const [currentSite, setCurrentSite] = useState(new DailySite('',0,'',0,false))
    const [isToday,setIsToday] = useState(true)
    const [statusMessage, setStatusMessaage] = useState('')

    useEffect(() => {
        if(props.initialSites && props.initialSites.length > 0
            && props.initialSites.findIndex((item:any) => {return item.name == userSiteLink.daily_site_name}) == -1) {
                setUserSiteLink({
                    ...userSiteLink,
                    daily_site_name:props.initialSites[0].name
                })
                setCurrentSite(props.initialSites[0])
            }
    }, [props.initialSites])

    const updateSiteNmae = (e:any) => {
        let site = props.initialSites[e.target.value]
        let nextLink = {
            ...userSiteLink,
            daily_site_name:site.name
        }
        if(site.is_multiple) {
            nextLink.correct = true
        }
        if(!nextLink.correct) {
            nextLink.guess_count = site.attempt_count
        }
        console.log(site)
        setUserSiteLink(nextLink)
        setCurrentSite(site)
    }

    const updateGuesses = (e:any) => {
        setUserSiteLink({
            ...userSiteLink,
            guess_count:e.target.value
        })
    }

    const updateCorrect = (e:any) => {
        let nextLink = {
            ...userSiteLink,
            correct:e.target.checked,
        }
        if(!e.target.checked) {
            console.log(currentSite.attempt_count)
            nextLink.guess_count = currentSite.attempt_count
        }
        setUserSiteLink(nextLink)
    }

    const updateDate = (e:any) => {
        setUserSiteLink({
            ...userSiteLink,
            site_day_date:e.target.value
        })
    }

    const updateTodayChecked = (e:any) => {
        if(e.target.checked) {
            setUserSiteLink({
                ...userSiteLink,
                site_day_date: GetMMDDYYYY(new Date())
            })
        }
        setIsToday(e.target.checked)
    }

    const submitResult = async () => {
        let body = {
            ...userSiteLink,
        }
        if(currentSite.is_multiple) {
            body.correct = true
        }
        if(!body.correct) {
            userSiteLink.guess_count = currentSite.attempt_count
        }


        const data = await fetch(process.env.API_URL + '/userSiteLink/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
        if(data.status == 200) {
            let content = await data.json()
            setStatusMessaage('Success: ' + content.success)
        } else if (data.status == 400 || data.status == 401) {
            let content = await data.json()
            setStatusMessaage(content.error)
        } else {
            setStatusMessaage('Error: Failed to add game')
        }
    }

    const getResetTimeForSite = () => {
        let site = currentSite
        let localTimeHourOffset = (new Date().getTimezoneOffset()/60)
        let resetTimeUTC:any = site.reset_time
        var localResetTime = resetTimeUTC - localTimeHourOffset
        localResetTime = localResetTime > 0 ? localResetTime : localResetTime + 24
        return localResetTime.toString().padStart(2,'0') + ':00'
    }

    return (
        <div className="virtical-div-list card">
        <div>Add Daily Result</div>
        <div className="row">
          <div>Site: </div>
          <select onChange={updateSiteNmae}>
          {props.initialSites && props.initialSites.map((element:DailySite,index:Number) => {
            return <option key={element.name.toString()} value={index.toString()}>{element.name}</option>
          })}
          </select>
          <div style={{paddingLeft:'10px'}}>
            <a href={currentSite.link.toString()}>Link</a>
          </div>
        </div>
        <div className="row">
          <div>Guesses</div>
          <input disabled={!userSiteLink.correct} value={userSiteLink.guess_count.toString()} onChange={updateGuesses} type="number"/>
        </div>
        <div className="row">
          <div>Guessed Correctly</div>
          <input disabled={currentSite.is_multiple} checked={userSiteLink.correct} onChange={updateCorrect} className="big-checkbox" type="checkbox"/>
        </div>
        <div>
          <div>{'Date Guessed - ' + `Reset: ${getResetTimeForSite()}` }</div>
          <div className="row">
            <div>Date</div>
            <input value={userSiteLink.site_day_date.toString()} onChange={updateDate} disabled={isToday} type='date'/>
            <div></div>
            <input onChange={updateTodayChecked} checked={isToday} className="big-checkbox" type="checkbox"/>
            <div>Today</div>
          </div>
        </div>
        <div className="row">
            <button onClick={submitResult}>Submit</button>
            <div></div>
            <div>{statusMessage}</div>
        </div>
      </div>
    )

}