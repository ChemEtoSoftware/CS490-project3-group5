import logo from './logo.svg';
import './App.css';
import React from 'react';
import { MakeBoard } from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [users, setUser] = useState(["Kevin"]);
  const [isLoggedIn, setValue] = useState(false);
  
  console.log(isLoggedIn);
  
  function onClickButton(clickedId){
    console.log(clickedId);
    setBoard(prevBoard => {
      const temp = [...prevBoard];
      temp[parseInt(clickedId)]='x';
      socket.emit('tictactoe',{message : temp});
      return temp;
    });
    console.log(board);
  }
  

  useEffect(() =>{
    socket.on('tictactoe',(data)=>{
      setBoard(prevBoard=> {
        return [...data.message];
      });
    });
  },[]);
  
  return (
    <div className="board">
      {board.map((if_x,index) => <MakeBoard if_x={if_x} id={index} click={onClickButton}/>)}
    </div>
  );
}

export default App;
