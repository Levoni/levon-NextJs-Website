import MultiplayerGame from "./mutiplayer_game"

export default class TicTacToeGame {

    game_id: string
    type: string
    messages: Array<string>
    current_Turn: number
    board:any
    state:string



    constructor(game_id:string, type: string, messages: Array<string>, current_Turn: number, board:any, state:string) {
        this.game_id = game_id
        this.type = type
        this.messages = messages
        this.current_Turn = current_Turn
        this.board = board
        this.state = state
    }
}