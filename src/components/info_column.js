export default function infoColumn(props) {

    return(
        <div className="card stat-card">
            <div style={{alignSelf:'center'}} >{props.title}</div>
            <div style={{display:'flex', flex:'1', flexDirection:'column', gap:'10px', alignItems:'center', justifyContent:'space-around', minHeight:'50px'}}>
                {props.info.map((item,index) => {
                    return(
                    <div key={index} style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
                        <div>{item.name}</div>
                        <div>{item.value}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}