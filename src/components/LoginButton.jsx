import React from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.section`
  background: red;
`;

const LoginButton = (props) => {
  const { onClick } = props;
  return (
    <LoginWrapper>
      <div>
        <button type="button" onClick={onClick}>
          Login
        </button>
      </div>
    </LoginWrapper>
  );
};

export default LoginButton;
