import './App.css';
import './Display.css';
import React from 'react';
import PropTypes from 'prop-types';

// This function is actually displaying the leaderboard.
export function Display(props) {
  const {
    name, number, currentUser, currentLetter,
  } = props;
  let line;
  if (name === currentUser) {
    line = (
      <td>
        {' '}
        <b>
          Player
          {' '}
          {currentLetter}
          {' '}
          (
          {name}
          )
        </b>
      </td>
    );
  } else {
    line = (
      <td>
        {' '}
        Player
        {' '}
        (
        {name}
        )
      </td>
    );
  }
  return (
    <tr>
      {line}
      <td>{number}</td>
    </tr>
  );
}

Display.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  currentUser: PropTypes.string,
  currentLetter: PropTypes.string,
};

Display.defaultProps = {
  name: '',
  number: null,
  currentUser: null,
  currentLetter: null,
};

export default Display;
