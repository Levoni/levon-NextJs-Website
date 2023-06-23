export default class GameSearch {
    users: String
    games: String
    playerCount: Number
    genre: String
    installed: Boolean

    constructor(users: String, games: String, playerCount: Number, genre: String, installed: Boolean) {
        this.users = users
        this.games = games
        this.playerCount = playerCount
        this.genre = genre
        this.installed = installed
    }


}