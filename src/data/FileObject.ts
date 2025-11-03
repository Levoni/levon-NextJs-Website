import FileObjectMetaData from "./FileObjectMetaData"

export default class FileObject {
    name: string
    id: number
    preview: null|Buffer
    buffer: null|Buffer
    metaData: FileObjectMetaData

    constructor(name: string, id: number, preview: null|Buffer, buffer: null|Buffer, metaData:  FileObjectMetaData) {
        this.name = name
        this.id = id
        this.preview = preview
        this.buffer = buffer
        this.metaData = metaData ? metaData : new FileObjectMetaData({type:10,parentRecordId:0,created_by:'',created_on:new Date(),file_size:0})
    }
}