import React, { useState } from "react";

const HistoryList: React.FC<HistoryListProp> = ({data, onSelect})=>{
    const [current, setCurrent] = useState<number>(data.length-1)
    const  moves = data.map((step) => {
        const stepNumber = step.stepNumber
        const desc = stepNumber?
            `Go to move #${stepNumber} (${step.position?.col}, ${step.position?.row})` :
            'Go to game start';
        return (
            <li key={stepNumber}>
            <button 
                onClick={()=>{
                    onSelect(stepNumber)
                    setCurrent(stepNumber)
                }}
                style = {stepNumber===current?{fontWeight: "bold"}:{}}
            >
                    {desc}
            </button>
            </li>
        );
    });

    return (
        <ol>
            {moves}
        </ol>
    )
}

export default HistoryList;