import Square from "./Square";
import React from "react";

const Board: React.FC<BoardProp> = (props) => {
    const renderSquare = (row: number, col:number, size:number) =>  {
      return (
        <Square
          value = {props.squares[row*size+col]}
          onClick={() => props.onClick(row, col)}
          isHighlight = {props.winner.includes(row*size+col)}
        />
      );
    }

    const generateRow = (row: number, size: number) => {
      let rowData = Array(size).fill(null)
      for (let col = 0; col < size; ++col) {
          rowData[col] = renderSquare(row, col, size)
      }
      return rowData;
    }

    const generateBoard = (size: number) => {
      let boardData = Array(size).fill(null)
      for (let row = 0; row < size; ++row) {
        boardData[row] = (
          <div className="board-row" key={row}>
            {generateRow(row, size)}
          </div>
        )
      }
      return boardData;
    }
  
    return (
        <div>
          {generateBoard(props.size)}
        </div>
    );
}

export default Board;
  