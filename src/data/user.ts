export default class User {
    name: String
    guesses: Number
    correct_guesses: Number
    points: Number
    last_daily_guess: String
    is_admin: Boolean

    constructor(userName: String, userGuesses: Number, userCorrectGuesses: Number, userPoints: Number, userLastDailyGuess: String, isAdmin:Boolean ) {
        this.name = userName
        this.guesses = userGuesses
        this.correct_guesses = userCorrectGuesses
        this.points = userPoints
        this.last_daily_guess = userLastDailyGuess
        this.is_admin = isAdmin
    }


}