import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginControl = (props) => {
  let button;
  const { isAuthenticated, login, logout } = props;
  if (isAuthenticated) {
    button = <LogoutButton onClick={logout} />;
  } else {
    button = <LoginButton onClick={login} />;
  }

  return (
    <div className="LoginControl">
      {button}
    </div>
  );
};

export default LoginControl;
