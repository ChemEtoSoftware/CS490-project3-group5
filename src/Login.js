import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import AppLogo from './img/EventGuru.jpg';
import './Login.css';

// import { refreshTokenSetup } from 'refreshToken';

// import io from 'socket.io-client';
// const clientId = '261247752424-q9516idbkvqfveotvoq8rnstd96j4660.apps.googleusercontent.com';
export function Login(props) {
  const [isLoggedIn] = useState(false);
  const { setLogin, socket } = props;
  const [clientID, setClientID] = useState(null);
  const handleLogin = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    res.profileObj.socketID = socket.id;
    // refreshTokenSetup(res);
    console.log(res.profileObj);
    socket.emit('Login', res.profileObj);
    setLogin(true);
  };
  const handleFailLogin = (res) => {
    console.log('[Login failed] res:', res);
    alert('Login Failed!');
  };
  function conditionalLogin() {
    if (isLoggedIn === false) {
      console.log('Login CredInfo Status: ', clientID);
      return (
        <div>
          <div className="logo">
            <img src={AppLogo} alt="App Logo" className="image" />
          </div>
          <div className="GoogleAuth">
            <GoogleLogin
              clientId={clientID}
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
  function triggerID(string) {
    setClientID(string);
  }
  useEffect(() => {
    socket.on('credInfo', (data) => {
      if (clientID === null) {
        console.log(data);
        triggerID(data);
        console.log('ClientInfo Set: ', clientID, data);
      } else {
        console.log('ID not null: ', clientID);
      }
    });
    return () => {
      socket.removeEventListener('credInfo');
    };
  }, []);

  return (
    <div>
      {conditionalLogin()}
    </div>
  );
}
Login.propTypes = {
  setLogin: PropTypes.func,
  socket: PropTypes.instanceOf(io()),
};
Login.defaultProps = {
  setLogin: () => {
    alert('default');
  },
  socket: null,
};
export default Login;
// credInfo: PropTypes.string,
// credInfo: '',
