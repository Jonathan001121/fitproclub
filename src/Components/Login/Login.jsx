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

 // Define formData state
 const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    gender: '',
    city: '',
    country: '',
    level: '',
    desired_body_part: '',
    weight: '',
    height: '',
    muscle_mass: '',
    body_fat_mass: '',
 });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
 };

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Handle successful registration, e.g., redirect to dashboard
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors, e.g., show an error message
    }
 };

 return (
    <div className="login-container" onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor}></div>
      <div className={`biggerForm ${flipped ? 'flipped' : ''}`}>
        {flipped ? 
          (
            <div className='register-form'>
              <h2 className="login-heading">Welcome to SILFIS</h2>
              <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 name="username"
                 placeholder="Username"
                 className="login-input"
                 value={formData.username}
                 onChange={handleChange}
                />
                   <input
                 type="text"
                 name="password"
                 placeholder="Password"
                 className="login-input"
                 value={formData.password}
                 onChange={handleChange}
                />
               <label for="quantity">Quantity (between 1 and 5):</label>
                <input type="number" id="quantity" name="quantity" min="1" max="5" />
                
                <input
                 type="text"
                 name="username"
                 placeholder="Username"
                 className="login-input"
                 value={formData.username}
                 onChange={handleChange}
                />
                   <input
                 type="text"
                 name="username"
                 placeholder="Username"
                 className="login-input"
                 value={formData.username}
                 onChange={handleChange}
                />
                   <input
                 type="text"
                 name="username"
                 placeholder="Username"
                 className="login-input"
                 value={formData.username}
                 onChange={handleChange}
                />
                {/* Add other input fields similarly */}
                <button type="submit" className="register-button">Register</button>
              </form>
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
          )
        }
      </div>
      <div className="login-signup">
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
