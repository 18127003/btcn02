import React, { useState } from "react";
import { GameProp, GameState } from "../@type/prop";
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

    const calculateWinner = (squares:(string|null)[]) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
      
  
    const handleClick = (row: number, col:number) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let i = row * size + col;
      if (calculateWinner(squares) || squares[i]) {
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
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = "Winner: " + winner;
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