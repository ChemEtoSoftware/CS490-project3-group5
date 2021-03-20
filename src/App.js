import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { MakeBoard } from './Board';
import { Login } from './Login';
import { Logout } from './Logout';
import { Display } from './Display';
import { LeaderBoard } from './LeaderBoard';

export const socket = io();

function App() {
  // These are all of my variables for the game. Yeah, it's a lot.
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  // List of unordered users for determining who's X/O and who's not
  const [users, setUser] = useState([]);
  // List of ordered users by score
  const [scores, setScores] = useState([]);
  // Allows program to conditionally render if the logged in button was processed.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Keeps track of the username of each tab for later functions.
  const [checkUser, setCheckUser] = useState(null);
  // Is the current user X or O
  const [currentLetter, setCurrentLetter] = useState('');
  // Whose turn is it
  const [isXNext, setIsXNext] = useState(true);
  // Shows who won the game. Cleared on reset and logout.
  const [currentWinner, setCurrentWinner] = useState(null);
  // Was the leaderboard button pressed.
  const [isLead, setIsLead] = useState(null);
  /* These are all the variables I put in the return statement. They're null
  if log in button was not clicked, otherwise they render other react components */
  let currentWindow;
  let logoutButton;
  let theWinnerIsStatement;
  let resetButton;
  let leaderBoardButton;
  let leader;
  /* useEffect(() => {
    return function cleanup(){
      socket.emit('logout',checkUser);
    }
  }); */

  // Just updates the scores of users.
  useEffect(() => {
    socket.on('winner', (data) => {
      setScores([...data.ordered_users]);
    });
    return function cleanup() {
      socket.off('winner');
    };
  }, []);
  // This is just for updating currentWinner to null.
  useEffect(() => {
    socket.on('reset', (data) => {
      if (data.message === true) setCurrentWinner(null);
    });
  }, []);
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
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        if (currentWinner === null) {
          setCurrentWinner(squares[a]);
          if (currentLetter === squares[a]) {
            socket.emit('winner', { username: checkUser, status: 'winner' });
          } else if (currentLetter !== '') {
            socket.emit('winner', { username: checkUser, status: 'loser' });
          }
          return 'Player '.concat(squares[a]);
        }
        setCurrentWinner(null);
      }
    }
    return null;
  }

  /* reset function. nxt is false because the listener for
  tictactoe sets isXNext to the opposite of nxt. */
  function reset() {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setIsXNext(true);
    setCurrentWinner(null);
    socket.emit('tictactoe', {
      message: ['', '', '', '', '', '', '', '', ''],
      nxt: false,
    });
    socket.emit('reset', { message: true });
  }
  // Conditionals
  if (!isLoggedIn) {
    currentWindow = (
      <Login
        setUser={setUser}
        setCheckUser={setCheckUser}
        setIsLoggedIn={setIsLoggedIn}
        socket={socket}
      />
    );
    logoutButton = null;
    theWinnerIsStatement = null;
    resetButton = null;
  } /* Log in button was clicked. */ else {
    // Sets up board.
    currentWindow = board.map((ifIsx, index) => (
      <MakeBoard
        ifX={ifIsx}
        id={index}
        currentLetter={currentLetter}
        isXNext={isXNext}
        setBoard={setBoard}
        setIsXNext={setIsXNext}
        board={board}
        socket={socket}
      />
    ));
    // Checks if anybody's won yet.
    if (currentWinner === null) {
      calculateWinner(board);
    }
    // Functional logout button.
    logoutButton = (
      <Logout
        setIsLoggedIn={setIsLoggedIn}
        currentLetter={currentLetter}
        setBoard={setBoard}
        setCheckUser={setCheckUser}
        setCurrentLetter={setCurrentLetter}
        setIsXNext={setIsXNext}
        setUser={setUser}
        setCurrentWinner={setCurrentWinner}
        checkUser={checkUser}
        setScores={setScores}
        setIsLead={setIsLead}
        socket={socket}
      />
    );
    // Functional leaderboard button.
    leaderBoardButton = (
      <LeaderBoard
        users={users}
        currentUser={checkUser}
        setCurrentLetter={setCurrentLetter}
        setIsLead={setIsLead}
        setUser={setUser}
        setScores={setScores}
        socket={socket}
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
                currentLetter={currentLetter}
              />
            )))
          }
        </tbody>
      </table>;
    }
    theWinnerIsStatement = <h1>The winner is: </h1>;
    resetButton = <button type="button" onClick={reset}>Reset</button>;
  }
  // Renders everything.
  return (
    <div>
      <div className="board">{currentWindow}</div>
      <div className="logoutbutton">
        {logoutButton}
        {resetButton}
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
