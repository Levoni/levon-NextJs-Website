export default class NotificationPreferece {
    user_name: string
    daily_guess: boolean
    tot_game: boolean
    requests: boolean

    constructor(user_name:string, daily_guess: boolean, tot_game: boolean, requests: boolean) {
        this.user_name = user_name
        this.daily_guess = daily_guess
        this.tot_game = tot_game
        this.requests = requests
    }
}