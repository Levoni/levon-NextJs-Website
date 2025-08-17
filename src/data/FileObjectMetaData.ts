export default class FileObjectMetaData {
    type: number|null
    owner: string|null
    parentRecordId: number|null
    createdOn: Date|null
    fileSize: number|null

    constructor(metaData:any) {
        this.type = metaData.type
        this.owner = metaData.created_by ? metaData.created_by : '',
        this.parentRecordId = metaData.parentRecordId
        this.createdOn = metaData.created_on,
        this.fileSize = metaData.file_size
    }
}