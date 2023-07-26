import MultiplayerGame from "./mutiplayer_game"
import Piece from "./piece"

export default class Tile {

    type: number
    piece: Piece

    constructor(type:number, piece:Piece) {
        this.type = type
        this.piece = piece
    }
}