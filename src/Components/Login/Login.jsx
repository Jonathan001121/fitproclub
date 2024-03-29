import React, { useRef, useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import useCursor from "../elderly_cursor";
import Checkbox from '@mui/material/Checkbox';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Login = () => {
  const { cursor, changePosition } = useCursor();
  const [flipped, setFlipped] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
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
    email: '',
    level: '',
    desired_body_part: '',
    weight: '',
    height: '',
    muscle_mass: '',
    body_fat_mass: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'consentCheckbox' ? checked : value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

 
  const requiredFields = ['username','password','age', 'gender', 'email', 'height','level']; // Add the names of all required fields
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    const missingFieldsMessage = `Missing input on required fields: ${missingFields.join(', ')}. Please fill in all required fields.`;
    setDialogOpen(true); 
    setResponseMessage(missingFieldsMessage); 
    return; 
  }


    try {
      const response = await fetch('http://127.0.0.1:9000/register', {
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
      setResponseMessage(data.message)
      setDialogOpen(true); // Open the dialog

      console.log(data);
      // Handle successful registration, e.g., redirect to dashboard
    } catch (error) {
      setResponseMessage(error.message)
      setDialogOpen(true); // Open the dialog
      console.error('There was a problem with the fetch operation:', error);

      // Handle errors, e.g., show an error message
    }
  };
  const handleDialogConfirm = () => {
    setDialogOpen(false); // Close the dialog
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="login-container" onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor}> </div>


      <div className={`biggerForm ${flipped ? 'flipped' : ''}`}>

        {flipped ?
          (
            <div className='register-form'>
              <h2 className="login-heading">Join SILVIS Club</h2>
              <form onSubmit={handleSubmit}>
                <div className="regForm-row">
                  <div className="regForm-left">
                    <label htmlFor="username">Username *</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      className="login-input"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="login-input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />


                    <label htmlFor="age">Age  *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Age"
                      className="login-input"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="gender">Gender  *</label>
                    <select
                      id="gender"
                      name="gender"
                      className="login-input"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    <label htmlFor="city">City  </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      className="login-input"
                      value={formData.city}
                      onChange={handleChange}
                    />

                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Country"
                      className="login-input"
                      value={formData.country}
                      onChange={handleChange}
                    />


                    <label htmlFor="email">Email Address  *</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="login-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="regForm-right">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      placeholder="Weight (kg)"
                      className="login-input"
                      value={formData.weight}
                      onChange={handleChange}
                    />

                    <label htmlFor="height">Height (cm)  *</label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      placeholder="Height (cm)"
                      className="login-input"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="muscle_mass">Muscle Mass (kg)</label>
                    <input
                      type="number"
                      id="muscle_mass"
                      name="muscle_mass"
                      placeholder="Muscle Mass (kg)"
                      className="login-input"
                      value={formData.muscle_mass}
                      onChange={handleChange}
                    />

                    <label htmlFor="body_fat_mass">Body Fat Mass (kg)</label>
                    <input
                      type="number"
                      id="body_fat_mass"
                      name="body_fat_mass"
                      placeholder="Body Fat Mass (kg)"
                      className="login-input"
                      value={formData.body_fat_mass}
                      onChange={handleChange}
                    />

                    <label htmlFor="calories">Calories (kcal)</label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      placeholder="Calories"
                      className="login-input"
                      value={formData.calories}
                      onChange={handleChange}
                    />

                    <label htmlFor="heart_rate">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      id="heart_rate"
                      name="heart_rate"
                      placeholder="Heart Rate"
                      className="login-input"
                      value={formData.heart_rate}
                      onChange={handleChange}
                    />

                    <label htmlFor="level">Level  *</label>

                    <select
                      id="level"
                      name="level"
                      className="login-input"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Training Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="amateur">Amateur</option>
                      <option value="amateur">Experienced</option>
                    </select>

                    <label htmlFor="desired_body_part">Desired / Focus Training Body Part </label>
                    <input
                      type="text"
                      id="desired_body_part"
                      name="desired_body_part"
                      placeholder="Desired Body Part"
                      className="login-input"
                      value={formData.desired_body_part}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Add other input fields or select options similarly */}
                <Checkbox
                  id="consentCheckbox"
                  name="consentCheckbox"
                  checked={formData.consentCheckbox || false}
                  onChange={handleChange}
                />
                <label htmlFor="consentCheckbox" style={{ "font-weight": "lighter" }}>I consent to receiving announcement emails</label>
                <button type="submit" className="register-button">Register</button>
              </form>
              <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    color: 'white',
                    fontWeight: 'lighter'
                  },
                }}
              >
                <DialogTitle sx={{fontWeight: 'bolder' }}>Response Message</DialogTitle>
                <DialogContent>
                  {typeof responseMessage === 'string' ? (
                    <p>{responseMessage}</p>
                  ) : (
                    <p>An error occurred. Please try again.</p>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogConfirm} variant="contained" color="primary"sx={{ background: 'none', color: '#42cffe' }}>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
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
