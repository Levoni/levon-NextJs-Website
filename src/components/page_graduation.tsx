'use client';

import { useEffect, useState } from "react";
import diploma from "@/public/diploma.png"
import stage from "@/public/stage.jpg"
import chancellor from "@/public/chancelor.png"
import student from "@/public/student.png"
import studentAub from "@/public/studentAub.png"
import congrats from "@/public/congrats.gif"
import Toaster from "./toaster"
import ToasterData from "@/data/toaster";

export default function PageGraduation(props:any) {
    let [state, setState] =  useState('title');
    let [position, setPosition] = useState([500,500])
    let [grabs, setGrabs] = useState(0);
    let [time, setTime] = useState({startDiploma: new Date(), endDiploma: new Date(), startMath: new Date(), endMath: new Date()})
    let [questionNum, setQuestionNum] = useState(0)
    let [question, setQuestion] = useState('')
    let [answer, setAnswer] = useState('')
    let [gotMathMinor,setGotMathMinor] = useState(false)
    const [newToaster,setNewToaster] = useState<ToasterData>()

    useEffect(() => {
        const interval = setInterval(() => {}, 1000);
    
        return () => clearInterval(interval);
      }, []);



    let questions =  [
        {question: '4 + 5 = ?', answer: '9'},
        {question: '5^3 + 2 = ?', answer: '127'},
        {question: '340 * 1.4 = ?', answer: '476'},
        {question: '2^x+4=8', answer: '2'},
        {question: 'Derivative of x^4', answer: '4x^3'},
        {question: 'integral 16x ^ 7', answer: '2x^8+c'},
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
        setTimeout(() => {
            setState('Congrats')
        }, 6000);
    }

    let StartMathMinor = () => {
        setState('Math')
        let newQuestion = questions[0].question
        setQuestion(newQuestion)
        setTime({
            ...time,
            startMath: new Date()
        })
    }

    let CheckMathAnswer = (e:any) => {
        if(questions[questionNum].answer == answer) {
            let newNum = questionNum + 1
            if(newNum >= questions.length) {
                setState('Menu1')
                setTime({
                    ...time,
                    endMath: new Date()
                })
                setGotMathMinor(true)
            } else {
                setQuestionNum(newNum)
                setQuestion(questions[newNum].question)
                setAnswer('')
            }
        } else {
            setNewToaster(new ToasterData('fail','Incorrect answer',3000))
        }
    }

    let restart = (e:any) => {
        setTime(
            {
                startDiploma: new Date(),
                endDiploma: new Date(),
                startMath: new Date(),
                endMath: new Date(),
            }
        )
        setGotMathMinor(false)
        setState('title')
        setQuestionNum(0)
        setGrabs(0)
    }

    let updateInput = (e:any) => {
        setAnswer(e.target.value)
    }

    let checkEnter = (e:any, input: string) => {
        const code = e.keyCode ? e.keyCode : e.which
        if(code == 13) {
            if(input == 'math')
            CheckMathAnswer(e)
        }
    }

    return (
        <div className="column" style={{height:'100%', justifyContent:'space-around'}}>
            {state == 'title' ? 
            <div className="column" style={{alignItems:'center'}}>
                <div>Graduation Simulator</div>
                <button onClick={attempt} className="big-button">Attempt graduation</button>
            </div>:null}
            {state == 'diploma' ?
            <div className="column" style={{justifyContent:'flex-start',alignItems:'center', height:'100%'}}>
                <div>Quick! Grab the Diploma</div>
                <div id="diploma" onClick={grab} style={{backgroundImage:`url('${diploma.src}')`,backgroundSize:'contain',backgroundRepeat:'no-repeat',position:'absolute',width:'50px',height:'50px',top:`${position[0]}px`,left:`${position[1]}px`}}></div>
            </div>
            :null}
            {state == 'Menu1' ? 
            <div className="column" style={{justifyContent:'flex-start',alignItems:'center', height:'100%'}}>
                <div>Congratulations!!! You earned you&apos;re diploma</div>
                <div className="row">
                    <button onClick={SetupStage} className="big-button">Attend Graduation</button>
                    { gotMathMinor == false ? 
                    <div className="row">
                        <div style={{paddingLeft:'10px'}}>Or</div>
                        <button onClick={StartMathMinor} className="big-button">Get Math Minor</button>
                    </div>:null} 
                </div>
            </div>:null}
            {state == 'Math' ? 
            <div className="column" style={{justifyContent:'flex-start',alignItems:'center', height:'100%'}}>
                <div>Solve The Questions (lowercase letters)</div>
                <div>{question}</div>
                <div>
                    <input style={{marginRight:'5px'}} onKeyDown={(e:any) => {checkEnter(e,'math')}} value={answer} onChange={updateInput} type="text" className="big-input"/>
                    <button onClick={CheckMathAnswer} className="big-button">Submit Answer</button>
                </div>
            </div>:null}
            {state == 'Stage' ?
            <div>
                <img className="stage" src={stage.src}></img>
                <img className="chancellor" src={chancellor.src}></img>
                <img className="student" src={props.userName == 'aubster' ? studentAub.src : student.src}></img>
                <img className="diploma" src={diploma.src}></img>
                <div className="small-text" style={{position:'fixed',right:'25px', bottom:'25px',left:'25px'}}>*Note: This degree has not been accredited by any governing body. Your results may vary when using it on a resume for a legitimate job application.</div>
            </div>:null}
            {state == 'Congrats' ?
            <div className="column" style={{alignItems:'center',justifyContent:'flex-start'}}>
                <img className="congrats" style={{}} src={congrats.src}  alt="loading..."></img>
                <div style={{textAlign:'center'}}>Congratulations on graduating LPPACFES! The time it took to complete the degree with potential minor is as follows.</div>
                <div>Total Time: {((time.endDiploma.getTime() - time.startDiploma.getTime()) / 1000 + (time.endMath.getTime() - time.startMath.getTime()) / 1000).toFixed(2)}  seconds</div>
                <div>Degree Time: {((time.endDiploma.getTime() - time.startDiploma.getTime()) / 1000).toFixed(2)} seconds</div>
                <div>Minor Time: {((time.endMath.getTime() - time.startMath.getTime()) / 1000).toFixed(2)} seconds</div>
                {props.userName == 'aubster' ? <button style={{position:"fixed",left:'20px',bottom:'20px'}} className="big-button" onClick={(e) => {setState('Aubrey')}}>For Aubrey</button>:null}
                <button style={{position:"fixed",right:'20px',bottom:'20px'}} onClick={restart} className="big-button">Restart</button>
            </div>:null}
            {state == 'Aubrey' ? 
            <div className="column">
                <div>Congrats on getting through 4 years of college! You killed that GPA and being the last to go through, most likely, you&apos;ll keep the top GPA between us kids. That&apos;s not too shabby if I say so myself. Now that you&apos;ve finished one leg of the marathon, it&apos;s a perfect time to slow down and take a breather while getting ready for the next part. I&apos;m sure you know, but I&apos;m always there for you, whether that is stumbling through teaching you a new skill, lending an ear when you need to talk, or just being there to hang out and have some fun. I Love you and know you&apos;ll kill it wherever you end up being.</div>
                <div style={{marginTop:'40px', marginBottom:'20px'}}>For now, With your newly aquired degree and pristine math minor from LPPACFES, You&apos;ll be ready to wow any popential employer. To finish this off, you will partipicapte in a multi-stage platformer where you determine which LPPACFES approved job you will recieve. Good Luck!</div>
                <button className="big-button" onClick={(e) => {setState('CollageTry')}}>Onward!</button>
            </div>:null}
            {state == 'CollageTry' ? 
            <div className="column" style={{position:'relative', color:'black', backgroundColor:'white', height:'100%'}}>
                <div>Ran out of time for the 3D platforming minigame section due to project deadline and group members that felt non-existent. I gave it the good ol&apos; collage try.</div>
                <div style={{position:'absolute',right:'0px',bottom:'0px', maxWidth:'50%'}}>I&apos;m hoping for at least a C grade for the work. C&apos;s get degrees even from LPPACFES (Levon&apos;s Personal Play Area College for Exceptional Students).</div>
            </div>:null}
            <Toaster newToaster={newToaster}></Toaster>
        </div>
    )
}