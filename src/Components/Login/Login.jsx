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
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);


  const handleOpenQuestion = (e) => {
    e.preventDefault();
    setIsQuestionOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    // Code to close the questionnaire container
    setIsQuestionOpen(false);
  };
  const [questionmArray, setQuestionmArray] = useState([]);

  const handleQuestionForm = (e) => {
    e.preventDefault();
    const formValues = [
      !!formData.q1Checkbox, // Convert null to false and 'on' to true
      !!formData.q2Checkbox,
      !!formData.q3Checkbox,
      !!formData.q4Checkbox,
      !!formData.q5Checkbox,
      !!formData.q6Checkbox,
      !!formData.q7Checkbox,
      !!formData.q8Checkbox,
      !!formData.q9Checkbox,
      !!formData.q10Checkbox,
      !!formData.q11Checkbox,
      !!formData.q12Checkbox,
    ];
  
    setQuestionmArray(formValues);
  
    // Check if any of the first 7 values are true
    const shouldSeeDoctor = formValues.slice(0, 7).some((value) => value);
    if (shouldSeeDoctor) {
      const seeDoctorMessage = 
      `Based on your responses, it is recommended that, before increasing your physical activity or undergoing a fitness assessment, it is important to consult with your doctor in person. 
      \nInform them about this questionnaire and the first 7 questions you answered "yes" to.\n\nPlease consider the following:\n\n- Start slowly and gradually increase the amount of activity.
      \n\n- Alternatively, focus on engaging in safe activities.\n\n- Discuss your desired activities with your doctor and carefully listen to their advice.`;
      // Convert \n to <br />
      const formattedMessage = seeDoctorMessage.replace(/\n/g, '<br />');
      setDialogOpen(true);
      setResponseMessage(formattedMessage );
    }
  
    setIsQuestionOpen(false);
    console.log(formValues);
  };







  const flipForm = () => {
    setFlipped(!flipped);
  };

  // Define username and password state for register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define formData state for register
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
    e.preventDefault();
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'consentCheckbox' ? checked : value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = ['username', 'password', 'age', 'gender', 'email', 'height', 'level']; // Add the names of all required fields
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




  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        const data = await response.json();
        setResponseMessage(data.message);
        setDialogOpen(true);
        // Set the username in session storage
        sessionStorage.setItem('username', username);
      } else {
        setIsLoggedIn(false);
        throw new Error('Login Failed');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setResponseMessage(error.message);
      setDialogOpen(true);
    }
  };


  return (
    <div className="loginRegisterPage" onMouseMove={changePosition}>
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

                    {/* <label htmlFor="calories">Calories (kcal)</label>
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
                    /> */}

                    <label htmlFor="level"> Activity Level  *</label>

                    <select
                      id="level"
                      name="level"
                      className="login-input"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Training Level</option>
                      <option value="beginner">Sedentary</option>
                      <option value="amateur">Moderately Active</option>
                      <option value="amateur">Very Active</option>
                    </select>
{/* 
                    <label htmlFor="desired_body_part">Desired / Focus Training Body Part </label>
                    <input
                      type="text"
                      id="desired_body_part"
                      name="desired_body_part"
                      placeholder="Desired Body Part"
                      className="login-input"
                      value={formData.desired_body_part}
                      onChange={handleChange}
                    /> */}
                    <button className="openRiskFormButton "  onClick={handleOpenQuestion} onChange={handleChange} required>Answer Risk Evaluation Form</button>

                    {isQuestionOpen && (
                      <form className="questionnaireContainer"onSubmit={(e) => e.preventDefault()} >
                        <button className="closeButton" onClick={handleClose}>
                          <span className="crossIcon">&#10005;</span>
                        </button>
                        <div >
                          <p>Please Complete the below Risk Assessment form. We will evaluate your health condition to provide you the suitable approach to the app.</p>
                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 1: Has your doctor ever said that you have a heart condition and that you should only do physical activity</label>
                          <Checkbox
                            id="q1Checkbox"
                            name="q1Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 2: Do you feel pain in your chest when you do physical activity?</label>
                          <Checkbox
                            id="q1Checkbox"
                            name="q1Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div>
                          <label htmlFor="q2Checkbox" style={{ fontWeight: "lighter", fontSize: "12px", margin: "0px" }}>Question 2: Do you feel pain in your chest when you do physical activity?</label>
                          <Checkbox
                            id="q2Checkbox"
                            name="q2Checkbox"
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>


                        <div>
                          <label htmlFor="q3Checkbox" style={{ fontWeight: "lighter", fontSize: "12px", margin: "0px" }}>Question 3: In the past month, have you had chest pain when you were not doing physical activity?</label>
                          <Checkbox
                            id="q3Checkbox"
                            name="q3Checkbox"
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div>
                          <label htmlFor="q4Checkbox" style={{ fontWeight: "lighter", fontSize: "12px", margin: "0px" }}>Question 4: Do you lose balance because of dizziness or do you ever lose consciousness?</label>
                          <Checkbox
                            id="q4Checkbox"
                            name="q4Checkbox"
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 5: Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a
                            change in your physical activity?</label>
                          <Checkbox
                            id="q5Checkbox"
                            name="q5Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 6: Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition? </label>
                          <Checkbox
                            id="q6Checkbox"
                            name="q6Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 7: Do you know of any other reason why you should not do physical activity? </label>
                          <Checkbox
                            id="q7Checkbox"
                            name="q7Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 8: Have you ever injured your lower back? </label>
                          <Checkbox
                            id="q8Checkbox"
                            name="q8Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 9: Do you have a sedentary lifestyle? </label>
                          <Checkbox
                            id="q9Checkbox"
                            name="q9Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 10: Have you ever trained with a certified fitness instructor? </label>
                          <Checkbox
                            id="q10Checkbox"
                            name="q10Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>

                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 11: Have you ever experienced any injuries or discomfort specifically related to your neck? </label>
                          <Checkbox
                            id="q12Checkbox"
                            name="q12Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div  >

                          <label htmlFor="" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>Question 12: Do you have any concerns or limitations with regards to walking, specifically related to your knees or ankles? Please answer with a simple 'yes' or 'no' </label>
                          <Checkbox
                            id="q1Checkbox"
                            name="q1Checkbox"
                            // checked={formData.consentCheckbox || false}
                            onChange={handleChange}
                            className="questionCheckbox"
                            style={{ color: "white" }}
                          />
                          <br></br>
                          <Button
                            type="submit"
                            onClick={handleQuestionForm}
                            variant="contained"
                            color="primary"
                            sx={{ background: 'none', color: '#42cffe', marginLeft: '85%' }}
                          >
                          Submit
                          </Button>
                        </div>
                      </form>

                    )}
                  </div>
                </div>

                {/* Add other input fields or select options similarly */}
                <Checkbox
                  id="consentCheckbox"
                  name="consentCheckbox"
                  checked={formData.consentCheckbox || false}
                  onChange={handleChange}
                />
                <label htmlFor="consentCheckbox" style={{ "font-weight": "lighter", "font-size": "12px", "margin": "0px" }}>I consent to receiving announcement emails</label>
                <button type="submit" className="register-button" style={{ "margin": "0px" }}>Register</button>
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
                <DialogTitle sx={{ fontWeight: 'bolder' }}>Message</DialogTitle>
                <DialogContent>
                {typeof responseMessage === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: responseMessage }} />
                ) : (
                    <p>An error occurred. Please try again.</p>
                )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogConfirm} variant="contained" color="primary" sx={{ background: 'none', color: '#42cffe' }}>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

          )
          :

          (
            <div className='login-form'>
              <h2 className="login-heading">Welcome to SILFIS</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="login-button">Log In</button>
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
                <DialogTitle sx={{ fontWeight: 'bolder' }}>Login</DialogTitle>
                <DialogContent>
                  {typeof responseMessage === 'string' ? (
                    <p>{responseMessage}</p>
                  ) : (
                    <p>An error occurred. Please try again.</p>
                  )}
                </DialogContent>
                <DialogActions>
                  {isLoggedIn ? (
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" sx={{ background: 'none', color: '#42cffe' }}>
                        Confirm
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={handleDialogConfirm}
                      variant="contained"
                      color="primary"
                      sx={{ background: 'none', color: '#42cffe' }}
                    >
                      Confirm
                    </Button>
                  )}
                </DialogActions>
              </Dialog>


              <div className="login-or">
                <div className="login-line"></div>
                <div className="login-or-text">OR</div>
                <div className="login-line"></div>
              </div>
              <div className="login-options">
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>  <button className="login-option">Log in with Facebook</button></Link>
                <button className="login-option">Forgot Password?</button>
              </div>
            </div>

          )
        }
      </div>
      <div className="login-signup">
        {flipped ? (
          <>Already have an account? <a className="signup-link" onClick={flipForm}>Login</a></>
        ) : (
          <>Don't have an account? <a className="signup-link" onClick={flipForm}>Register</a></>
        )}
      </div>
    </div>


  );
};

export default Login;
