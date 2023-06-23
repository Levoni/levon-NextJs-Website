export default class GameLink {
    user_name: String
    game_name: String
    installed: boolean

    constructor(userName: String, gameName: String, gameInstalled: boolean) {
        this.user_name = userName
        this.game_name = gameName
        this.installed = gameInstalled
    }
}