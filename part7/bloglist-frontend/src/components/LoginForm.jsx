import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.5em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          username:
          <input
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <br />
        <div>
          password:
          <input
            type="password"
            data-testid="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <Button type="submit">login</Button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;
