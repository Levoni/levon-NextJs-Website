export default class PostResponse {
    success: boolean
    responseMessage: string
    responseObject: any

    constructor(success:boolean, responseMessage: string, responseObject: any) {
        this.success = success
        this.responseMessage = responseMessage
        this.responseObject = responseObject
    }
}