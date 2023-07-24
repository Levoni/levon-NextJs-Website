export default class MultiplayerGame {
    game_id: number
    type: string
    messages: Array<string>
    current_Turn: number

    constructor(game_id:number, type: string, messages: Array<string>, current_Turn: number) {
        this.game_id = game_id
        this.type = type
        this.messages = messages
        this.current_Turn = current_Turn
    }
}