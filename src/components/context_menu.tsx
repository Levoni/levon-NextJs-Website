'use client';

import { useState } from "react";
import contextIconImage from "../public/context menu icon.png"

export default function ContextButton(props: any) {
    const [hovering, setHovering] = useState(false)

    function handleSelection(actionString: any) {
        if (props.selectionCallback) {
            props.selectionCallback(actionString)
        }
    }

    function getMenuStyling():any {
        if (props.alignment !== 'right') {
            return { backgroundColor: 'ThreeDHighlight', position: 'absolute', width: '120px', top: 0, left: 0 }
        } else {
            return { backgroundColor: 'ThreeDHighlight', position: 'absolute', width: '120px', top: 0, right: 0 }
        }
    }

    function toggleClick() {
        setHovering(true)
    }

    function toggleNonHover() {
        setHovering(false)
    }

    return <div style={{ position: 'relative' }} onMouseLeave={toggleNonHover}>
        <img style={{maxWidth:'100%', height:'32px'}} src={contextIconImage.src} onClick={toggleClick}/>
        {hovering && <div style={getMenuStyling()} className="card">
            {props.options && props.options.map((item: any) => {
                return (<div className="clickable" key={item} onClick={() => handleSelection(item)}>{item}</div>)
            })}
        </div>}
    </div>
}