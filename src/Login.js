import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import AppLogo from './img/EventGuru.jpg';
import './Login.css';

// import { refreshTokenSetup } from 'refreshToken';

// import io from 'socket.io-client';
export function Login(props) {
  const [isLoggedIn] = useState(false);
  const { setLogin, socket, authID } = props;
  const handleLogin = (res) => {
    // console.log('[Login Success] currentUser:', res.profileObj);
    res.profileObj.socketID = socket.id;
    // refreshTokenSetup(res);
    // console.log(res.profileObj);
    socket.emit('Login', res.profileObj);
    setLogin(true);
  };
  const handleFailLogin = () => {
    // console.log('[Login failed] res:', res);
    //  eslint-disable-next-line
    alert('Login Failed!');
  };
  function conditionalLogin() {
    if (isLoggedIn === false) {
      // console.log('Login CredInfo Status: ', authID);
      return (
        <div>
          <div className="logo">
            <img src={AppLogo} alt="App Logo" className="image" />
          </div>
          <div className="GoogleAuth">
            <GoogleLogin
              clientId={authID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailLogin}
              cookiePolicy="single_host_origin"
              isSignedIn
            />
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      {conditionalLogin()}
    </div>
  );
}
Login.propTypes = {
  setLogin: PropTypes.func,
  socket: PropTypes.instanceOf(io()),
  authID: PropTypes.string,
};
Login.defaultProps = {
  setLogin: () => {
    //  eslint-disable-next-line
    alert('default');
  },
  socket: null,
  authID: '',
};
export default Login;
