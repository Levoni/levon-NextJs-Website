export default function DocumentationRow(props: any) {

    let createLinks = (text: string) => {
        let spilt = text.split(RegExp('<link>|</link>'))
        return (
        <div> {spilt.map((value,index) => {
            if(index % 2 != 0) {
                let valueSplit = value.split('#!')
                return <a key={index} style={{cursor:'pointer', textDecoration:'underline', color:'blue'}} onClick={() => {props.linkCallback(valueSplit[1])}}>{valueSplit[0]}</a>
            }
            return value
        })}
        </div>
        )
    }

    return (
        <div style={{ paddingLeft: '20px', paddingBottom: '40px' }}>
            <div style={{ fontSize: '1.2rem', borderBottom: '1px solid white', marginBottom: '5px' }}>{createLinks(props.header)}</div>
            <div style={{ whiteSpace: 'pre-line', fontSize: '1rem', paddingLeft: '10px' }}>{createLinks(props.body)}</div>
        </div>
    )
}