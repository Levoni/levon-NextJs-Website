'use client';

import { useEffect, useState } from "react";
import { GetCurrentNumberPuzzle, SendCurrentNumberPuzzleGuess } from "./service_fetch";
import { NumGenerator, GenerationResult, Rule } from "../helper/generator"
import ToasterData from "@/data/toaster";
import Toaster from "./toaster";

export default function PageNumberPuzzle(props: any) {
    const [questionState, setQuestionState] = useState('start')
    const [puzzle, setPuzzle] = useState<GenerationResult | null>(null)
    const [guess, setGuess] = useState<Array<string>>(['', '', '', '', ''])
    const [guessResults, setGuessResults] = useState<any>()
    const [newToaster, SetNewToaster] = useState<ToasterData>()
    const numGenerator = new NumGenerator()

    let getPuzzle = async () => {
        try {
            let p = await GetCurrentNumberPuzzle(props.token)
            console.log(p.generatedNum)

            let generatedNum: GenerationResult = numGenerator.convertObjectToNumber(p.generatedNum)
            let rules = p.generatedNum.rules.map((x: any) => {
                return numGenerator.convertObjectToRule(x)
            })
            generatedNum.rules = rules
            console.log(generatedNum)
            setPuzzle(generatedNum)
            if (p.answered) {
                setQuestionState('prevAnswered')
            } else {
                setQuestionState('active')
            }
        } catch {
            setQuestionState("noPuzzle")
        }
    }

    let verifyPuzzle = async () => {
        //verify all guess numbers are actually numbers
        console.log('verifying')
        let result = await SendCurrentNumberPuzzleGuess(props.token, guess.map<number>(x => parseInt(x)))
        if (result.success && result.responseObject.valid) {
            setGuessResults(result.responseObject)
            setQuestionState('answered')
            console.log(result.responseObject)
        } else {
            //toaster about failed submit
            SetNewToaster(new ToasterData('fail', 'Incorrect Number', 5000))
            console.log(result)
        }
    }

    let updateGuess = (e: any) => {
        let newGuess = [...guess]
        newGuess[e.target.name] = e.target.value
        setGuess(newGuess)

    }

    let getPuzzleSection = () => {
        if (questionState == 'start') {
            return (
                <div>
                    <button onClick={getPuzzle}>Get Puzzle</button>
                </div>)
        } else if (questionState == 'active') {
            return (<>
                <div className="row">
                    <input name="0" value={guess[0]} onChange={updateGuess} type="number" className="short-input" />
                    <input name="1" value={guess[1]} onChange={updateGuess} type="number" className="short-input" />
                    <input name="2" value={guess[2]} onChange={updateGuess} type="number" className="short-input" />
                    <input name="3" value={guess[3]} onChange={updateGuess} type="number" className="short-input" />
                    <input name="4" value={guess[4]} onChange={updateGuess} type="number" className="short-input" />
                </div>
                <button onClick={verifyPuzzle} className="small-button">Guess</button>
            </>)
        } else if (questionState == 'answered') {
            return (
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                    <div>Congratulations on finding a correct answer!</div>
                    <div>Guess: {guess.toString()}, Points: {guessResults.points}</div>
                    <div>Best Answer: {puzzle?.nums}</div>
                </div>)
        } else if (questionState == 'prevAnswered') {
            return (
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                    <div>You have already answered the puzzle correctly today.</div>
                    <div>Best Answer: {puzzle?.nums.toString()}</div>
                </div>)
        } else if (questionState == 'noPuzzle') {
            return (
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                    <div>Error getting puzzle for today. May not be generated yet.</div>
                </div>)
        }
    }

    return (
        <div style={{ marginTop: '25px', gap: '25px', flexFlow: 'wrap' }} className="row">
            <div style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }} className="column">
                {getPuzzleSection()}
            </div>
            <div style={{ flex: '1' }} className="column">
                {!puzzle ? null : puzzle.rules.map((x: any, y: number) => {
                    return <div key={`rule${y}`}>Rule {y + 1}:{x.GetRuleString()}</div>
                })}
            </div>
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}