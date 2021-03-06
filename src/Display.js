import './App.css';
import React from 'react';

export function Display(props){
    console.log("This is the current user",props.name,props.number);
    var letter='';
    if(props.number==0){
        letter='X';
    }
    else if (props.number==1){
        letter='O';
    }
    return(
        <ol>
            Player {letter} : {props.name}
        </ol>
        );
}