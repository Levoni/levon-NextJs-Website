export default class UserSiteLink {
    user_name: String
    daily_site_name: String
    site_day_date: string
    guess_count: Number
    correct: boolean

    constructor(userName:String, dailySiteName: String, siteDayDate: string, guessCount: Number, correct: boolean ) {
        this.user_name = userName
        this.daily_site_name = dailySiteName
        this.site_day_date = siteDayDate
        this.guess_count = guessCount
        this.correct = correct
    }
}