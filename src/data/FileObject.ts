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
        this.metaData = new FileObjectMetaData(metaData)
    }
}