export default class RequestMessage {
    id: number
    request_id: number
    message: string
    user_name: string
    created_date: Date
    to_view: number

    constructor(id:number, request_id: number, message: string, user_name: string, created_date: Date, to_view: number ) {
        this.id = id
        this.request_id = request_id
        this.message = message
        this.user_name = user_name
        this.created_date = created_date
        this.to_view = to_view
    }
}