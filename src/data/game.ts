export default class Game {
    name: String
    platform: String
    player_min: Number
    player_max: Number
    genre: String

    constructor(userName: String, platform: String, playerMin: Number, playerMax: Number, gameGenre: String ) {
        this.name = userName
        this.platform = platform
        this.player_min = playerMax
        this.player_max = playerMin
        this.genre = gameGenre
    }
}