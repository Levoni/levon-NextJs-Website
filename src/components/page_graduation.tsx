'use client';

import { useState } from "react";
import diploma from "@/public/Blue Base.png"

export default function PageGraduation(props:any) {
    let [state, setState] =  useState('title');
    let [position, setPosition] = useState([500,500])
    let [grabs, setGrabs] = useState(0);
    let [time, setTime] = useState({startDiploma: new Date(), endDiploma: new Date(), startMath: new Date(), endMath: new Date()})
    let [questionNum, setQuestionNum] = useState(0)
    let [question, setQuestion] = useState('')
    let [answer, setAnswer] = useState('')

    let questions =  [
        {question: '4 + 5 = ?', answer: '9'},
        {question: '5^3 + 2 = ?', answer: '127'},
        {question: '340 * 1.4 = ?', answer: '476'},
        {question: '2^x+4=8', answer: '2'},
        {question: 'Derivative of x^4', answer: '4x^3'},
        {question: 'ntegral 16x ^ 7', answer: '2x^8+c'},
    ]

    let attempt = (e:any) => {
        setState('diploma')
        console.log(window.innerHeight)
        console.log(window.innerWidth)
        setPosition([
            (Math.random() * window.innerHeight - 200) + 100,
            (Math.random() * window.innerWidth - 200) + 100
        ])
    }

    let grab = (e:any) => {
        if(grabs == 0) {
            let newDiploma = new Date();
            setTime({
                ...time,
                startDiploma: newDiploma
            })
        }

        if(grabs == 10) {
            let endDiploma = new Date();
            setTime({
                ...time,
                endDiploma: endDiploma
            })
            console.log((endDiploma.getTime() - time.startDiploma.getTime()) / 1000)
            setState('Menu1')
        } else {
            setPosition([
                (Math.random() * (window.innerHeight - 200)) + 100,
                (Math.random() * (window.innerWidth - 200)) + 100
            ])
            setGrabs(grabs + 1)
        }
    }

    let SetupStage = () => {
        setState('Stage')
    }

    let StartMathMinor = () => {
        setState('Math')
        let newQuestion = questions[0].question
        setQuestion(newQuestion)
    }

    let CheckMathAnswer = (e:any) => {
        if(questions[questionNum].answer == answer) {
            let newNum = questionNum + 1
            setQuestionNum(newNum)
            setQuestion(questions[newNum].question)
        } else {
            //TODO: pop up incorrect toast
        }
    }

    let updateInput = (e:any) => {
        setAnswer(e.target.value)
    }

    return (
        <div className="body-padding" style={{paddingTop:'0px', display:'flex', flex:'1', gap:'25px', justifyContent:'space-around', flexFlow:'wrap'}}>
            {state == 'title' ? 
            <div className="column">
                <div>Graduation Simulator</div>
                <button onClick={attempt} className="big-button">Attempt graduation</button>
            </div>:null}
            {state == 'diploma' ?
            <div>
                <div>Quick! Grab the Diploma</div>
                <div id="diploma" onClick={grab} style={{backgroundImage:`url('${diploma.src}')`,backgroundSize:'contain',backgroundRepeat:'no-repeat',position:'absolute',width:'50px',height:'50px',top:`${position[0]}px`,left:`${position[1]}px`}}></div>
            </div>
            :null}
            {state == 'Menu1' ? 
            <div className="column">
                <div>Congradulations!!! You earned you're deploma</div>
                <button onClick={SetupStage} className="big-button">Attend Graduation</button>
                <div>Or</div>
                <button onClick={StartMathMinor} className="big-button">Get Math Minor</button>
            </div>:null}
            {state == 'Math' ? 
            <div className="column">
                <div>Solve</div>
                <div>{question}</div>
                <input value={answer} onChange={updateInput} type="text" className="input-big"/>
                <button onClick={CheckMathAnswer} className="big-button">Submit Answer</button>
            </div>:null}
        </div>
    )
}