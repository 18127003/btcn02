import React from "react";

const Square: React.FC<SquareProp> = (props) => {
    const renderValue = ()=>{
      if(props.isHighlight){
        return (
          <mark>{props.value}</mark>
        )
      }
      return props.value
    }

    return (
      <button className="square" onClick={props.onClick} >
        {renderValue()}
      </button>
    );
}

export default Square;