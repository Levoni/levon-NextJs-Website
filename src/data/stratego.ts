export default class StrategoGame {

    game_id: string
    type: string
    messages: Array<string>
    current_Turn: number
    graveyard:Array<any>
    board:Array<Array<any>>
    state:string
    lastMove:string



    constructor(game_id:string, type: string, messages: Array<string>, current_Turn: number, board:any, graveyard:Array<any>, state:string, lastMove:string) {
        this.game_id = game_id
        this.type = type
        this.messages = messages
        this.current_Turn = current_Turn
        this.board = board
        this.graveyard = graveyard
        this.state = state
        this.lastMove = lastMove
    }
}