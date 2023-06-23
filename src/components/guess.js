'use client';

import { useEffect, useState } from "react";
import Collapse from "./collapse"

export default function Guesser(props) {
    var [pastGuesses, setPastGuesses] = useState([])
    var [guess, setGuess] = useState('')
    const [state, setState] = useState(0)
    var [minigameObject, setMinigameObject] = useState({number:Math.floor(Math.random() * 100), min:0, max:100})

    useEffect(() => {
        if(props.previousGuess) {
            setPastGuesses(props.previousGuess)
        } else {
            setPastGuesses([])
        }
        
    },[props.previousGuess])

    function handleGuessInput(e) {
        setGuess(e.target.value)
        return e.target.value
    }

    function handleGuessKeyPress(e) {
        const code = e.keyCode ? e.keyCode : e.which
        if(code == 13) {
            props.type == 'Minigame' ? handleMinigameSubmitClick() : handleDailySubmitClick()
        }
    }

    const handleDailySubmitClick = async event => {
        if(guess) {
            const data = await fetch(process.env.API_URL + `/guess/${guess}`,{
                method: 'POST',
                mode:'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                }
            })
            const content = await data.json()
            setPastGuesses([
                ...pastGuesses,
                {guess:guess, result: content.Message}
            ])
        }
    }

    const handleMinigameSubmitClick = async event => {
        if(guess == minigameObject.number) {
            setState(1)
            setPastGuesses([
                ...pastGuesses,
                {guess:guess, result: 'Congradulations! You guessed Corectly'}
            ])
        } else if (guess < minigameObject.number) {
            setPastGuesses([
                ...pastGuesses,
                {guess:guess, result: 'Too Low'}
            ])
        } else [
            setPastGuesses([
                ...pastGuesses,
                {guess:guess, result: 'Too High'}
            ])
        ]
    }

    const handleMinInput = event => {
        let num = event.target.value ? parseInt(event.target.value) : 0
        setMinigameObject({
            ...minigameObject,
            min: num
        })
    }

    const handleMaxInput = event => {
        let num = event.target.value ? parseInt(event.target.value) : 0
        setMinigameObject({
            ...minigameObject,
            max: num
        })
    }

    const regen = async event => {
        props.regenClick(minigameObject)
        setMinigameObject({
            ...minigameObject,
            number: Math.floor(Math.random() * (minigameObject.max - minigameObject.min)) + minigameObject.min
        })
        setState(0)
        setGuess('0')
        setPastGuesses([])
    } 

    return(
        <div style={{fontSize:'2rem'}}>
            {props.type == 'Minigame' ? 
            <div style={{display:'flex', alignItems:'center', paddingBottom:'10px'}}>
                <div style={{paddingRight:'10px'}}>Guess</div>
                <button onClick={regen} className="small-button">Regenerate</button>
                <div style={{flex:'1'}} className="body-text">
                    <Collapse maxHeight='6rem' title="Generation Options">
                        <div>min</div>
                        <input type="number" value={minigameObject.min} onChange={handleMinInput} />
                        <div>max</div>
                        <input type="number" value={minigameObject.max} onChange={handleMaxInput}/>
                    </Collapse>
                </div>
            </div> : <div style={{paddingBottom:'10px'}}>Guess</div>} 
            <div style={{display:'flex', alignItems:'center'}}>
                <input className="big-input" style={{marginRight:'10px'}} value={guess} onKeyDown={handleGuessKeyPress} onChange={handleGuessInput} id="guess" name="guess" type="number"/>
                {props.type == 'Minigame' ? <button disabled={state == 1 || guess == ''} className="big-button" onClick={handleMinigameSubmitClick}>Send Guess</button>
                : <button disabled={guess == ''} className="big-button" onClick={handleDailySubmitClick}>Send Guess</button>
                }
            </div>
            <div style={{marginTop:'10px', minHeight:'200px',maxHeight:'500px', border:'1px solid #2d3436', overflowY:'scroll'}}>
                {pastGuesses && pastGuesses.slice(0).reverse().map((item, index) => {
                    return <div style={{fontSize:'1rem'}} key={index}>{item.guess} {item.result}</div>
                })}
            </div>
        </div>
    )
}