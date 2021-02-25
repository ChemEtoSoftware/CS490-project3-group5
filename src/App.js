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
  
  
  //These are all of my variables for the game. Yeah, it's a lot.
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [users, setUser] = useState([]);
  const [isLoggedIn, setValue] = useState(false);
  const [checkUser,setChecker] = useState(null);
  const inputRef = useRef(null);
  const [isX, set_isX] = useState('Temp');
  const [isXNext, set_isXNext] = useState(true);
  var currentWindow;
  var button;
  var display;
  var winner;
  var theWinnerIs;
  var reset;


  //Use effects for the game. If the user reloads there page, it doesn't update to the original player's square, but instead updates the original player's square to be blank as well.
  useEffect(() =>{
    socket.on('tictactoe',(data)=>{
      setBoard(prevBoard=> [...data.message]);
      set_isXNext((prev) => !data.nxt);
      console.log(isXNext);
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
    console.log(isX,isXNext);
    if((isXNext && isX=='X') || (!isXNext && isX=='O')){
      console.log(clickedId);
      setBoard(prevBoard => {
        const temp = [...prevBoard];
        if(temp[parseInt(clickedId)]!='X' && temp[parseInt(clickedId)]!='O'){
          temp[parseInt(clickedId)]=isX;
        }
        set_isXNext((prev)=>!isXNext);
        socket.emit('tictactoe',{message : temp,nxt : isXNext});
        return temp;
      });
      console.log(board);
    }
    
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
        setChecker((prev)=>user);
        return temp;
      });
      setValue((prev)=>true);
      socket.emit('login',user);
    }
  }


  function onLogout(){
    setValue((prev) => false);
    setBoard(prevBoard => ["","","","","","","","",""]);
    socket.emit('tictactoe',{message : board});
    setChecker((prev) => '');
    set_isX((prev) => '');
    set_isXNext((prev) => true);
    setUser((prev)=>[]);
    socket.emit('logout',checkUser);
    setChecker((prev) => null);
    console.log(checkUser);
  }
  
  
  function setX(number,name){
    console.log("This is the current index",number);
    console.log("This is the current user",name);
    console.log("And this is the client",checkUser);
    if(name==checkUser && number==0){
      console.log(name,number,checkUser);
      set_isX((prev) => 'X');
    }
    else if (name == checkUser && number==1){
      set_isX((prev) => 'O');
    }
  }
  
  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  }
  function reset(){
    setBoard(prevBoard => ["","","","","","","","",""]);
    set_isXNext((prev) => true);
    socket.emit('tictactoe',{message : ["","","","","","","","",""], nxt : true});
  }
  
  
  
  
  
  
  
  if(!isLoggedIn){
    currentWindow = <Login inputRef={inputRef} onLogin={onLogin}/>;
    display = null;
    button = null;
    winner = null;
    theWinnerIs=null;
    reset=null;
  }
  else{
    currentWindow = board.map((if_x,index) => <MakeBoard if_x={if_x} id={index} click={onClickButton}/>);
    display = users.map((currentUser,index) => <Display name={currentUser} number={index} setX={setX}/>);
    button = <Logout onLogout={onLogout}/>;
    theWinnerIs=<h1>The winner is: </h1>;
    winner = calculateWinner(board);
    reset = <button onClick={reset}>Reset</button>;
    
  }
  
  

  
  return (
    <div>
      <div className="board">
        {currentWindow}
      </div>
      <div>
        {button}{reset}
      </div>
      <div>
        {display}
      </div>
      <div>
        {theWinnerIs}{winner}
      </div>
    </div>
  );
}

export default App;
