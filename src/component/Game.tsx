import React, { useState } from "react";
import { DRAW } from "../constant";
import { calculateWinner } from "../util";
import Board from "./Board";
import HistoryList from "./HistoryList";

  
type GameState = {
  stepNumber: number,
  xIsNext: boolean
}

const Game : React.FC<GameProp> = ({size, winCriteria}) => {
    const [histories, setHistories] = useState<HistoryStep[]>([
      {
        move: {
          squares: Array<string|null>(size*size).fill(null),
          position: {
            row: -1,
            col: -1
          },
          stepNumber: 0
        },
        result: undefined
      }
    ]);

    const [currentStep, setCurrentStep] = useState<GameState>({
      stepNumber: 0,
      xIsNext: true
    });
  
    const handleClick = (row: number, col:number) => {
      const modifiedHistories = histories.slice(0, currentStep.stepNumber+1);
      const current = modifiedHistories.slice(-1)[0];
      const squares = current.move.squares.slice();
      let i = row * size + col;
      if (current.result || squares[i]) {
        return;
      }
      let currentPlayer = currentStep.xIsNext ? "X" : "O";
      squares[i] = currentPlayer;

      let checkWinner = calculateWinner(squares, row, col, size, winCriteria)
      let result: Result|undefined = undefined;

      if (typeof checkWinner === "string"){
        result = {
          result: DRAW,
          line: []
        }
      } else if (checkWinner.length > 0){
        result = {
          result: currentPlayer,
          line: checkWinner
        }
      }

      setHistories(
        [
            ...modifiedHistories,
            {
              move: {
                squares: squares,
                position: {
                  row: row,
                  col: col
                },
                stepNumber: modifiedHistories.length++
              },
              result: result
            } 
        ]
      );
      setCurrentStep({
        stepNumber: modifiedHistories.length-1,
        xIsNext: !currentStep.xIsNext
      });
    }
  
    const jumpTo = (step: number) => {
      setCurrentStep({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
 
    let current = histories.find(history=>history.move.stepNumber===currentStep.stepNumber);
    if(current===undefined){
      current = histories.slice(-1)[0]
    }
    let status: string;
    let winner : number[] = [];
    const result = current.result;
    if(result === undefined){
      status = "Next player: " + (currentStep.xIsNext ? "X" : "O");
    }
    else if (result.result === DRAW){
      status = "Draw"
    }
    else {
      status = "Winner: " + result.result;
      winner = result.line;
    }

    return (
      <div className="game">
          <div className="game-board">
          <Board
              squares={current.move.squares}
              size = {size}
              onClick={(row:number, col:number) => handleClick(row, col)}
              winner = {winner}
          />
          </div>
          <div className="game-info">
          <div>{status}</div> 
          <HistoryList data={histories} onSelect={jumpTo}/>
          </div>
      </div>
    );
  
}

export default Game;