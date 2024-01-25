'use client';
export default function Confirm(props:any) {

    let defaultTitle = 'Are you sure you want to delete this item?'

    let handleClick = (result:boolean) => {
        if(props.clickCallback) {
            props.clickCallback(result)
        }
    }

    return (
        <div style={{backgroundColor:'rgba(0, 0, 0, 0.5)', position:'fixed',left:0,right:0,top:0,bottom:0}}>
            <div className="dialog" style={{position:'absolute'}}>
                <div className="dialog-title">{props.title ? props.title : defaultTitle}</div>
                <div className="dialog-buttons">
                    <button className="small-button" onClick={() => {handleClick(true)}}> Yes </button>
                    <button className="small-button" onClick={() => {handleClick(false)}}> No </button>
                </div>
            </div>
        </div>
    )
}