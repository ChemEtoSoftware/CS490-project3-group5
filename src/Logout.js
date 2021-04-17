import React from 'react';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './Login.css';

// const clientId = '261247752424-q9516idbkvqfveotvoq8rnstd96j4660.apps.googleusercontent.com';
export function Logout(props) {
  const { toggleLogin, socket, credInfo } = props;
  const handleLogout = () => {
    alert('Logout made successfully');
    socket.emit('Logout', { socketID: socket.id });
    toggleLogin();
  };
  return (
    <div className="GoogleAuth">
      <GoogleLogout
        clientId={credInfo}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      />
    </div>
  );
}
Logout.propTypes = {
  toggleLogin: PropTypes.func,
  socket: PropTypes.instanceOf(io()),
  credInfo: PropTypes.string,
};
Logout.defaultProps = {
  toggleLogin: () => {
    alert('default');
  },
  socket: null,
  credInfo: '',
};
export default Logout;
