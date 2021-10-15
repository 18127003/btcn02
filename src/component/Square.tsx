
const Square = (props: SquareProp) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default Square;