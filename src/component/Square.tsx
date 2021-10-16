import React from "react";
import { SquareProp } from "../@type/prop";

const Square: React.FC<SquareProp> = (props) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default Square;