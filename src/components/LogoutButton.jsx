import React from 'react';
import styled from 'styled-components';

const LogoutWrapper = styled.section`
  background: green;
`;

const LogoutButton = (props) => {
  const { onClick } = props;
  return (
    <LogoutWrapper>
      <div>
        <button type="button" onClick={onClick}>
          Logout
        </button>
      </div>
    </LogoutWrapper>
  );
};

export default LogoutButton;
