export default class FileObject {
    name: string
    preview: null|Buffer
    buffer: null|Buffer

    constructor(name: string, preview: null|Buffer, buffer: null|Buffer) {
        this.name = name
        this.preview = preview
        this.buffer = buffer
    }
}