export default class ToasterData {
    time: number
    type: string
    message: string

    constructor(type:string, message: string) {
        this.time = new Date().getTime()
        this.type = type
        this.message = message
    }
}