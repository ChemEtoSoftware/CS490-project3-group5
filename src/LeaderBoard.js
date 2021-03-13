import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

export function LeaderBoard(props) {
  const {
    leaderBoard, users, currentUser, setUserLetter,
  } = props;
  const num = users.indexOf(currentUser);
  setUserLetter(num, currentUser);
  return <button type="button" value="button" onClick={() => leaderBoard()}>Leader Board</button>;
}

LeaderBoard.propTypes = {
  leaderBoard: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.string,
  setUserLetter: PropTypes.func,
};

LeaderBoard.defaultProps = {
  leaderBoard: null,
  users: [],
  currentUser: '',
  setUserLetter: null,
};

export default LeaderBoard;
