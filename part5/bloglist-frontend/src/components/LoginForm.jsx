import PropTypes from "prop-types";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (event) => {
        event.preventDefault();
        handleLogin(username, password);
        setUsername("");
        setPassword("");
    };

    return (
     <div>
       <h2>Login</h2>
       <form onSubmit={loginUser}>
         <div>
           username:
           <input data-testid='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
         </div>
         <br />
         <div>
           password:
           <input type="password" data-testid='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
       </div>
       <br />
         <button type="submit">login</button>
       </form>
     </div>
    );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};
export default LoginForm;