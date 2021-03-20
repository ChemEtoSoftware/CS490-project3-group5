import './App.css';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export function Login(props) {
  const {
    setUser,
    setCheckUser,
    setIsLoggedIn,
    socket,
  } = props;
  const inputRef = useRef(null);

  /* Tells all the users who's logged in,
  tells the program who the current user is
  (i.e. the person who logged in on the current tab) */
  function onLogin() {
    const user = inputRef.current.value;
    if (user === '') {
      alert('You need to enter a proper username'); // eslint-disable-line no-alert
    } else {
      setUser((prev) => {
        const temp = [...prev, user];
        setCheckUser(user);
        return temp;
      });
      setIsLoggedIn(true);
      socket.emit('login', { user });
    }
  }
  return (
    <div>
      <h1>Login here so that you can play or watch the tictactoe game.</h1>
      Enter username here:
      {' '}
      <input ref={inputRef} type="text" placeholder="Put in a real name" />
      <button type="button" onClick={onLogin}>Login</button>
    </div>
  );
}
Login.propTypes = {
  setUser: PropTypes.func,
  setCheckUser: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
  socket: PropTypes.objectOf(PropTypes.object),
};

Login.defaultProps = {
  setUser: null,
  setCheckUser: null,
  setIsLoggedIn: null,
  socket: null,
};
export default Login;
