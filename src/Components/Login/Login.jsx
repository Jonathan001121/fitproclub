import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Log in to FitProClub</h2>
        <form>
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="login-or">
          <div className="login-line"></div>
          <div className="login-or-text">OR</div>
          <div className="login-line"></div>
        </div>
        <div className="login-options">
          <button className="login-option">Log in with Facebook</button>
          <button className="login-option">Forgot Password?</button>
        </div>
      </div>
      <div className="login-signup">
        Don't have an account? <a href="#" className="signup-link">Sign up</a>
      </div>
    </div>
  );
};

export default Login;