import  { React, useRef }from 'react';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
  const cursor = useRef(null);
  const changePosition = (e) => {
    cursor.current.style.top = `${e.clientY}px`;
    cursor.current.style.left = `${e.clientX}px`;
  }




  return (

    <div className="login-container" onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor} ></div>
      <div className="login-form">
        <h2 className="login-heading">Welcome to SILFIS</h2>


        <form>
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>   <button type="submit" className="login-button">Log In</button> </Link>
 
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