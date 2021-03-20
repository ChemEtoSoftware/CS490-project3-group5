import './App.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Renders the leaderboard button and also tells the program if the user is X or O
Also keeps a lookout for anybody logging out. */
export function LeaderBoard(props) {
  const {
    users, currentUser, setCurrentLetter, setIsLead, setUser, setScores, socket,
  } = props;
  useEffect(() => {
    socket.on('logout', (data) => {
      setUser([...data.users]);
      setScores([...data.ordered_users]);
    });
  });
  const num = users.indexOf(currentUser);
  // Tells the user if they're X, O or a spectator.
  function setUserLetter(number, name) {
    if (name === currentUser && number === 0) {
      setCurrentLetter('X');
    } else if (name === currentUser && number === 1) {
      setCurrentLetter('O');
    }
  }
  setUserLetter(num, currentUser);
  /* Tells the program if the user clicked the leaderboard button
  was clicked to activate the conditional. */
  function leaderBoard() {
    setIsLead((prev) => !prev);
  }
  return <button type="button" onClick={() => leaderBoard()}>Leader Board</button>;
}

LeaderBoard.propTypes = {
  setIsLead: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.string,
  setCurrentLetter: PropTypes.func,
  setUser: PropTypes.func,
  setScores: PropTypes.func,
  socket: PropTypes.func,
};

LeaderBoard.defaultProps = {
  setIsLead: null,
  users: [],
  currentUser: '',
  setCurrentLetter: null,
  setUser: null,
  setScores: null,
  socket: null,
};

export default LeaderBoard;
