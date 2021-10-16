import React, { useState } from "react";
import { HistoryListProp } from "../@type/prop";

const HistoryList: React.FC<HistoryListProp> = ({data, onSelect})=>{
    const [current, setCurrent] = useState<number>(data.length-1)
    const  moves = data.map((step, move) => {
        
        const desc = move ?
            `Go to move #${move} (${step.position?.col}, ${step.position?.row})` :
            'Go to game start';
        return (
            <li key={move}>
            <button 
                onClick={()=>{
                    onSelect(move)
                    setCurrent(move)
                }}
                style = {move===current?{fontWeight: "bold"}:{}}
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