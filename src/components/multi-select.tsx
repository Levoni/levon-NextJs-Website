'use client';

import { useEffect, useState } from "react";

export default function MultiSelect(props: any) {
    const [inputValue, setInputValue] = useState('')
    const [optionValues, setOptionValues] = useState(new Array<any>)

    useEffect(() => {
        if(props.options.length !=optionValues.length) {
            setOptionValues(props.options)
        }
    }, [props.options])

    function autofill():any  {
        return optionValues.filter((element:any) => {
            return element.text.toLowerCase().toString().startsWith(inputValue.toLowerCase())
        })
    }
    
    function handleInputChange (e:any) {
        setInputValue(e.target.value)
    }

    function handleCheckboxChange (e:any, text:String) {
        let nextOptionValues = optionValues.map((element, index) => {
            if(element.text == text) {
                return {
                    ...element,
                    selected: !element.selected
                }
            } else {
                return element
            }
        })
        setOptionValues(nextOptionValues)
        props.handleMultiSelectChange(nextOptionValues)
        setInputValue('')
    }

    function handleXClick (e:any) {
        setInputValue('')
        let nextOptionValues = optionValues.map((element) => {
            return {...element, selected:false}
        })
        setOptionValues(nextOptionValues)
        props.handleMultiSelectChange(nextOptionValues)
    }

    return(
        <div className="multiselect">
            <div className="row multiselect-input">
                <div className="row">
                    {optionValues.reduce((agg,cur)=>{if(cur.selected) {return agg + 1} else return agg},0) + ' Selected'}
                </div>
                <input value={inputValue} onChange={handleInputChange} type="text" />
                <div style={{cursor:'pointer'}} onClick={handleXClick}>X</div>
            </div>
            <div className="multiselect-popup">
                {props.options && autofill().map((element:any) => {
                    return(                    
                    <div onClick={(event) => {handleCheckboxChange(event,element.text)}} key={element.text} className="row">
                        <input className="big-checkbox" onChange={(event) => {handleCheckboxChange(event,element.text)}} checked={element.selected} type="checkbox"/>
                        <div>{element.text}</div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}