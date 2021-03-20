import './App.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Logout(props) {
  const {
    setIsLoggedIn, currentLetter, setBoard, setCheckUser,
    setCurrentLetter, setIsXNext, setUser,
    setCurrentWinner, checkUser, setScores,
    setIsLead, socket,
  } = props;
  /* Gives a list of users in the order that they logged in,
  as well as a list of users ordered by their scores. */
  useEffect(() => {
    socket.on('login', (data) => {
      setUser([...data.users]);
      setScores([...data.ordered_users]);
    });
  }, []);
  /* If the user is a spectator, their name is just removed
  from the list of active users. Otherwise, the board and everything
  gets reset. I don't call the reset function because it emits to
  reset socket, which I don't want. */
  function onLogout() {
    setIsLoggedIn(false);
    socket.emit('logout', checkUser);
    if (currentLetter !== '') {
      setBoard(['', '', '', '', '', '', '', '', '']);
      socket.emit('tictactoe', { message: ['', '', '', '', '', '', '', '', ''] });
      setCurrentLetter('');
      setIsXNext(false);
      setUser([]);
      setCheckUser(null);
      setCurrentWinner(null);
      setScores([]);
      setIsLead(false);
    }
  }
  return (
    <div>
      <button type="button" onClick={() => onLogout()}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  setIsLoggedIn: PropTypes.func,
  currentLetter: PropTypes.string,
  setBoard: PropTypes.func,
  setCheckUser: PropTypes.func,
  setCurrentLetter: PropTypes.func,
  setIsXNext: PropTypes.func,
  setUser: PropTypes.func,
  setCurrentWinner: PropTypes.func,
  checkUser: PropTypes.string,
  setScores: PropTypes.func,
  setIsLead: PropTypes.func,
  socket: PropTypes.objectOf(PropTypes.object),
};

Logout.defaultProps = {
  setIsLoggedIn: null,
  currentLetter: '',
  setBoard: null,
  setCheckUser: null,
  setCurrentLetter: null,
  setIsXNext: null,
  setUser: null,
  setCurrentWinner: null,
  checkUser: '',
  setScores: null,
  setIsLead: null,
  socket: null,
};

export default Logout;
