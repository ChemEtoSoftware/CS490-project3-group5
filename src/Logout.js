import './App.css';
import React from 'react';
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';

export function Logout(props){
    return (
        <div>
            <button onClick={props.onLogout}>Logout</button>
        </div>
        );
}