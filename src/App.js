import './App.css';
import React from 'react';
import { MakeBoard } from './Board.js';
import { Login } from './Login.js';
import { Logout } from './Logout.js';
import { Display } from './Display.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [users, setUser] = useState([]);
  const [isLoggedIn, setValue] = useState(false);
  const [checkUser,setChecker] = useState(null);
  const inputRef = useRef(null);
  const [isX, set_isX] = useState('Temp');
  var currentWindow;
  var button;
  var display;

  useEffect(() =>{
    socket.on('tictactoe',(data)=>{
      setBoard(prevBoard=> {
        return [...data.message];
      });
    });
  },[]);
  
  /*useEffect(() => {
    return function cleanup(){
      socket.emit('logout',checkUser);
    }
  });*/
  
  useEffect(() =>{
    socket.on('login',(data) =>{
      setUser(prev => {
        const temp = [...data];
        console.log("Up-to-date list of users",temp);
        return temp;
      });
    });
    },[]);

  function onClickButton(clickedId){
    if(isX != 'X' && isX != 'O'){
      return null;
    }
    console.log(clickedId);
    setBoard(prevBoard => {
      const temp = [...prevBoard];
      temp[parseInt(clickedId)]=isX;
      socket.emit('tictactoe',{message : temp});
      return temp;
    });
    console.log(board);
  }
  
  
  if(!isLoggedIn){
    currentWindow = <Login inputRef={inputRef} onLogin={onLogin}/>;
    display = null;
    button = null;
  }
  else{
    currentWindow = board.map((if_x,index) => <MakeBoard if_x={if_x} id={index} click={onClickButton}/>);
    display = users.map((currentUser,index) => <Display name={currentUser} number={index}/>);
    button = <Logout onLogout={onLogout}/>;
  }
  
  function onLogin(){
    const user = inputRef.current.value;
    if (user==""){
      alert("You need to enter a proper username");
    }
    else{
      console.log("Current list of users upon login",users);
      setUser(prev => {
        const temp = [...prev,user];
        setChecker(user);
        return temp;
      });
      setValue(true);
      socket.emit('login',user);
    }
  }

  function onLogout(){
    setValue(false);
    socket.emit('logout',checkUser);
    setChecker(null);
    console.log(checkUser);
  }

  
  return (
    <div>
      <div className="board">
        {currentWindow}
      </div>
      <div>
        {button}
      </div>
      <div>
        {display}
      </div>
    </div>
  );
}

export default App;
