interface Move {
    squares: (string|null)[],
    position: {
      row: number,
      col: number
    },
    stepNumber: number
} 

interface Result {
  result: string,
  line: number[]
}

interface HistoryStep {
  move: Move,
  result: Result|undefined
}