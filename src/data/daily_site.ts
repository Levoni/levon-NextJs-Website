export default class DailySite {
    name: String
    reset_time: Number
    link: String
    attempt_count: number
    is_multiple: boolean

    constructor(name: String, resetTime: Number, link: String,attemptCount:number,isMultiple:boolean) {
        this.name = name
        this.reset_time = resetTime
        this.link = link
        this.attempt_count = attemptCount
        this.is_multiple = isMultiple
    }
}