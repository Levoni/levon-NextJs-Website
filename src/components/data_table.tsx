export default function DataTable(props:any) {
//Takes data in form of key [{key:'',values:[]}]
//Title

let trimDecimal = (num:number) => {
    if(num && isNumber(num) && num.toString().indexOf('.') != -1)
        return num.toFixed(2);
    return num
}

function isNumber(value:any) {
    return typeof value === 'number';
  }

return (
    <div className="small-text" style={{overflowX:'auto'}}>
        {props.title && <div className="card-header">{props.title}</div>}
        <div className="row" style={{justifyContent:'space-around'}}>
            {props.data && props.data.header.map((header:any) => {
                return(
                    <div key={header.value} style={{display:'flex',flexDirection:'column', whiteSpace:'nowrap'}}>
                        <div style={{height:'30px'}}  className="row">
                            {header.text.toString()}
                        </div>
                        {props.data.values.map((value:any, index:Number) => {
                            return(
                                <div key={index.toString()} style={{height: '20px', alignSelf:'center'}}>
                                    {trimDecimal(value[header.value])}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>
)}