import React, { useState } from "react";

const HistoryList: React.FC<HistoryListProp> = ({data, onSelect, selected})=>{

    const [isReverse, setReverse] = useState(false)

    const reverseMove = () => {
        setReverse(
          !isReverse
        )
    }

    let moves = data.map((step) => {
        const stepNumber = step.move.stepNumber
        const position = step.move.position
        const desc = stepNumber?
            `Go to move #${stepNumber} (${position?.col}, ${position?.row})` :
            'Go to game start';
        return (
            <li key={stepNumber}>
            <button 
                onClick={()=>{
                    onSelect(stepNumber)
                }}
                style = {stepNumber===selected?{fontWeight: "bold"}:{}}
            >
                    {desc}
            </button>
            </li>
        );
    });
    if(isReverse){
        moves = moves.reverse()
    }
    return (
        <>
            <button onClick={reverseMove}>
                {`Change to ${isReverse?"ascending":"descending"} order`}
            </button>
            <ol>
                {moves}
            </ol>
        </>
    )
}

export default HistoryList;