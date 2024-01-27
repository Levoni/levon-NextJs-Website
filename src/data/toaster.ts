export default class ToasterData {
    time: number
    type: string
    message: string
    duration: number

    constructor(type:string, message: string, duration: number) {
        this.time = new Date().getTime()
        this.type = type
        this.message = message
        this.duration = duration ? duration : 5000
    }
}