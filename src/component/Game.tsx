import React, { useState } from "react";
import { GameProp, GameState } from "../@type/prop";
import { DRAW } from "../constant";
import Board from "./Board";
import HistoryList from "./HistoryList";



const Game : React.FC<GameProp> = ({size}) => {
    const [state, setState] = useState<GameState>({
        history: [
          {
            squares: Array(size*size).fill(null),
            position: {
              row: -1,
              col: -1
            }
          }
        ],
        stepNumber: 0,
        xIsNext: true
    });


    const calculateWinner = (squares:(string|null)[], row?: number|undefined, col?:number|undefined) => {
      // check row
      let checkRows = Array<number[]>(size).fill(Array<number>(size).fill(0).map((v, i)=>v=i)).map((v, i)=>v.map(n=>n+=size*i))
      let checkCols = Array<number[]>(size).fill(Array<number>(size).fill(0).map((v, i)=>v=i*size)).map((v, i)=>v.map(n=>n+=i))

      // check diag
      let leftDiag = Array<number>(size).fill(0)
      for (let index = 1; index < leftDiag.length; index++) {
        leftDiag[index] = leftDiag[index-1] + size + 1
      }
      let rightDiag = Array<number>(size).fill(size - 1)
      for (let index = 1; index < leftDiag.length; index++) {
        rightDiag[index] = rightDiag[index-1] + size - 1 
      }

      let answers = [
        ...checkRows,
        ...checkCols,
        leftDiag,
        rightDiag
      ]

      if(row!==undefined && col!==undefined){
        let position = row * size + col;
        answers = answers.filter(answer=>answer.includes(position));
      }

      let winner:string|null = "";

      let isNotFound = answers.every(answer=>{
        let checkSet = answer.map(i=>squares[i])
        if (checkSet.every((val, i, arr)=>val===arr[0]&&val)){
          winner = checkSet[0]
          return false
        }
        return true
      });

      if(!isNotFound){
        return winner
      }

      // check draw
      if(answers.every(answer=>answer.map(i=>squares[i]).every(square=>square))){
        return DRAW;
      }
      return null;
    }
      
  
    const handleClick = (row: number, col:number) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let i = row * size + col;
      if (calculateWinner(squares, row, col) || squares[i]) {
        return;
      }
      squares[i] = state.xIsNext ? "X" : "O";
      setState({
        history: [
            ...history,
            {
                squares: squares,
                position: {
                  row: row,
                  col: col
                }
            }
        ],
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      });
    }
  
    const jumpTo = (step: number) => {
      setState({
        history: state.history,
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
 
    const current = state.history[state.stepNumber];

    let status;
    const result = calculateWinner(current.squares);
    if (result === DRAW){
      status = "Draw"
    }
    else if (result) {
      status = "Winner: " + result;
    } else {
      status = "Next player: " + (state.xIsNext ? "X" : "O");
    }

    return (
    <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            size = {size}
            onClick={(row:number, col:number) => handleClick(row, col)}
        />
        </div>
        <div className="game-info">
        <div>{status}</div>
        <HistoryList data={state.history} onSelect={jumpTo}/>
        </div>
    </div>
    );
}

export default Game;