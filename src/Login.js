import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import AppLogo from './img/EventGuru.jpg';
import './Login.css';

// import { refreshTokenSetup } from 'refreshToken';

// import io from 'socket.io-client';
const clientId = 'YOUR_CLIENT_ID';
export function Login(props) {
  const [isLoggedIn] = useState(false);
  const { setLogin } = props;
  const handleLogin = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    // refreshTokenSetup(res);
    setLogin(true);
  };
  const handleFailLogin = (res) => {
    console.log('[Login failed] res:', res);
    alert('')
  };
  function conditionalLogin() {
    if (isLoggedIn === false) {
      return (
        <div>
          <div className="logo">
            <img src={AppLogo} alt="App Logo" className="image" />
          </div>
          <div className="GoogleAuth">
            <GoogleLogin
              clientId={clientId}
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
};
Login.defaultProps = {
  setLogin: () => {
    alert('default');
  },
};
export default Login;
