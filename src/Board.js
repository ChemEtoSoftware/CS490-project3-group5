import React from 'react';
import './Board.css';

export function MakeBoard(props){
    console.log("Index ",props.id);
    console.log("if_x ",props.if_x);
    return(
        <div className="box" id={props.id} onClick={() => props.click(props.id)}>{props.if_x}</div>
        );
}
