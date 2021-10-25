import React, { useState } from "react";
import Game from "../Game";

type GameInfo = {
    size: number,
    winCriteria: number
}

const GameManager:React.FC = ()=>{
    const [startGame, setStartGame] = useState(false)
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        size: 3,
        winCriteria: 3
    })
    const onSubmit=(event: React.SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            size: { value: number };
            winCriteria: { value: number };
        };
        const info = {
            size: +target.size.value,
            winCriteria: +target.winCriteria.value
        }
        setGameInfo(info)
        setStartGame(true)
    }

    return (
        <>
            <form className={`${startGame?"invisible":""}`} onSubmit={onSubmit}>
                <label>
                Board size:
                    <input
                        name="size"
                        type="number"
                        // value={gameInfo.size}
                    />
                </label>
                <br />
                <label>
                Number of win consequence:
                    <input
                        name="winCriteria"
                        type="number"
                        // value = {gameInfo.winCriteria}
                    />
                </label>
                <br />
                <div>
                    <input type="submit" value="Start" />
                </div>
            </form>
            <div className={`${startGame?"":"invisible"}`}>
                <button onClick={()=>{setStartGame(false)}}>
                    Go back    
                </button>
                <br />
                <Game size={gameInfo.size} winCriteria={gameInfo.winCriteria}/>
            </div>
        </>
    );
}

export default GameManager;