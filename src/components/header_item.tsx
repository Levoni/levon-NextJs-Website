import Link from "next/link"

export default function HeaderItem(props:any) {

    return (
        <div className="header-bar-item" style={{position:'relative'}}>
            <div>{props.title}</div>
            <div className="header-bar-item-options card" style={{backgroundColor:'#222526', zIndex:'1', position:'absolute', whiteSpace:'nowrap'}}>
                {props.items && props.items.map((item:any)=> {
                    return (
                        <Link href={item.link}>{item.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}