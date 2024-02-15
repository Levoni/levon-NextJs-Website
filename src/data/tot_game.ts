
export default class TotGame {

    id: number
    type: string
    users: string
    game_json: string
    status: string
    winner: string
    current: number
    accepted: boolean
    creator: boolean

    constructor(id:number, type:string, users: string, game_json: string, status: string, winner: string,current:number,accepted:boolean,creator:boolean) {
        this.id = id
        this.type = type
        this.users = users
        this.game_json = game_json
        this.status = status
        this.winner = winner
        this.current = current
        this.accepted = accepted
        this.creator = creator
    }
}