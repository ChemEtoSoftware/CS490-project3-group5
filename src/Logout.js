import React from 'react';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './Login.css';

export function Logout(props) {
  const { toggleLogin, socket, authID } = props;
  const handleLogout = () => {
    socket.emit('Logout', { socketID: socket.id });
    toggleLogin();
  };
  return (
    <div className="GoogleAuth">
      <GoogleLogout
        clientId={authID}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      />
    </div>
  );
}
Logout.propTypes = {
  toggleLogin: PropTypes.func,
  socket: PropTypes.instanceOf(io()),
  authID: PropTypes.string,
};
Logout.defaultProps = {
  toggleLogin: () => {
    //  eslint-disable-next-line
    alert('default');
  },
  socket: null,
  authID: '',
};
export default Logout;
