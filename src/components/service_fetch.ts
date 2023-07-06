import Game from "@/data/game";
import List from "@/data/list";
import PostResponse from "@/data/post_response";
import User from "@/data/user";
import { redirect } from "next/navigation";

export async function retriveUser(token: any) {
    if(token) {
        var data;
        try{
            data = await fetch(process.env.API_URL + '/user',{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                mode: 'cors'
            })
        } catch(error:any) {
            console.log(error)
            redirect('/error?' + error.toString())
        }
        if(data.status == 200) {
            const content = await data.json()
            return content;
        } else {
            redirect('/login')
        }
    } else {
        redirect('/login')
    }
}

export async function retriveWonNumbers(token: any) {
    const numberData = await fetch(process.env.API_URL + '/numberWins',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(numberData.status  == 200) {
        const numbers = await numberData.json();
        return numbers
    } else {
        return []
    }
}

export async function GetUserGuess(token:any) { 
    const data = await fetch(process.env.API_URL + '/info/guess/user',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(data.status  == 200) {
        const guesses = await data.json();
        return guesses
    } else {
        return {guessInfo:[],numberId:0}
    }
}

export async function GetSite(token:any) {
    const data = await fetch(process.env.API_URL + '/site',{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      mode: 'cors'
    })
    if(data.status == 200) {
      let content = await data.json()
      return content
    } else {
      return []
    }
  }

  export async function GetOrderedUsers(token:any) {
    const data = await fetch(process.env.API_URL + '/users',{
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
        let orderedContent = content.sort((a:User, b:User) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })
        return orderedContent
    } else {
        return []
    }
  }

  export async function GetOrderedGames(token:any) {
    const data = await fetch(process.env.API_URL + '/game',{
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
        let orderedContent = content.sort((a:Game, b:Game) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })
        return orderedContent
    } else {
        return []
    }
  }

  export async function retriveAllRequest(token: any, closed:any = null) {
    console.log(closed)
    let closedString = closed === null ? '' : `?closed=${closed}`
    console.log(closedString)
    const data = await fetch(process.env.API_URL + '/request' + closedString ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(data.status  == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

  export async function retriveRequest(token: any,userName:any, closed:any = null) {
    let closedString = closed === null ? '' : `?closed=${closed}`
    const data = await fetch(process.env.API_URL + '/request/' + userName + closedString,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(data.status  == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function retriveRequestMessages(token: any,id:any) {
    const data = await fetch(process.env.API_URL + '/request_messages/' + id,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(data.status  == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function GetList(token:any,userName:string) {
    return await sendGet('/list', token,`/${userName}`,'')
}

export async function GetListQuickView(token:any,id:number) {
    return await sendGet('/list/quickview', token,`/${id}`,'')
}

export async function sendAddRequestMessage(token:any, body:any) {
    return await sendPost('/requestMessage/add', token,body)
}

export async function sendAddRequest(token:any, body:any) {
    return await sendPost('/request/add', token,body)
}

export async function sendUpdateRequestStatus(token:any, body:any):Promise<PostResponse> {
    return await sendPost('/request_message/updateStatus',token,body)
}

export async function SendAddList(token:any, body:List, userName:string) {
    return await sendPost('/list/add',token,{name:body.name, type: body.type,is_template:body.is_template,user_name:userName,user_names: body.user_names})
}

export async function SendAddTemplateItems(token:any, listId:number, templateId:number) {
    return await sendPost('/list/addTemplate', token ,{list_id:listId,template_id:templateId})
}

export async function SendDeleteList(token:any, id:number) {
    return await sendPost('/list/delete',token,{id:id})
}

export async function SendAddListItem(token:any, itemName:string, listId:number, count:number) {
    return await sendPost('/listItem/add',token,{list_id:listId,name:itemName,count:count})
}

export async function SendDeleteListItem(token:any, itemId:number) {
    return await sendPost('/listItem/delete',token,{id:itemId});
}

export async function sendGet(url:string,token:any, routeParam:string = '', queryString:string = '') {
    const data = await fetch(process.env.API_URL + url + routeParam + queryString,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if(data.status  == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function sendPost(url: string, token:any, body:any):Promise<PostResponse> {
    const data = await fetch(process.env.API_URL + url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(body),
        mode: 'cors'
    })
    if(data.status  == 200) {
        const request = await data.json();
        return new PostResponse(true,request.success,request)
    } else {
        const request = await data.json();
        return new PostResponse(false,request.error,request)
    }
}