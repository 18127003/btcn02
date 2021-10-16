import { type } from "os"

type SquareProp = {
    onClick: any,
    value: string|null
}

type BoardProp = {
    squares: (string|null)[],
    size: number,
    onClick: (row:number, col:number)=>void
}

type GameProp = {
    size: number
}

type HistoryListProp = {
    data: History[],
    onSelect: (move:number)=>void
}

type History = {
    squares: (string|null)[],
    position: {
      row: number,
      col: number
    }
} 
  
type GameState = {
    history: History[],
    stepNumber: number,
    xIsNext: boolean
}