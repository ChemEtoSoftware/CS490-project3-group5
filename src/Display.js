import './App.css';
import './Display.css';
import React from 'react';

export function Display(props){
    var line;
    if(props.name===props.currentUser){
        line = <td> <b>Player {props.currentLetter} ({props.name})</b></td>
    }
    else{
        line = <td> Player {props.currentLetter} ({props.name})</td>
    }
    return(
        <tr>
            <td> {line}</td>
            <td>{props.number}</td>
        </tr>
        );
}