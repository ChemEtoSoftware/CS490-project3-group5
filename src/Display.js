import './App.css';
import './Display.css';
import React from 'react';

export function Display(props){
    console.log("This is the current user",props.name,props.number,props.currentUser);
    var line;
    console.log(props.currentLetter);
    if(props.name===props.currentUser){
        var letter=props.currentLetter;
        line = <td> <b>Player {letter} ({props.name})</b></td>
    }
    else{
        line = <td> Player {letter} ({props.name})</td>
    }
    return(
        <tr>
            <td> {line}</td>
            <td>{props.number}</td>
        </tr>
        );
}