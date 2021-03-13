import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

export function Logout(props) {
  const { onLogout } = props;
  return (
    <div>
      <button type="button" value="logout" onClick={() => onLogout()}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func,
};

Logout.defaultProps = {
  onLogout: null,
};

export default Logout;
