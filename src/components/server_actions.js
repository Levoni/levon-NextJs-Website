'use server'

import { cookies } from "next/headers"

export async function AddLoginCookie (token) {
    const cookieStore = cookies();
    var date = new Date();
    date.setTime(date.getTime() + (5 * 60 * 60 * 1000))
    cookieStore.set({
        name:'loginToken',
        value:token,
        expires: date,
        path:'/'
    })
}

export async function ClearLoginCookie() {
    const cookieStore = cookies();
    cookieStore.set({name:'loginToken',value:'',maxAge:0})
    return
}