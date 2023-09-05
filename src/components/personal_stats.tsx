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
import { GetOriganizedResultData } from "@/helper/datatable_helper";
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
    // const GetMMDDYYYY = (date:Date) => {
    //     var day = date.getDate();
    //     var month = date.getMonth() + 1;
    //     var year = date.getFullYear();
    //     let dateString = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
    //     return dateString
    //   } 

    const [filterOptions, setFilterOptions] = useState({'userName':'', 'site':'','span':'daily','spanDuration':7})
    const [results, setResults] = useState<Array<UserSiteLink>>([])
    //const [statusMessage, setStatusMessaage] = useState('')
  
    useEffect(()=>{
      if(filterOptions.site == '' && props.sites && props.sites.length > 0 && filterOptions.userName == '' && props.user) {
        let NextFilterOptions = {
          userName:props.user.name,
          site:props.sites[0].name,
          span:filterOptions.span,
          spanDuration:7
        }
        setFilterOptions(NextFilterOptions)
        console.log(NextFilterOptions)
        if(NextFilterOptions.site && NextFilterOptions.userName) {
            getResults(getQueryParams(NextFilterOptions))
            ChartJS.getChart('test')?.update()
        }
      }
    }, [props.sites, props.user])

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
            if(a.site_day_date > b.site_day_date) return -1
            if(a.site_day_date > b.site_day_date) return 1
            else return 0
          })//.slice(0,7)
          setResults(orderedContent)
        } else {
          const content = await data.json()
          setResults([])
        }
    }

    const getQueryParams = (object:any) => {
      return `?userName=${object.userName}&site=${object.site}&span=${object.span}&spanDuration=${object.spanDuration}`
    }

    const setSite = (e:any) => {
      let nextFilterOptions = {
        ...filterOptions,
        site:e.target.value
      }
      setFilterOptions(nextFilterOptions)
      getResults(getQueryParams(nextFilterOptions))
    }

    const setSpan = (e:any) => {
      let nextFilterOptions = {
        ...filterOptions,
        span:e.target.value
      }
      setFilterOptions(nextFilterOptions)
      getResults(getQueryParams(nextFilterOptions))
    }

    const getDataTable = () => {
      if(filterOptions.span == 'daily') {
        return {
          header:[{text:'User Name',value:'user_name'},
          {text:'Site',value:'daily_site_name'},
          {text:'Date',value:'site_day_date'},
          {text:'Guess Count',value:'guess_count'},
          {text:'Got Correct',value:'correct'}],
          values:GetOriganizedResultData(results, filterOptions.span)
        }
      } else if(filterOptions.span == 'weekly') {
        return {
          header:[{text:'User Name',value:'user_name'},
          {text:'Site',value:'daily_site_name'},
          {text:'Date Range',value:'date_range'},
          {text:'Average Count',value:'guess_average'},
          {text:'Correct %',value:'correct_percent'}],
          values:GetOriganizedResultData(results, filterOptions.span)
        }
      } else {
        return {
          header:[{text:'User Name',value:'user_name'},
          {text:'Site',value:'daily_site_name'},
          {text:'Date Range',value:'date_range'},
          {text:'Average Count',value:'guess_average'},
          {text:'Correct %',value:'correct_percent'}],
          values:GetOriganizedResultData(results, filterOptions.span)
        }
      }
    }
    
    function getChartData():any  {
      let organizedData = GetOriganizedResultData(results, filterOptions.span)
      console.log(organizedData)
      let test = GetChartData(organizedData)
      console.log(test)
      let dataset = {
        labels:GetChartLabel(organizedData),
        datasets: [{
          label:'Guesses',
          data: GetChartData(organizedData),
          backgroundColor: '#345634'
        }]
      }
      return dataset
    }

    const GetChartLabel = (organizedData:any) => {
      if(filterOptions.span == 'daily') {
        return organizedData.map((element:any) => {
          return element.site_day_date
        })
      } else {
        return organizedData.map((element:any) => {
          return element.date_range
        })
      }
    }

    const GetChartData = (organizedData:any) => {
      if(filterOptions.span == 'daily'){
        return organizedData.map((element:any) => {
          return element.guess_count
        })
      } else {
        return organizedData.map((element:any) => {
          return element.guess_average
        })
      }
    }

    // const GetOriganizedResultData = (data:UserSiteLink[]) => {
    //   if(filterOptions.span == 'daily') {
    //     return data;
    //   } else if(filterOptions.span == 'weekly') {
    //     let endDate = new Date()
    //     let startDate = SubtractDays(new Date(endDate),7)
    //     let objects = []
    //     for(let i = 0; i < 7; i++) {
    //       let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
    //         let curDate = new Date(currentItem.site_day_date)
    //         if( curDate >= startDate && curDate <= endDate) {
    //           previousItem.user_name = currentItem.user_name
    //           previousItem.daily_site_name = currentItem.daily_site_name
    //           previousItem.correct_percent += currentItem.correct ? 1 : 0
    //           previousItem.guess_average += currentItem.guess_count
    //           previousItem.records += 1
    //         }
    //         return previousItem
    //       },{user_name:'',daily_site_name:'',date_range:GetMMDDYYYY(startDate) + ' - ' + GetMMDDYYYY(endDate),guess_average:0,correct_percent:0,records:0})
    //       let records = reducedResult.records == 0 ? 1 : reducedResult.records
    //       reducedResult.guess_average = reducedResult.guess_average / records
    //       reducedResult.correct_percent = reducedResult.correct_percent / records
    //       objects.push(reducedResult)
    //       endDate=startDate
    //       startDate = SubtractDays(new Date(endDate),7)
    //     }
    //     return objects
    //   } else if(filterOptions.span == 'monthly') {
    //     let endDate = new Date()
    //     let startDate = SubtractMonths(new Date(endDate),1)
    //     let objects = []
    //     for(let i = 0; i < 7; i++) {
    //       let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
    //         let curDate = new Date(currentItem.site_day_date)
    //         if( curDate >= startDate && curDate <= endDate) {
    //           previousItem.user_name = currentItem.user_name
    //           previousItem.daily_site_name = currentItem.daily_site_name
    //           previousItem.correct_percent += currentItem.correct ? 1 : 0
    //           previousItem.guess_average += currentItem.guess_count
    //           previousItem.records += 1
    //         }
    //         return previousItem
    //       },{user_name:'',daily_site_name:'',date_range:GetMMDDYYYY(startDate) + ' - ' + GetMMDDYYYY(endDate),guess_average:0,correct_percent:0,records:0})
    //       let records = reducedResult.records == 0 ? 1 : reducedResult.records
    //       reducedResult.guess_average = reducedResult.guess_average / records
    //       reducedResult.correct_percent = reducedResult.correct_percent / records
    //       objects.push(reducedResult)
    //       endDate=startDate
    //       startDate = SubtractMonths(new Date(endDate),1)
    //     }
    //     return objects
    //   } else {
    //     let endDate = new Date()
    //     let startDate = SubtractMonths(new Date(endDate),12)
    //     let objects = []
    //     for(let i = 0; i < 7; i++) {
    //       let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
    //         let curDate = new Date(currentItem.site_day_date)
    //         if( curDate >= startDate && curDate <= endDate) {
    //           previousItem.user_name = currentItem.user_name
    //           previousItem.daily_site_name = currentItem.daily_site_name
    //           previousItem.correct_percent += currentItem.correct ? 1 : 0
    //           previousItem.guess_average += currentItem.guess_count
    //           previousItem.records += 1
    //         }
    //         return previousItem
    //       },{user_name:'',daily_site_name:'',date_range:GetMMDDYYYY(startDate) + ' - ' + GetMMDDYYYY(endDate),guess_average:0,correct_percent:0,records:0})
    //       let records = reducedResult.records == 0 ? 1 : reducedResult.records
    //       reducedResult.guess_average = reducedResult.guess_average / records
    //       reducedResult.correct_percent = reducedResult.correct_percent / records
    //       objects.push(reducedResult)
    //       endDate=startDate
    //       startDate = SubtractMonths(new Date(endDate),12)
    //     }
    //     return objects
    //   }
    // }

    // const SubtractDays = (date:Date, days:number) => {
    //   let dateOffset = (24*60*60*1000) * days; //5 days
    //   date.setTime(date.getTime() - dateOffset);
    //   return date
    // }

    // const SubtractMonths = (date:Date, months:number) => {
    //   return new Date(
    //       date.getFullYear(),
    //       date.getMonth() - months, 
    //       date.getDate()
    //   );
    // }

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
              <div style={{paddingLeft:'10px'}}>Span:</div>
              <select onChange={setSpan}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
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