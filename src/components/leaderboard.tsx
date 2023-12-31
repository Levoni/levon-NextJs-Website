'use client'
import { useEffect, useState } from "react"
import Collapse from "./collapse"
import UserSiteLink from "@/data/user_site_link";
import DataTable from "./data_table";
import DailySite from "@/data/daily_site";
import { GetOriganizedMultiUserResultData, GetOriganizedResultData } from "@/helper/datatable_helper";

export default function Leaderboard(props:any) {
  const GetMMDDYYYY = (date:Date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    let dateString = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
    return dateString
  } 

  const [filterOptions, setFilterOptions] = useState({'date':GetMMDDYYYY(new Date()), 'site':'','span':'daily'})
  const [leaderboardResults, setLeaderboardResults] = useState<Array<UserSiteLink>>([])
  //const [statusMessage, setStatusMessaage] = useState('')

  useEffect(()=>{
    if(filterOptions.site == '' && props.sites && props.sites.length > 0) {
      let NextFilterOptions = {
        ...filterOptions,
        site:props.sites[0].name
      }
      setFilterOptions(NextFilterOptions)
      if(NextFilterOptions.date && NextFilterOptions.site) {
        getResults(getQueryParams(NextFilterOptions))
      }
    }
  }, [props.sites])

  const getResults = async (queryString:String = '') => {
    let qString = queryString ? queryString : getQueryParams(filterOptions)
    const data = await fetch(process.env.API_URL + '/userSiteLink' + qString,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
      },
      mode: 'cors'
    })
    if(data.status == 200) {
      const content = await data.json()
      setLeaderboardResults(content.sort((a:UserSiteLink, b:UserSiteLink) => {
        if(a.guess_count < b.guess_count) return -1
        if(a.guess_count > b.guess_count) return 1
        return 0
    }))
    } else {
      const content = await data.json()
      setLeaderboardResults([])
    }
  }

  const setDate = (e:any) => {
    let nextFilterOptions = {
      ...filterOptions,
      date:e.target.value
    }
    setFilterOptions(nextFilterOptions)
    getResults(`?date=${nextFilterOptions.date}&site=${nextFilterOptions.site}&span=${filterOptions.span}&spanDuration=1`)
  }

  const setSite = (e:any) => {
    let nextFilterOptions = {
      ...filterOptions,
      site:e.target.value
    }
    setFilterOptions(nextFilterOptions)
    getResults(getQueryParams(nextFilterOptions))
  }

  const getQueryParams = (object:any) => {
    return `?date=${object.date}&site=${object.site}&span=${object.span}&spanDuration=1`
  }

  const setSpan = (e:any) => {
    let nextFilterOptions = {
      ...filterOptions,
      span:e.target.value
    }
    setFilterOptions(nextFilterOptions)
    getResults(getQueryParams(nextFilterOptions))
  }

  const createDataFromResults = () => {
    if(filterOptions.span == 'daily') {
      return {
        header:[{text:'User Name',value:'user_name'},
        {text:'Site',value:'daily_site_name'},
        {text:'Date',value:'site_day_date'},
        {text:'Guess Count',value:'guess_count'},
        {text:'Got Correct',value:'correct'}],
        values:GetOriganizedMultiUserResultData(leaderboardResults,filterOptions.span,new Date(filterOptions.date + 'Z'))
      }
    } else {
      return {
        header:[{text:'User Name',value:'user_name'},
        {text:'Site',value:'daily_site_name'},
        {text:'Date Range',value:'date_range'},
        {text:'Average Count',value:'guess_average'},
        {text:'Correct %',value:'correct_percent'}],
        values:GetOriganizedMultiUserResultData(leaderboardResults,filterOptions.span,new Date(filterOptions.date + 'Z'))
      }
    }
  }

  return (
    <div className="virtical-div-list card">
      <div className="row">
        <div className="card-header">{`Leaderboard - ${filterOptions.date}`}</div>
      </div>
      <div>
        <Collapse maxHeight={'200px'} title={'Filter Options'}>
        <div className="virtical-div-list">
        <div className="row">
          <div>Site</div>
            <select onChange={setSite}>
              {props.sites && props.sites.map((site:DailySite) => {
                return (<option key={site.name.toString()} value={site.name.toString()}>{site.name}</option>)
              })}
            </select>
            <div style={{paddingLeft:'10px'}}>Span:</div>
              <select onChange={setSpan}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
          </div>
          <div className="row">
            <div>Date</div>
            <input onChange={setDate} value={filterOptions.date} type="date"/>
          </div>
          {/* <div className="row">
            <div>Range</div>
            <select></select>
          </div>
          <div className="row">
            <div>Stat</div>
            <select></select>
          </div> */}
        </div>
        </Collapse>
      </div>
      <div>
        <DataTable data={createDataFromResults()}></DataTable>
      </div>
    </div>
  )
}
