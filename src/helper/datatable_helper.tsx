import UserSiteLink from "@/data/user_site_link";
import { GetYYYYMMDD, SubtractDays, SubtractMonths } from "./date_helper";

export function GetOriganizedResultData(data:UserSiteLink[], span:string) {
    if(span == 'daily') {
      return data;
    } else if(span == 'weekly') {
      let endDate = new Date()
      let startDate =  SubtractDays(new Date(endDate),7)
      let objects = []
      for(let i = 0; i < 7; i++) {
        let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
          let curDate = new Date(currentItem.site_day_date)
          if( curDate >= startDate && curDate <= endDate) {
            previousItem.user_name = currentItem.user_name
            previousItem.daily_site_name = currentItem.daily_site_name
            previousItem.correct_percent += currentItem.correct ? 1 : 0
            previousItem.guess_average += currentItem.guess_count
            previousItem.records += 1
          }
          return previousItem
        },{user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0})
        let records = reducedResult.records == 0 ? 1 : reducedResult.records
        if(reducedResult.records != 0) {
          reducedResult.guess_average = reducedResult.guess_average / records
          reducedResult.correct_percent = reducedResult.correct_percent / records
          objects.push(reducedResult)
        }
        endDate=startDate
        startDate =  SubtractDays(new Date(endDate),7)
      }
      return objects
    } else if(span == 'monthly') {
      let endDate = new Date()
      let startDate =  SubtractMonths(new Date(endDate),1)
      let objects = []
      for(let i = 0; i < 7; i++) {
        let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
          let curDate = new Date(currentItem.site_day_date)
          if( curDate >= startDate && curDate <= endDate) {
            previousItem.user_name = currentItem.user_name
            previousItem.daily_site_name = currentItem.daily_site_name
            previousItem.correct_percent += currentItem.correct ? 1 : 0
            previousItem.guess_average += currentItem.guess_count
            previousItem.records += 1
          }
          return previousItem
        },{user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0})
        let records = reducedResult.records == 0 ? 1 : reducedResult.records
        if(reducedResult.records != 0) {
          reducedResult.guess_average = reducedResult.guess_average / records
          reducedResult.correct_percent = reducedResult.correct_percent / records
          objects.push(reducedResult)
        }
        endDate=startDate
        startDate =  SubtractMonths(new Date(endDate),1)
      }
      return objects
    } else {
      let endDate = new Date()
      let startDate =  SubtractMonths(new Date(endDate),12)
      let objects = []
      for(let i = 0; i < 7; i++) {
        let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
          let curDate = new Date(currentItem.site_day_date)
          if( curDate >= startDate && curDate <= endDate) {
            previousItem.user_name = currentItem.user_name
            previousItem.daily_site_name = currentItem.daily_site_name
            previousItem.correct_percent += currentItem.correct ? 1 : 0
            previousItem.guess_average += currentItem.guess_count
            previousItem.records += 1
          }
          return previousItem
        },{user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0})
        let records = reducedResult.records == 0 ? 1 : reducedResult.records
        if(reducedResult.records != 0) {
          reducedResult.guess_average = reducedResult.guess_average / records
          reducedResult.correct_percent = reducedResult.correct_percent / records
          objects.push(reducedResult)
        }
        endDate=startDate
        startDate =  SubtractMonths(new Date(endDate),12)
      }
      return objects
    }
  }

  export function GetOriganizedMultiUserResultData(data:UserSiteLink[], span:string, initialDate:Date) {
    if(span == 'daily') {
      return data;
    } else if(span == 'weekly') {
      let endDate = initialDate
      let startDate =  SubtractDays(new Date(endDate),7)
      let objects = []
      let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
        let curDate = new Date(currentItem.site_day_date)
        if( curDate >= startDate && curDate <= endDate) {
          if(previousItem[currentItem.user_name.toString()]== null) {
            previousItem[currentItem.user_name.toString()] = {user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0}
          }
          previousItem[currentItem.user_name.toString()].user_name = currentItem.user_name
          previousItem[currentItem.user_name.toString()].daily_site_name = currentItem.daily_site_name
          previousItem[currentItem.user_name.toString()].correct_percent += currentItem.correct ? 1 : 0
          previousItem[currentItem.user_name.toString()].guess_average += currentItem.guess_count
          previousItem[currentItem.user_name.toString()].records += 1
        }
        return previousItem
      },{})
      // let records = reducedResult.records == 0 ? 1 : reducedResult.records
      // reducedResult.guess_average = reducedResult.guess_average / records
      // reducedResult.correct_percent = reducedResult.correct_percent / records
      const values = Object.keys(reducedResult).map(key => {
        let records = reducedResult[key].records == 0 ? 1 : reducedResult[key].records
        reducedResult[key].guess_average =  reducedResult[key].guess_average / records
        reducedResult[key].correct_percent = reducedResult[key].correct_percent / records
        return reducedResult[key]
      });
      objects.push(...values)
      return objects
    } else if(span == 'monthly') {
      let endDate = initialDate
      let startDate =  SubtractMonths(new Date(endDate),1)
      let objects = []
      let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
        let curDate = new Date(currentItem.site_day_date)
        if( curDate >= startDate && curDate <= endDate) {
          if(previousItem[currentItem.user_name.toString()]== null) {
            previousItem[currentItem.user_name.toString()] = {user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0}
          }
          previousItem[currentItem.user_name.toString()].user_name = currentItem.user_name
          previousItem[currentItem.user_name.toString()].daily_site_name = currentItem.daily_site_name
          previousItem[currentItem.user_name.toString()].correct_percent += currentItem.correct ? 1 : 0
          previousItem[currentItem.user_name.toString()].guess_average += currentItem.guess_count
          previousItem[currentItem.user_name.toString()].records += 1
        }
        return previousItem
      },{})
      // let records = reducedResult.records == 0 ? 1 : reducedResult.records
      // reducedResult.guess_average = reducedResult.guess_average / records
      // reducedResult.correct_percent = reducedResult.correct_percent / records
      const values = Object.keys(reducedResult).map(key => {
        let records = reducedResult[key].records == 0 ? 1 : reducedResult[key].records
        reducedResult[key].guess_average =  reducedResult[key].guess_average / records
        reducedResult[key].correct_percent = reducedResult[key].correct_percent / records
        return reducedResult[key]
      });
      objects.push(...values)
      return objects
    } else {
      let endDate = initialDate
      let startDate =  SubtractMonths(new Date(endDate),12)
      let objects = []
      let reducedResult = data.reduce<any>((previousItem:any,currentItem:UserSiteLink,index:any) => {
        let curDate = new Date(currentItem.site_day_date)
        if( curDate >= startDate && curDate <= endDate) {
          if(previousItem[currentItem.user_name.toString()]== null) {
            previousItem[currentItem.user_name.toString()] = {user_name:'',daily_site_name:'',date_range: GetYYYYMMDD(startDate) + ' - ' +  GetYYYYMMDD(endDate),guess_average:0,correct_percent:0,records:0}
          }
          previousItem[currentItem.user_name.toString()].user_name = currentItem.user_name
          previousItem[currentItem.user_name.toString()].daily_site_name = currentItem.daily_site_name
          previousItem[currentItem.user_name.toString()].correct_percent += currentItem.correct ? 1 : 0
          previousItem[currentItem.user_name.toString()].guess_average += currentItem.guess_count
          previousItem[currentItem.user_name.toString()].records += 1
        }
        return previousItem
      },{})
      // let records = reducedResult.records == 0 ? 1 : reducedResult.records
      // reducedResult.guess_average = reducedResult.guess_average / records
      // reducedResult.correct_percent = reducedResult.correct_percent / records
      const values = Object.keys(reducedResult).map(key => {
        let records = reducedResult[key].records == 0 ? 1 : reducedResult[key].records
        reducedResult[key].guess_average =  reducedResult[key].guess_average / records
        reducedResult[key].correct_percent = reducedResult[key].correct_percent / records
        return reducedResult[key]
      });
      objects.push(...values)
      return objects
    }
  }
