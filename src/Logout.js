import React from 'react';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import './Login.css';

const clientId = 'YOUR_CLIENT_ID';
export function Logout(props) {
  const { toggleLogin } = props;
  const handleLogout = () => {
    alert('Logout made successfully');
    toggleLogin();
  };
  return (
    <div className="GoogleAuth">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      />
    </div>
  );
}
Logout.propTypes = {
  toggleLogin: PropTypes.func,
};
Logout.defaultProps = {
  toggleLogin: () => {
    alert('default');
  },
};
export default Logout;
