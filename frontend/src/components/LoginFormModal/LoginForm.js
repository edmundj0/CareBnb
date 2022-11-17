import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false)) //if on a successful fetch, setShowModal to false, otherwise setErrors
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className="entire-login-page">
      <form onSubmit={handleSubmit} className='login-form'>
        <div className="welcome-back-header">Welcome Back!</div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className='error-list'>{error}</li>
          ))}
        </ul>
        <div>

          <input
            className="username-password-input"
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

        </div>
        <div>

          <input
            className="username-password-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>
        <button type="submit" className="login-button">Log In</button>
        <button type="submit" className="login-button" onClick={() => {
          setCredential('Demo-lition')
          setPassword("password")
        }}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginForm;
