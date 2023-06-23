'use client'
import { useEffect, useState } from "react";
import DataTable from "./data_table";
import UserSiteLink from "@/data/user_site_link";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DailySite from "@/data/daily_site";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const chartOptions = {
  responsive: true,
  maintainAspectRatio:false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Guesses',
    },
  },
};

export default function PersonalStatistics(props:any) {
    const GetMMDDYYYY = (date:Date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let dateString = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
        return dateString
      } 

    const [filterOptions, setFilterOptions] = useState({'userName':'', 'site':''})
    const [results, setResults] = useState<Array<UserSiteLink>>([])
    //const [statusMessage, setStatusMessaage] = useState('')
  
    useEffect(()=>{
      if(filterOptions.site == '' && props.sites && props.sites.length > 0) {
        let NextFilterOptions = {
          ...filterOptions,
          site:props.sites[0].name
        }
        setFilterOptions(NextFilterOptions)
        if(NextFilterOptions.site && NextFilterOptions.userName) {
            getResults(getQueryParams(NextFilterOptions))
        }
      }
    }, [props.sites])

    useEffect(()=> {
        if(filterOptions.userName == '' && props.user) {
            let NextFilterOptions = {
                ...filterOptions,
                userName:props.user.name
              }
            setFilterOptions(NextFilterOptions)
            if(NextFilterOptions.site && NextFilterOptions.userName) {
                getResults(getQueryParams(NextFilterOptions))
            }
        }
    }, [props.user])

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
          let orderedContent = content.sort((a:UserSiteLink, b:UserSiteLink) => {
            if(a.site_day_date < b.site_day_date) return -1
            if(a.site_day_date < b.site_day_date) return 1
            else return 0
          })
          setResults(orderedContent)
        } else {
          const content = await data.json()
          setResults([])
        }
    }

    const getQueryParams = (object:any) => {
      return `?userName=${object.userName}&site=${object.site}`
    }

    const setSite = (e:any) => {
      let nextFilterOptions = {
        ...filterOptions,
        site:e.target.value
      }
      setFilterOptions(nextFilterOptions)
      getResults(getQueryParams(nextFilterOptions))
    }

    const getDataTable = () => {
        return {
            header:[{text:'User Name',value:'user_name'},
            {text:'Site',value:'daily_site_name'},
            {text:'Date',value:'site_day_date'},
            {text:'Guess Count',value:'guess_count'},
            {text:'Got Correct',value:'correct'}],
            values:results.map((element) => {
              return {
                ...element,
                correct: element.correct ? 'Yes':'No'
              }
            })
          }
    }
    
    function getChartData():any  {
      let labels = results.map((element) => {
        return element.site_day_date
      })
      let dataset = {
        labels:labels,
        datasets: [{
          label:'Guesses',
          data: results.map((element) => {
            return element.guess_count
          }),
          backgroundColor: '#345634'
        }]
      }
      return dataset
      
    }

    return(
        <div className="virtical-div-list card">
            <div className="card-header" style={{textAlign:'center'}}>Personal Statistics</div>
            <div className="row">
              <div>Site:</div>
              <select onChange={setSite}>
                {props.sites && props.sites.map((site:DailySite) => {
                  return (<option key={site.name.toString()} value={site.name.toString()}>{site.name}</option>)
                })}
              </select>
            </div>
            <div className="row" style={{justifyContent:'space-around',minHeight:'200px', maxHeight:'500px', flexWrap:'wrap'}}>
                <div style={{flex:'1'}}>
                    <DataTable data={getDataTable()}></DataTable>
                </div>
                <div className="chart-width" style={{flex:'1', display:'flex', justifyContent:'center'}}>
                  <Bar options={chartOptions} data={getChartData()}></Bar>
                </div>
            </div>
        </div>
    )
}