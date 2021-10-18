
type SquareProp = {
    id: number,
    onClick: ()=>void,
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
    size: number,
    winCriteria: number
}

type HistoryListProp = {
    data: HistoryStep[],
    onSelect: (move:number)=>void
}

