
export function SubtractDays(date:Date, days:number) {
    let dateOffset = (24*60*60*1000) * days; //5 days
    date.setTime(date.getTime() - dateOffset);
    return date
  }

  export function SubtractMonths(date:Date, months:number) {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth() - months, 
        date.getUTCDate()
    );
  }

  export function GetYYYYMMDD(date:Date) {
    var day = date.getUTCDate().toString().padStart(2, "0");
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var year = date.getUTCFullYear().toString().padStart(2, "0");   
    return `${year}-${month}-${day}`
}