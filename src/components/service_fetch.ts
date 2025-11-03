import FileObject from "@/data/FileObject";
import FileObjectMetaData from "@/data/FileObjectMetaData";
import Game from "@/data/game";
import List from "@/data/list";
import PostResponse from "@/data/post_response";
import User from "@/data/user";
import { redirect } from "next/navigation";

export async function retriveUser(token: any, ClientCall: boolean = false) {
    if (token) {
        var data;
        try {
            const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
            console.log('Fetching user data... URL:', `${baseURL}/user`, ' Token:', token);
            data = await fetch(`${baseURL}/user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                mode: 'cors'
            })
        } catch (error: any) {
            console.log(error)
            redirect('/error?' + error.toString())
        }
        if (data.status == 200) {
            const content = await data.json()
            return content;
        } else {
            redirect('/login')
        }
    } else {
        redirect('/login')
    }
}

export async function retriveUserOrGuest(token: any, ClientCall: boolean = false) {
    if (token) {
        var data = null;
        try {
            const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
            data = await fetch(`${baseURL}/user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                mode: 'cors'
            })
        } catch (error: any) {
            console.log(error)
            redirect('/error?' + error.toString())
        }
        if (data.status == 200) {
            const content = await data.json()
            return content;
        } else {
            console.log('failed to get user')
            return new User('Guest', 0, 0, 0, '', false, false)
        }
    } else {
        console.log('no token')
        return new User('Guest', 0, 0, 0, '', false, false)
    }
}

export async function retriveWonNumbers(token: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const numberData = await fetch(`${baseURL}/numberWins`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (numberData.status == 200) {
        const numbers = await numberData.json();
        return numbers
    } else {
        return []
    }
}

export async function GetUserGuess(token: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/info/guess/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const guesses = await data.json();
        return guesses
    } else {
        return { guessInfo: [], numberId: 0 }
    }
}

export async function GetUserNotificationPreference(token: any, ClientCall: boolean = false) {
    return await sendGet('/user/notification/preference', token, '', ClientCall)
}

export async function GetSite(token: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/site`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        let content = await data.json()
        return content
    } else {
        return []
    }
}

export async function GetOrderedUsers(token: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const content = await data.json()
        let orderedContent = content.sort((a: User, b: User) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })
        return orderedContent
    } else {
        return []
    }
}

export async function GetOrderedGames(token: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/game`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const content = await data.json()
        let orderedContent = content.sort((a: Game, b: Game) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })
        return orderedContent
    } else {
        return []
    }
}

export async function retriveAllRequest(token: any, closed: any = null, ClientCall: boolean = false) {
    console.log(closed)
    let closedString = closed === null ? '' : `?closed=${closed}`
    console.log(closedString)
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/request${closedString}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function retriveRequest(token: any, userName: any, closed: any = null, ClientCall: boolean = false) {
    let closedString = closed === null ? '' : `?closed=${closed}`
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/request/${userName}${closedString}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function retriveRequestMessages(token: any, id: any, ClientCall: boolean = false) {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}/request_messages/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function GetList(token: any, userName: string, ClientCall: boolean = false) {
    return await sendGet(`/list/${userName}`, token, '', ClientCall)
}

export async function GetListQuickView(token: any, id: number, ClientCall: boolean = false) {
    return await sendGet(`/list/quickview/${id}`, token, '', ClientCall)
}

export async function GetTotGameOverview(token: any, userName: string, ClientCall: boolean = false) {
    return await sendGet('/totGame/overview', token, `/${userName}`, ClientCall)
}

export async function GetTotGame(token: any, id: number, userName: string, ClientCall: boolean = false) {
    return await sendGet('/totGame/game', token, `?id=${id}&userName=${userName}`, ClientCall)
}

export async function sendTotGameAction(token: any, action: string, id: number, ClientCall: boolean = false) {
    return await sendPost(`/totGame/action`, token, { action: action, id: id }, ClientCall)
}

export async function GetNotifications(token: any, userName: string, ClientCall: boolean = false) {
    return await sendGet('/notifications', token, `?userName=${userName}`, ClientCall)
}

export async function sendAddRequestMessage(token: any, body: any, ClientCall: boolean = false) {
    return await sendPost('/requestMessage/add', token, body, ClientCall)
}

export async function sendAddRequest(token: any, body: any, ClientCall: boolean = false): Promise<PostResponse> {
    return await sendPost('/request/add', token, body, ClientCall)
}

export async function sendUpdateRequestStatus(token: any, body: any, ClientCall: boolean = false): Promise<PostResponse> {
    return await sendPost('/request_message/updateStatus', token, body, ClientCall)
}

export async function sendUpdateRequestViewStatus(token: any, body: any, ClientCall: boolean = false) {
    return await sendPost('/request/view_status/update', token, body, ClientCall)
}

export async function SendAddList(token: any, body: List, userName: string, ClientCall: boolean = false) {
    return await sendPost('/list/add', token, { name: body.name, type: body.type, is_template: body.is_template, user_name: userName, user_names: body.user_names }, ClientCall)
}

export async function SendAddTemplateItems(token: any, listId: number, templateId: number, ClientCall: boolean = false) {
    return await sendPost('/list/addTemplate', token, { list_id: listId, template_id: templateId }, ClientCall)
}

export async function SendDeleteList(token: any, id: number, ClientCall: boolean = false) {
    return await sendPost('/list/delete', token, { id: id }, ClientCall)
}

export async function SendAddListItem(token: any, itemName: string, listId: number, count: number, ClientCall: boolean = false) {
    return await sendPost('/listItem/add', token, { list_id: listId, name: itemName, count: count }, ClientCall)
}

export async function SendDeleteListItem(token: any, itemId: number, ClientCall: boolean = false) {
    return await sendPost('/listItem/delete', token, { id: itemId }, ClientCall);
}

export async function SendUserSocialupdate(token: any, isPublic: boolean, ClientCall: boolean = false) {
    return await sendPost('/user/update/social', token, { public: isPublic }, ClientCall)
}

export async function SendUserNotificationPreferenceUpdate(token: any, body: any, ClientCall: boolean = false) {
    return await sendPost('/user/update/notificationPreference', token, { daily_guess: body.daily_guess, tot_game: body.tot_game, request_preference: body.request }, ClientCall)
}

export async function SendUserEmailUpdate(token: any, email: string, ClientCall: boolean = false) {
    return await sendPost('/user/update/email', token, { email: email }, ClientCall)
}

export async function SendAddTotGame(token: any, type: string, challangedUser: string, CreatorUser: string, ClientCall: boolean = false) {
    return await sendPost('/totGame/add', token, { type: type, challangedUser: challangedUser, creatorUser: CreatorUser }, ClientCall)
}

export async function SendAcceptTotGame(token: any, totId: number, userName: string, ClientCall: boolean = false) {
    return await sendPost('/totGame/accept', token, { tot_id: totId, userName: userName }, ClientCall)
}

export async function SendDeleteTotGame(token: any, id: number, ClientCall: boolean = false) {
    return await sendPost(`/totGame/delete/${id}`, token, {}, ClientCall)
}

export async function GetHighScores(token: any, game: string, daily: boolean, ClientCall: boolean = false) {
    var parameters = daily ? `?game=${game}&date=${new Date().toDateString()}` : `?game=${game}`
    return await sendGet('/highscore', token, parameters, ClientCall)
}

export async function GetFileList(token: any, driveId: number, parentId: number, page: number, withPreview: boolean, sortBy: string, sortDirection: string, ClientCall: boolean = false): Promise<FileObject[]> {
    var parameters = `?driveId=${driveId}&parentId=${parentId}&size=20&page=${page}&withPreview=${withPreview}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    console.log(parameters)
    const result = await sendGet('/Files', token, parameters, ClientCall)
    const newFileList = new Array<FileObject>()
    result.forEach((item: any) => {
        newFileList.push(new FileObject(item.name, item.id, item.preview, item.buffer, new FileObjectMetaData(item.metaData)))
    });
    return newFileList
}

export async function GetFile(token: any, driveId: number, parentId: number, name: string, withPreview: boolean = false, ClientCall: boolean = false): Promise<FileObject> {
    var parameters = `?driveId=${driveId}&name=${name}&parentId=${parentId}&withPreview=${withPreview}`
    const result = await sendGet('/FileInfo', token, parameters, ClientCall)
    return new FileObject(result.name, result.id, result.preview, result.buffer, new FileObjectMetaData(result.metaData))
}

export async function SearchFiles(token: any, driveId: number, searchText: string, withPreview: boolean, ClientCall: boolean = false) {
    var parameters = `?driveId=${driveId}&searchText=${searchText}&withPreview=${withPreview}`
    const result = await sendGet('/File/search', token, parameters, ClientCall)
    const newFileList = new Array<FileObject>()
    result.forEach((item: any) => {
        newFileList.push(new FileObject(item.name, item.id, item.preview, item.buffer, new FileObjectMetaData(item.metaData)))
    });
    return newFileList
}

export async function uploadFile(token: any, driveId: number, parentId: number, name: string, data: any, ClientCall: boolean = false) {
    var body = {
        driveId: driveId,
        parentId: parentId,
        name: name,
        data: data
    }
    return await sendPost('/PostFile', token, body, ClientCall)
}

export async function uploadFolder(token: any, driveId: number, parentId: number, name: string, ClientCall: boolean = false) {
    var body = {
        driveId,
        parentId,
        name
    }
    return await sendPost('/directory/create', token, body, ClientCall)
}

export async function deleteFile(token: any, driveRecordId: number, ClientCall: boolean = false) {
    var body = {
        driveRecordId: driveRecordId
    }
    return await sendPost('/DeleteFile', token, body, ClientCall)
}

export async function createDirectory(token: any, ClientCall: boolean = false) {
    return await sendPost('/directory/create', token, {}, ClientCall)
}

export async function GetUserDriveList(token: any, ClientCall: boolean = false) {
    let result = await sendGet('/Drives', token, '', ClientCall)
    return result
}

export async function GetDrive(token: any, driveId: number, ClientCall: boolean = false) {
    let queryString = `?driveId=${driveId}`
    let result = await sendGet('/Drive', token, queryString, ClientCall)
    return result
}

export async function CreateDrive(token: any, drive: string, path: string, ClientCall: boolean = false) {
    let body = {
        driveName: drive,
        path: path
    }
    return await sendPost('/Drive/create', token, body, ClientCall)
}

export async function DeleteDrive(token: any, driveId: number, ClientCall: boolean = false) {
    let body = {
        driveId: driveId
    }
    return await sendPost('/Drive/delete', token, body, ClientCall)
}

export async function GetDriveUsers(token: any, driveId: number, ClientCall: boolean = false) {
    let queryString = `?driveid=${driveId}`
    return await sendGet('/Drive/users', token, queryString, ClientCall)
}

export async function UpdateDriveUsers(token: any, users: Array<string>, driveId: number, ClientCall: boolean = false) {
    let body = {
        users: users,
        driveId: driveId
    }
    return await sendPost('/Drive/users/update', token, body, ClientCall)
}

export async function StartPasswordReset(token: any, username: string, email: string, ClientCall: boolean = false) {
    let body = {
        username: username,
        email: email
    }
    return await sendPost('/startPasswordReset', token, body, ClientCall)
}

export async function ResetPassword(password: string, resetCode: string, ClientCall: boolean = false) {
    let body = {
        password: password,
        resetCode: resetCode
    }
    return await sendNonAuthPost('/resetPassword', body, ClientCall)
}

export async function GetCurrentNumberPuzzle(token: any, ClientCall: boolean = false) {
    return await sendGet('/getCurrentNumPuzzle', token, '', ClientCall)
}

export async function SendCurrentNumberPuzzleGuess(token: any, guess: Array<number>, ClientCall: boolean = false) {
    return await sendPost('/guessCurrentNumPuzzle', token, { guess: guess }, ClientCall)
}

export async function sendGet(url: string, token: any, queryString: string = '', ClientCall: boolean = false): Promise<any> {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}${url}${queryString}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    })
    if (data.status == 200) {
        const request = await data.json();
        return request
    } else {
        return []
    }
}

export async function sendPost(url: string, token: any, body: any, ClientCall: boolean = false): Promise<PostResponse> {
    try {
        const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
        const data = await fetch(`${baseURL}${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
        if (data.status == 200) {
            const request = await data.json();
            return new PostResponse(true, request.success, request)
        } else {
            const request = await data.json();
            return new PostResponse(false, request.error, request)
        }
    }
    catch (exception) {
        return new PostResponse(false, 'Threw error', { error: exception })
    }
}

export async function sendNonAuthPost(url: string, body: any, ClientCall: boolean = false): Promise<PostResponse> {
    const baseURL = ClientCall ? process.env.CLIENT_API_URL : process.env.API_URL;
    const data = await fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        mode: 'cors'
    })
    if (data.status == 200) {
        const request = await data.json();
        return new PostResponse(true, request.success, request)
    } else {
        const request = await data.json();
        return new PostResponse(false, request.error, request)
    }
}