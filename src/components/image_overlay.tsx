import fileImg from '../public/file icon.png'

export default function ImageOverlay(props:any) {    
        let download = (e:any) => {
            e.stopPropagation()
            let buffer =  Buffer.from(props.file.buffer)
            var blob = new Blob([buffer])
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = props.file.name
            link.click()
        }

        let getView = () => {
            let loweredFileName = props.file.name.toLowerCase()
            if(loweredFileName.includes('.png') || loweredFileName.includes('.jpeg')
            || loweredFileName.includes('.jpg')) {
                return `data:image/png;base64,${Buffer.from(props.file.buffer as Buffer).toString('base64')}`
            } else {
                return fileImg.src
            }
        }

        return (
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.5)', position:'fixed',left:0,right:0,top:0,bottom:0}}>
                <button onClick={download} className="big-button" style={{position:'fixed',right:10,top:10}}>Download</button>
                {props.file.name.toLowerCase().includes('.pdf') ?  
                <div style={{
                    display:'flex',
                    flex:'1',
                    alignItems:'center',
                    justifyContent:'center',
                    height: '100%',
                    width:'100%'
                }}>
                    <iframe style={{width:'80%', height:'80%'}} src={`data:application/pdf;base64,${Buffer.from(props.file.buffer as Buffer).toString('base64')}`}></iframe>
                </div> : 
                <div style={{ padding:'0px',margin:'0px',
                    position:'fixed',
                    left:'50%',
                    top:'50%',
                    transform:'translate(-50%, -50%)'}}>
                    <img style={{maxWidth:'800px',maxHeight:'500px'}} src={getView()}></img>
                </div>}
            </div>
        )
}