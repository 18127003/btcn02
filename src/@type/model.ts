export interface Move {
    squares: (string|null)[],
    position: {
      row: number,
      col: number
    },
    stepNumber: number
} 