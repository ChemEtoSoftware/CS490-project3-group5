import './App.css';
import React from 'react';

export function Logout(props){
    return (
        <div>
            <button onClick={props.onLogout}>Logout</button>
        </div>
        );
}