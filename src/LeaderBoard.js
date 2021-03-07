import './App.css';
import React from 'react';

export function LeaderBoard(props){
    const num = props.users.indexOf(props.currentUser);
    props.setUserLetter(num,props.currentUser);
    return( 
        <button onClick={() => props.leaderBoard()}>Leader Board</button>
    );
}