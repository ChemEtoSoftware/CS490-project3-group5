import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

export function Login(props) {
  const {
    inputRef, onLogin,
  } = props;
  return (
    <div>
      <h1>Login here so that you can play or watch the tictactoe game.</h1>
      Enter username here:
      {' '}
      <input ref={inputRef} type="text" />
      <button type="button" value="Login" onClick={onLogin}>Login</button>
    </div>
  );
}
Login.propTypes = {
  inputRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
  ]),
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  inputRef: '',
  onLogin: null,
};
export default Login;
