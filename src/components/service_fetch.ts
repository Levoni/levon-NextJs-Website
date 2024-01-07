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

export async function retriveUserOrGuest(token: any) {
    if(token) {
        var data = null;
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
            console.log('failed to get user')
            return new User('Guest',0,0,0,'',false,false)
        }
    } else {
        console.log('no token')
        return new User('Guest',0,0,0,'',false,false)
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

export async function GetUserNotificationPreference(token:any,) {
    return await sendGet('/user/notification/preference',token)
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

export async function GetTotGameOverview(token:any, userName: string) {
    return await sendGet('/totGame/overview',token,`/${userName}`)
}

export async function GetTotGame(token:any, id: number,userName: string) {
    return await sendGet('/totGame/game',token,`?id=${id}&userName=${userName}`)
}

export async function sendTotGameAction(token:any, action:string, id:number) {
    return await sendPost(`/totGame/action`, token, {action:action,id:id})
}

export async function GetNotifications(token:any, userName:string){
    return await sendGet('/notifications',token,`?userName=${userName}`)
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

export async function SendUserSocialupdate(token:any, isPublic:boolean) {
    return await sendPost('/user/update/social', token, {public:isPublic})
}

export async function SendUserNotificationPreferenceUpdate(token:any, body:any) {
    return await sendPost('/user/update/notificationPreference',token,{daily_guess:body.daily_guess,tot_game:body.tot_game})
}

export async function SendUserEmailUpdate(token:any,email:string) {
    return await sendPost('/user/update/email', token,{email:email})
}

export async function SendAddTotGame(token:any, type:string,challangedUser:string,CreatorUser:string) {
    return await sendPost('/totGame/add', token, {type:type,challangedUser:challangedUser,creatorUser:CreatorUser})
}

export async function SendAcceptTotGame(token:any, totId:number,userName:string) {
    return await sendPost('/totGame/accept', token, {tot_id:totId,userName:userName})
}

export async function SendDeleteTotGame(token:any, id:number) {
    return await sendPost(`/totGame/delete/${id}`, token, {})
}

export async function GetHighScores(token:any, game:string, daily:boolean) {
    var paramters = daily ? `?game=${game}&date=${new Date().toDateString()}` : `?game=${game}`
    return await sendGet('/highscore',token,'',paramters)
}

export async function GetFileList(token:any, drive:string, page:number, withPreview:boolean) {
    var paramters = `?drive=${drive}&size=20&page=${page}&withPreview=${withPreview}`
    return await sendGet('/FileList',token,'',paramters)
}

export async function GetFile(token:any, drive:string, name:string) {
    var paramters = `?drive=${drive}&name=${name}`
    return await sendGet('/File',token,'',paramters)
}

export async function uploadFile(token:any, drive:string, name:string, data:any) {
    var body = {
        drive:drive,
        name:name,
        data:data
    }
    return await sendPost('/PostFile',token,body)
}

export async function deleteFile(token:any, drive:string, name:string) {
    var body = {
        drive:drive,
        name:name
    }
    return await sendPost('/DeleteFile',token,body)
}

export async function createDirectory(token:any) {
    return await sendPost('/directory/create',token,{})
}

export async function GetDriveList(token:any) {
    let result = await sendGet('/Drive',token,'','')
    return result
}

export async function CreateDrive(token:any, drive:string) {
    let body = {
        drive:drive
    }
    return await sendPost('/Drive/create',token,body)
}

export async function DeleteDrive(token:any, driveId:number) {
    let body = {
        driveId:driveId
    }
    return await sendPost('/Drive/delete',token,body)
}

export async function GetDriveUsers(token:any, driveId:number) {
    let queryString = `?driveid=${driveId}`
    return await sendGet('/Drive/users',token,'',queryString)
}

export async function UpdateDriveUsers(token:any,users:Array<string>,driveId:number) {
    let body = {
        users:users,
        driveId:driveId
    }
    return await sendPost('/Drive/users/update',token,body)
}

export async function StartPasswordReset(token:any, username:string, email:string) {
    let body = {
        username:username,
        email:email
    }
    return await sendPost('/startPasswordReset',token,body)
}

export async function ResetPassword(password:string, resetCode:string) {
    let body = {
        password:password,
        resetCode:resetCode
    }
    return await sendNonAuthPost('/resetPassword',body)
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
    try {
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
    catch(exception) {
        return new PostResponse(false,'Threw error',{error:exception})
    }
}

export async function sendNonAuthPost(url: string, body:any):Promise<PostResponse> {
    const data = await fetch(process.env.API_URL + url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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