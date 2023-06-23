import Game from "@/data/game";
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

  export async function LogoutMethod() {
    redirect('/login')
  }