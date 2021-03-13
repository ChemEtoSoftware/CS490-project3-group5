import React from 'react';
import './Board.css';

export function MakeBoard(props) {
  return (
    <button className="box" id={props.id} onClick={() => props.click(props.id)}>
      {props.if_x}
    </button>
  );
}

export default MakeBoard;
