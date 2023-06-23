import Collapse from "./collapse"

export default function gameResults(props) {

    return(
        <div style={{paddingTop:'25px'}}>
            <div className="row">
                <div>Results:</div>
                <button onClick={props.randomGameCallback} className="medium-button">Pick Random Game</button>
                <div></div>
            </div>
            {props.games ? props.games.map((element,index) => {
                return ( 
                    <div key={element.name} style={{paddingTop:'10px'}}>
                        <Collapse maxHeight={'150px'} title={element.name}>
                            <div>users: {element.user_name}</div>
                            <div>players: {element.player_min} - {element.player_max}</div>
                            <div>platform: {element.platform}</div>
                            <div>genre: {element.genre}</div>
                            <div>installed: {element.installed ? 'Yes' : 'No'}</div>
                        </Collapse>
                    </div>
                )
            }) : <div style={{paddingTop:'10px'}}>No results</div>}
        </div>
    )
}
