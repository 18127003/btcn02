import React, { useState } from "react";
import { Move } from "../@type/model";
import { DRAW } from "../constant";
import Board from "./Board";
import HistoryList from "./HistoryList";

  
type GameState = {
  stepNumber: number,
  xIsNext: boolean
}

const Game : React.FC<GameProp> = ({size}) => {
    const [histories, setHistories] = useState<Move[]>([
      {
        squares: Array<string|null>(size*size).fill(null),
        position: {
          row: -1,
          col: -1
        },
        stepNumber: 0
      },
    ]);

    const [currentStep, setCurrentStep] = useState<GameState>({
      stepNumber: 0,
      xIsNext: true
    });

    const calculateWinner = (squares:(string|null)[], row?: number|undefined, col?:number|undefined) => {
      // check row
      let checkRows = Array<number[]>(size).fill(Array<number>(size).fill(0).map((v, i)=>v=i)).map((v, i)=>v.map(n=>n+=size*i))

      // check col 
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

      let winner:number[] = [];

      let isNotFound = answers.every(answer=>{
        let checkSet = answer.map(i=>squares[i])
        if (checkSet.every((val, i, arr)=>val===arr[0]&&val)){
          winner = answer;
          return false;
        }
        return true;
      });

      if(!isNotFound){
        return winner
      }

      // check draw
      if(answers.every(answer=>answer.map(i=>squares[i]).every(square=>square))){
        return DRAW;
      }
      return [];
    }
      
  
    const handleClick = (row: number, col:number) => {
      const current = histories.slice(-1)[0];
      const squares = current.squares.slice();
      let i = row * size + col;
      if (calculateWinner(squares, row, col).length > 0 || squares[i]) {
        return;
      }
      squares[i] = currentStep.xIsNext ? "X" : "O";
      
      setHistories(
        [
            ...histories,
            {
                squares: squares,
                position: {
                  row: row,
                  col: col
                },
                stepNumber: histories.length++
            }
        ]
      );
      setCurrentStep({
        stepNumber: histories.length-1,
        xIsNext: !currentStep.xIsNext
      });
    }
  
    const jumpTo = (step: number) => {
      setCurrentStep({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    const reverseMove = () => {
      setHistories(
        [...histories.reverse(),]
      )
    }
 
    let current = histories.find(history=>history.stepNumber===currentStep.stepNumber);
    if(current===undefined){
      current = histories.slice(-1)[0]
    }
    let status: string;
    let winner : number[] = [];
    const result = calculateWinner(current.squares);
    if (result === DRAW){
      status = "Draw"
    }
    else if (result.length > 0) {
      status = "Winner: " + result[0];
      winner = result;
    } else {
      status = "Next player: " + (currentStep.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
          <div className="game-board">
          <Board
              squares={current.squares}
              size = {size}
              onClick={(row:number, col:number) => handleClick(row, col)}
              winner = {winner}
          />
          </div>
          <div className="game-info">
          <div>{status}</div> 
          <button onClick={()=>reverseMove()}>
            Change order
          </button>
          <HistoryList data={histories} onSelect={jumpTo}/>
          </div>
      </div>
      
    );
  
}

export default Game;