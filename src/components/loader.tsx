'use client';
export default function Loader(props:any) {

    if(props.local) {
        return  (
            <div onClick={(e:any)=>{e.stopPropagation()}} style={{position:'relative',width:'100%',height:'100%'}}>
                <div style={{ padding:'0px',margin:'0px',
                            position:'absolute',
                            left:'50%',
                            top:'50%',
                            transform:'translate(-50%, -50%)'}}>
                    <span className="loader"></span>
                </div>
            </div>
        )
    } else {
        return  (
            <div onClick={(e:any)=>{e.stopPropagation()}} style={{backgroundColor:'rgba(0, 0, 0, 0.5)', position:'fixed',left:0,right:0,top:0,bottom:0}}>
                <div style={{ padding:'0px',margin:'0px',
                            position:'fixed',
                            left:'50%',
                            top:'50%',
                            transform:'translate(-50%, -50%)'}}>
                    <span className="loader"></span>
                </div>
            </div>
        )
    }
}