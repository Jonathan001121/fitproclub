import React, { useRef, useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import useCursor from "../elderly_cursor";

const Login = () => {
  const { cursor, changePosition } = useCursor();
  const [flipped, setFlipped] = useState(false);

  const flipForm = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="login-container" onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor}></div>
      <div className={`biggerForm ${flipped ? 'flipped' : ''}`}>
        {flipped ? 
        
        
        
        (
          <div className='register-form'>
            <h2 className="login-heading">Welcome to SILFIS</h2>
            <form>
              <input type="text" placeholder="Username" className="login-input" />
              <input type="password" placeholder="Password" className="login-input" />
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <button type="submit" className="register-button">Register</button>
              </Link>
            </form>
            {/* <div className="login-or">
              <div className="login-line"></div>
              <div className="login-or-text">OR</div>
              <div className="login-line"></div>
            </div> */}
       
          </div>
        ) : 
        
        
        (
          <div className='login-form'>
            <h2 className="login-heading">Welcome to SILFIS</h2>
            <form>
              <input type="text" placeholder="Username" className="login-input" />
              <input type="password" placeholder="Password" className="login-input" />
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <button type="submit" className="login-button">Log In</button>
              </Link>
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
        )}
      </div>
      <div className="login-signup" >
        {flipped ? (
          <>Already have an account? <a href="#" className="signup-link" onClick={flipForm}>Login</a></>
        ) : (
          <>Don't have an account? <a href="#" className="signup-link" onClick={flipForm}>Register</a></>
        )}
      </div>

  
    </div>
  );
};

export default Login;