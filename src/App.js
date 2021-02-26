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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkUser,setCheckUser] = useState(null);
  const inputRef = useRef(null);
  const [currentLetter, setCurrentLetter] = useState('Temp');
  const [isXNext, set_isXNext] = useState(true);
  var currentWindow;
  var logoutButton;
  var leaderBoard;
  var winner;
  var theWinnerIsStatement;
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






  //Changes the value of each square. currentLetter is telling the program if the user is X or O.
  //It has nothing to do with the square's value. This function also tells the program if X is next.
  function onClickButton(clickedId){
    if(currentLetter != 'X' && currentLetter != 'O'){
      return null;
    }
    console.log(currentLetter,isXNext);
    if((isXNext && currentLetter=='X') || (!isXNext && currentLetter=='O')){
      console.log(clickedId);
      setBoard(prevBoard => {
        const temp = [...prevBoard];
        if(temp[parseInt(clickedId)]!='X' && temp[parseInt(clickedId)]!='O'){
          temp[parseInt(clickedId)]=currentLetter;
        }
        set_isXNext((prev)=>!isXNext);
        socket.emit('tictactoe',{message : temp,nxt : isXNext});
        return temp;
      });
      console.log(board);
    }
    
  }
  
  //Tells all the users who's logged in, tells the program who the current user is (i.e. the person who logged in on the current tab)
  function onLogin(){
    const user = inputRef.current.value;
    if (user==""){
      alert("You need to enter a proper username");
    }
    else{
      console.log("Current list of users upon login",users);
      setUser(prev => {
        const temp = [...prev,user];
        setCheckUser((prev)=>user);
        return temp;
      });
      setIsLoggedIn((prev)=>true);
      socket.emit('login',user);
    }
  }

  //Wasn't required but I figured what the heck. Still isn't perfect.
  function onLogout(){
    setIsLoggedIn((prev) => false);
    setBoard(prevBoard => ["","","","","","","","",""]);
    socket.emit('tictactoe',{message : ["","","","","","","","",""]});
    setCheckUser((prev) => '');
    setCurrentLetter((prev) => '');
    set_isXNext((prev) => true);
    setUser((prev)=>[]);
    socket.emit('logout',checkUser);
    setCheckUser((prev) => null);
    console.log(checkUser);
  }
  
  //Tells the user if they're X, O or a spectator.
  function setUserLetter(number,name){
    console.log("This is the current index",number);
    console.log("This is the current user",name);
    console.log("And this is the client",checkUser);
    if(name==checkUser && number==0){
      console.log(name,number,checkUser);
      setCurrentLetter((prev) => 'X');
    }
    else if (name == checkUser && number==1){
      setCurrentLetter((prev) => 'O');
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
      return "Player ".concat(squares[a]);
    }
  }
  return null;
  }
  
  //reset function. nxt is false because the listener for tictactoe sets isXNext to the opposite of nxt.
  function reset(){
    setBoard(prevBoard => ["","","","","","","","",""]);
    set_isXNext((prev) => true);
    socket.emit('tictactoe',{message : ["","","","","","","","",""], nxt : false});
  }
  
  
  
  
  
  
  //Conditionals
  if(!isLoggedIn){
    currentWindow = <Login inputRef={inputRef} onLogin={onLogin}/>;
    leaderBoard = null;
    logoutButton = null;
    winner = null;
    theWinnerIsStatement=null;
    reset=null;
  }
  else{
    currentWindow = board.map((if_x,index) => <MakeBoard if_x={if_x} id={index} click={onClickButton}/>);
    leaderBoard = users.map((currentUser,index) => <Display name={currentUser} number={index} setUserLetter={setUserLetter}/>);
    logoutButton = <Logout onLogout={onLogout}/>;
    theWinnerIsStatement=<h1>The winner is: </h1>;
    winner = calculateWinner(board);
    reset = <button onClick={reset}>Reset</button>;
    
  }
  
  

  
  return (
    <div>
      <div className="board">
        {currentWindow}
      </div>
      <div>
        {logoutButton}{reset}
      </div>
      <div>
        {leaderBoard}
      </div>
      <div>
        {theWinnerIsStatement}{winner}
      </div>
    </div>
  );
}

export default App;
