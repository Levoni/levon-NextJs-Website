export default class BuzzGame {

    game_id: string
    type: string
    messages: Array<string>
    host: string
    state:string



    constructor(game_id:string, type: string, messages: Array<string>, host: string, state:string) {
        this.game_id = game_id
        this.type = type
        this.messages = messages
        this.host = host
        this.state = state
    }
}