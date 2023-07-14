'use client';
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function GoogleAuth() {
    
    var router = useRouter()
    var searchParams = useSearchParams()
    var [status, setStatus] = useState('loading')
    
    const url = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?scope=https://www.googleapis.com/auth/drive` +
    `&response_type=code` +
    `&access_type=offline` +
    `&redirect_uri=${process.env.SITE_URL}/auth/google` +
    '&client_id=213487956564-4isp9d0dobdb9084a68sg072kul9rcig.apps.googleusercontent.com'

    useEffect(() => {
        //Authenticate API User
        if(!localStorage.getItem('numberGuessToken')) {
            router.push('/login')
            return
        } else {
            let data = JSON.parse(window.atob(localStorage.getItem('numberGuessToken')?.split('.')[1]!!))
            if(data.exp * 1000 < Date.now()) {
                localStorage.clear()
                router.push('/login')
                return
            } 
        }
        //Authenticate if this is a callback from chrome
        var code = searchParams.get('code')
        var redirect = searchParams.get('searchParam')
        if(redirect) {
            localStorage.setItem('redirectURL', redirect)
        }
        if(!code) {
            window.location.href = url;
        } else {
            let body = {"code":code}
            fetch(`${process.env.API_URL}/auth/user/accessToken`, {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('numberGuessToken')}`
                },
                body: JSON.stringify(body),
                mode: 'cors'
            }).then((data) => {
                data.json().then((tokenData) => {
                    setStatus('done')
                    const refreshToken = tokenData.refresh_token;
                    var redirect = localStorage.getItem('redirectURL') + `?code=${code}&refresh_token=${refreshToken}`
                    window.location.href = redirect;
                })
            })
        }
    })

    if(status == 'loading')
        return <div>Authenticating...</div>
    else
        return <div>Authenticated</div>
}