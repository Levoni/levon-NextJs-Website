import ListItem from "./list_item"

export default class List {
    id: number
    name: string
    type: string
    is_template: boolean
    user_names:Array<string>
    items:Array<ListItem>
    created_date: string

    constructor(id: number, name: string, type: string, is_template: boolean,user_names:Array<string>, items:Array<ListItem>, created_date: string ) {
        this.id = id
        this.name = name
        this.type = type
        this.is_template = is_template
        this.user_names = user_names
        this.items = items
        this.created_date = created_date
    }
}