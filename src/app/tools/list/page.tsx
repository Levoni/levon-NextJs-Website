import Header from "@/components/header";
import PageListWrapper from "@/components/page_list";
import { GetList, GetListQuickView, retriveUser } from "@/components/service_fetch";
import List from "@/data/list";
import User from "@/data/user";
import { cookies } from "next/headers";

type Props = {
    params?: {
      num?: string;
    };
    searchParams?:any
  };

export default async function ListPage(props:Props) {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var lists = await GetList(token,user.name.toString())
    var templates = lists.filter((list:List) => {
        return list.is_template == true
    })

    if(props.searchParams && props.searchParams.id) {
        var list:List = await GetListQuickView(token,props.searchParams.id)


        return (
            <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
                <Header token={token} userName={user.name}></Header>
                <div className="body-padding">
                <PageListWrapper templates={templates} list={list}></PageListWrapper>
                </div>
            </div>
        )
    }

    return (
        <div>No list exists with this id</div>
    )
}