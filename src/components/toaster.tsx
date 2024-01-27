'use client';

import ToasterData from "@/data/toaster";
import { useEffect, useState } from "react";

export default function Toaster(props:any) {
    const [toasters,setToasters] = useState<ToasterData[]>([])

    useEffect(() => {
        if(props.newToaster) {
            console.log('added')
            setToasters(prev => [
                ...prev,
                props.newToaster
            ])
        }
    },[props.newToaster])

    useEffect(() => {
        setInterval(() => {
            setToasters(prev => prev.filter(x => {
                let difference = new Date().getTime() - x.time 
                console.log('difference: ' + difference)
                return difference < x.duration 
            }))
        },1000)
    },[])

    const resetTime = (time:number) => {
        console.log(toasters)
        setToasters(prev => {
            return prev.map(x => {
                if(x.time == time) {
                    x.time = new Date().getTime()
                    return x
                }
                return x
            })
        })
    }

    return (
        <div>
            {toasters.map((x,index) => {
                return (
                    <div  onMouseOver={() => {resetTime(x.time)}} className={'toaster toaster-' + x.type} key={x.time.toString()} style={{animationDuration:Math.ceil(x.duration / 1000).toString() + 's', position:'fixed',right:'100px',bottom:(100 + 100 * index).toString() + 'px'}}>
                        <div>{x.message}</div>
                    </div>
                )
            })}
        </div>
    )
}