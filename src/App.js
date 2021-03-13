import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { MakeBoard } from './Board.js';
import { Login } from './Login.js';
import { Logout } from './Logout.js';
import { Display } from './Display.js';
import { LeaderBoard } from './LeaderBoard.js';

const socket = io();

function App() {
  // These are all of my variables for the game. Yeah, it's a lot.
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [users, setUser] = useState([]);
  const [scores, setScores] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkUser, setCheckUser] = useState(null);
  const inputRef = useRef(null);
  const [currentLetter, setCurrentLetter] = useState('');
  const [isXNext, set_isXNext] = useState(true);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [isLead, setIsLead] = useState(null);
  let currentWindow;
  let logoutButton;
  let theWinnerIsStatement;
  var reset;
  let leaderBoardButton;
  let leader;
  let winner;

  // Use effects for the game. If the user reloads there page, it doesn't update to the original player's square, but instead updates the original player's square to be blank as well.
  useEffect(() => {
    socket.on('tictactoe', (data) => {
      setBoard((prevBoard) => [...data.message]);
      set_isXNext((prev) => !data.nxt);
    });
  }, []);

  /* useEffect(() => {
    return function cleanup(){
      socket.emit('logout',checkUser);
    }
  }); */

  // Gives a list of users in the order that they logged in, as well as a list of users ordered by their scores.
  useEffect(() => {
    socket.on('login', (data) => {
      setUser((prev) => {
        const temp = [...data.users];
        console.log('Up-to-date list of users', temp);
        return temp;
      });
      setScores((prev) => {
        const temp = [...data.ordered_users];
        return temp;
      });
    });
  }, []);

  // Just updates the scores of users.
  useEffect(() => {
    socket.on('winner', (data) => {
      setScores((prev) => {
        const temp = [...data.ordered_users];
        return temp;
      });
    });
    return function cleanup() {
      socket.off('winner');
    };
  }, [currentWinner]);
  // This is just for updating currentWinner to null.
  useEffect(() => {
    socket.on('reset', (data) => {
      if (data.message == true) setCurrentWinner((prev) => null);
    });
  }, [currentWinner]);

  // Changes the value of each square. currentLetter is telling the program if the user is X or O.
  // It has nothing to do with the square's value. This function also tells the program if X is next.
  function onClickButton(clickedId) {
    if (currentLetter != 'X' && currentLetter != 'O') {
      return null;
    }
    console.log(currentLetter, isXNext);
    if (
      (isXNext && currentLetter === 'X')
      || (!isXNext && currentLetter === 'O')
    ) {
      setBoard((prevBoard) => {
        const temp = [...prevBoard];
        if (
          temp[parseInt(clickedId)] != 'X'
          && temp[parseInt(clickedId)] != 'O'
        ) {
          temp[parseInt(clickedId)] = currentLetter;
        }
        set_isXNext((prev) => !isXNext);
        socket.emit('tictactoe', { message: temp, nxt: isXNext });
        return temp;
      });
    }
  }

  // Tells all the users who's logged in, tells the program who the current user is (i.e. the person who logged in on the current tab)
  function onLogin() {
    const user = inputRef.current.value;
    if (user === '') {
      alert('You need to enter a proper username');
    } else {
      setUser((prev) => {
        const temp = [...prev, user];
        setCheckUser((prev) => user);
        console.log('Current list of users upon login', temp);
        return temp;
      });
      setIsLoggedIn((prev) => true);
      socket.emit('login', { user });
    }
  }

  // Wasn't required but I figured what the heck. Still isn't perfect.
  function onLogout() {
    setIsLoggedIn((prev) => false);
    setBoard((prevBoard) => ['', '', '', '', '', '', '', '', '']);
    socket.emit('tictactoe', { message: ['', '', '', '', '', '', '', '', ''] });
    setCheckUser((prev) => '');
    setCurrentLetter((prev) => '');
    set_isXNext((prev) => true);
    setUser((prev) => []);
    socket.emit('logout', checkUser);
    setCheckUser((prev) => null);
    setCurrentWinner((prev) => null);
  }

  // Tells the user if they're X, O or a spectator.
  function setUserLetter(number, name) {
    if (name === checkUser && number === 0) {
      setCurrentLetter((prev) => 'X');
    } else if (name === checkUser && number === 1) {
      setCurrentLetter((prev) => 'O');
    }
  }

  // Calculated winner function to emit to winner socket and update scores accordingly.
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
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        if (currentWinner === null) {
          console.log("You're inside the calculated winner function.");
          setCurrentWinner((prev) => squares[a]);
          if (currentLetter === squares[a]) {
            console.log("And you're emitting to the winner socket here.");
            socket.emit('winner', { username: checkUser, status: 'winner' });
          } else if (currentLetter != '') {
            console.log("You're the loser.");
            socket.emit('winner', { username: checkUser, status: 'loser' });
          }
          return 'Player '.concat(squares[a]);
        }
        setCurrentWinner((prev) => null);
      }
    }
    return null;
  }

  // reset function. nxt is false because the listener for tictactoe sets isXNext to the opposite of nxt.
  function reset() {
    setBoard((prevBoard) => ['', '', '', '', '', '', '', '', '']);
    set_isXNext((prev) => true);
    setCurrentWinner((prev) => null);
    winner = '';
    socket.emit('tictactoe', {
      message: ['', '', '', '', '', '', '', '', ''],
      nxt: false,
    });
    socket.emit('reset', { message: true });
  }
  // Tells the program if the user clicked the leaderboard button was clicked to activate the conditional.
  function leaderBoard() {
    console.log('The leaderBoard button was clicked');
    setIsLead((prev) => !prev);
  }

  // Conditionals
  if (!isLoggedIn) {
    currentWindow = <Login inputRef={inputRef} onLogin={onLogin} />;
    logoutButton = null;
    theWinnerIsStatement = null;
    reset = null;
  }
  // Log in button was clicked.
  else {
    // Sets up board.
    currentWindow = board.map((if_x, index) => (
      <MakeBoard if_x={if_x} id={index} click={onClickButton} />
    ));
    // Checks if anybody's won yet.
    if (currentWinner === null) {
      winner = calculateWinner(board);
    }
    // Functional logout button.
    logoutButton = <Logout onLogout={onLogout} />;

    // Passing setUserLetter to tell the program if the user is X or O, but I'm going to remove this for milestone.
    leaderBoardButton = (
      <LeaderBoard
        leaderBoard={leaderBoard}
        users={users}
        currentUser={checkUser}
        setUserLetter={setUserLetter}
      />
    );
    if (isLead) {
      <table>
        <thead>
          <tr>
            <th colSpan="2">The table header</th>
          </tr>
        </thead>
        <tbody>
          {
            (leader = scores.map((currentUser) => (
              <Display
                name={currentUser.username}
                number={currentUser.score}
                currentUser={checkUser}
                currentLetter={currentUser.letter}
              />
            )))
          }
        </tbody>
      </table>;
    }
    theWinnerIsStatement = <h1>The winner is: </h1>;
    reset = <button onClick={reset}>Reset</button>;
  }

  return (
    <div>
      <div className="board">{currentWindow}</div>
      <div className="logoutbutton">
        {logoutButton}
        {reset}
      </div>
      <div className="leaderboardbutton">
        {leaderBoardButton}
        {leader}
      </div>
      <div className="victor">
        {theWinnerIsStatement}
        {currentWinner}
      </div>
    </div>
  );
}

export default App;
