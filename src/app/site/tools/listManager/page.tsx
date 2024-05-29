import Header from "@/components/header";
import PageListManagerWrapper from "@/components/page_listManager";
import { GetList, GetOrderedUsers, retriveUser } from "@/components/service_fetch";
import List from "@/data/list";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function ListManagerPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var users:Array<User> = await GetOrderedUsers(token)
    if(users) {
        users = users.filter((element) => {
            return element.name != user.name
        })
    }
    var lists = await GetList(token,user.name.toString())
    
    return(
        <>
            <div style={{display:'flex',paddingBottom:'25px', width:'100%', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>List Manager</div>
                    <div style={{paddingBottom:'10px'}}>This page is a tool for users to create and manage lists.
                    Lists can be created from scratch or using a saved template they created themselves.</div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <div style={{flex:'1'}}>
                <PageListManagerWrapper initialLists={lists} users={users} token={token} user={user}></PageListManagerWrapper>
            </div>
        </>
    )
}