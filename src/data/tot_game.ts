
export default class TotGames {

    id: number
    type: string
    users: string
    game_json: string
    status: string
    winner: string

    constructor(id:number, type:string, users: string, game_json: string, status: string, winner: string) {
        this.id = id
        this.type = type
        this.users = users
        this.game_json = game_json
        this.status = status
        this.winner = winner
    }
}