import logo from './logo.svg';
import './App.css';
import React from 'react';
import { MakeBoard } from './Board.js';
import { Login } from './Login.js';
import { Logout } from './Logout.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [users, setUser] = useState([]);
  const [isLoggedIn, setValue] = useState(false);
  const inputRef = useRef(null);
  var currentWindow;
  var button;

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
  
  
  if(!isLoggedIn){
    currentWindow = <Login inputRef={inputRef} onLogin={onLogin}/>;
    button = null;
  }
  else{
    currentWindow = board.map((if_x,index) => <MakeBoard if_x={if_x} id={index} click={onClickButton}/>);
    button = <Logout onLogout={onLogout}/>;
  }
  
  function onLogin(){
    const user = inputRef.current.value;
    if (user==""){
      alert("You need to enter a proper username");
    }
    else{
      setUser(prev => {
        const temp = [...users,user];
        socket.emit('login',user);
        return temp;
      });
      setValue(true);
    }
  }

  function onLogout(){
    console.log("You're at the logout function");
  }

  useEffect(() =>{
    socket.on('tictactoe',(data)=>{
      setBoard(prevBoard=> {
        return [...data.message];
      });
    });
  },[]);
  
  useEffect(() =>{
    socket.on('login',(data) =>{
      setUser(prev => {
        console.log(data);
        return [...data];
      });
    });
    });
  
  return (
    <div className="board">
      {currentWindow}
      {button}
    </div>
  );
}

export default App;
