

type SquareProp = {
    onClick: any,
    value: string|null,
    isHighlight: boolean
}

type BoardProp = {
    squares: (string|null)[],
    size: number,
    onClick: (row:number, col:number)=>void,
    winner: number[]
}

type GameProp = {
    size: number
}

type HistoryListProp = {
    data: Move[],
    onSelect: (move:number)=>void
}

