export default class Drive {
    id: number
    name: string
    path: string
    is_owner: boolean

    constructor(id:number, name: string, path: string, isOwner: boolean) {
        this.id = id
        this.name = name
        this.path = path
        this.is_owner = isOwner
    }
}