export default class DailySite {
    name: String
    reset_time: Number
    link: String

    constructor(name: String, resetTime: Number, link: String) {
        this.name = name
        this.reset_time = resetTime
        this.link = link
    }
}