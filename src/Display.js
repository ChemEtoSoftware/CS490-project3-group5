import './App.css';
import React from 'react';

export function Display(props){
    var letter='';
    if(props.number==0){
        letter='X';
    }
    else if (props.number==1){
        letter='O';
    }
     props.setX(props.number,props.name);
    return(
        <ol>
            Player {letter} : {props.name}
        </ol>
        );
}