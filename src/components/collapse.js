import { useState } from "react"

export default function Collapse(props) {
    const [visible, setVisible] = useState(false)
    function toggle() {
        setVisible(!visible)
    }

    function GetHeight() {
        if(visible) {
            return props.maxHeight ? props.maxHeight : '500px'
        } else {
            return '0px'
        }
    }

    return (
        <div style={{background:'#111415'}}>
            <div className="collapse-header" onClick={toggle}>
                <div style={{marginRight:'10px'}}>{props.title}</div>
                <i className={visible ? "cheveron open":"cheveron"}></i>
            </div>
            <div style={{maxHeight:GetHeight()}} className={visible ? "collapse-body open":"collapse-body"}>
                <div style={{padding:'10px'}}>{props.children}</div>
            </div>
        </div>
    )
}