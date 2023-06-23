'use client';
import User from '@/data/user';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserAuth(props: any) {
    var [status, setStatus] = useState(0)
    var [user, setUser] = useState(new User('',0,0,0,'', false))
    const router = useRouter()
    

    useEffect(()=> {
        if(!localStorage.getItem('numberGuessToken')) {
            router.push('/login')
        } else {
            let data = JSON.parse(window.atob(localStorage.getItem('numberGuessToken')?.split('.')[1]!!))
            if(data.exp * 1000 < Date.now()) {
                localStorage.clear()
                router.push('/login')
            } else {
                let token = localStorage.getItem("numberGuessToken")!!
                retriveUser(token)
            }
        }
    },[])

    const retriveUser = async (token: String) => {
        const data = await fetch(process.env.API_URL + '/user',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors'
        })
        if(data.status == 200) {
            const content = await data.json()
            setUser(content)
            setStatus(1)
            props.retrieveData(content)
        }
    }

    return (
        status == 0 ? <div></div> : <div style={{display:'flex', flexDirection:'column', flex:'1'}}>{props.children}</div>
    )
}