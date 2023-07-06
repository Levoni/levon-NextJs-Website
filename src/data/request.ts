export default class Request {
    id: number
    type: string
    message: string
    user_name: string
    created_date: Date
    closed: boolean

    constructor(id:number, type: string, message: string, user_name: string, created_date: Date, closed:boolean ) {
        this.id = id
        this.type = type
        this.message = message
        this.user_name = user_name
        this.created_date = created_date
        this.closed = closed
    }
}