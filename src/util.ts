import { DRAW } from "./constant";

export const hasConsecutive = (arr: number[], cons: number, pad: number, from?: number) => {
    if (cons > arr.length){
        return undefined;
    }
    let result: number[] = [];
    let prevElement: number|undefined = undefined;
    let count:number = 1;
    const startIndex = from??0;
    for (let i = startIndex; i < arr.length; i++) {
        if(prevElement === arr[i]-pad){
            count++;
            result.push(arr[i])
            if (count === cons) {
                return result;
            };
        } else {
            count = 1;
            result = [arr[i]]
        }
        prevElement = arr[i];
    };
    return undefined;
}

export const calculateWinner = (squares:(string|null)[], row: number, col:number, size: number, winCriteria: number) => {
    let winner:number[]|undefined;
    const currentPlayer = squares[row * size +col]

    // check row
    let checkRow = Array<number>(size).fill(0).map((v, i)=>v = row * size + i)
      .filter(n=>squares[n]===currentPlayer)
    // console.log(checkRow)

    winner = hasConsecutive(checkRow, winCriteria, 1)
    if(winner) {
      return winner;
    }

    // check col 
    let checkCol = Array<number>(size).fill(0).map((v, i)=>v = col + i * size)
      .filter(n=>squares[n]===currentPlayer)
    // console.log(checkCol)

    winner = hasConsecutive(checkCol, winCriteria, size)
    if(winner) {
      return winner;
    }

    // check diag
    let checkLeftDiag = Array<number>(size-Math.abs(row-col)).fill(0)
    if (col < row){
      checkLeftDiag = checkLeftDiag.map((v,i) => v = (i + row - col) * size + i)
    } else{
      checkLeftDiag = checkLeftDiag.map((v,i) => v = i * size + i + col - row)
    }
    checkLeftDiag = checkLeftDiag.filter(n=>squares[n]===currentPlayer)
    // console.log(checkLeftDiag)

    winner = hasConsecutive(checkLeftDiag, winCriteria, size + 1)
    if(winner) {
      return winner;
    }

    let checkRightDiag = Array<number>(size - Math.abs(col+row+1-size)).fill(0)
    if(col + row < size - 1){
      checkRightDiag = checkRightDiag.map((v,i)=> v = i * size + col - i + row)
    } else {
      checkRightDiag = checkRightDiag.map((v,i)=> v = (i + col + row - size + 2) * size - i - 1)
    }
    checkRightDiag = checkRightDiag.filter(n=>squares[n]===currentPlayer)
    console.log(checkRightDiag)

    winner = hasConsecutive(checkRightDiag, winCriteria, size - 1)
    if(winner) {
      return winner;
    }

    // check draw
    if(squares.every(square=>square)){
      return DRAW;
    }
    return [];
}