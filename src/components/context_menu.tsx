'use client';

import { useState } from "react";

export default function ContextButton(props:any) {
    const [hovering, setHovering] = useState(false)

    function handleSelection(actionString:any) {
        if(props.selectionCallback) {
            props.selectionCallback(actionString)
        }
    }

    function toggleClick() {
        setHovering(true)
    }

    function toggleNonHover() {
        setHovering(false)
    }

    return <div style={{position:'relative'}} onClick={toggleClick} onMouseLeave={toggleNonHover}>
        <div>I click</div>
        {hovering && <div style={{position:'absolute', width:'120px', top: 40}} className="card">
            {props.options && props.options.map((item:any) => {
                return (<div key={item} onClick={() => handleSelection(item)}>{item}</div>)
            })}
        </div>}
    </div>
}