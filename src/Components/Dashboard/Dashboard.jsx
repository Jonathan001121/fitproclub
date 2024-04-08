// ----------------Images ---------------------
import Xavier from "../../assets/Xavier.jpeg"
import bmi from "../../assets/icons/bmi.png"
import calories from "../../assets/icons/calories.png"
import increase from "../../assets/icons/increase.png"
import user from "../../assets/icons/user.png"
import age from "../../assets/icons/age.png"
import location from "../../assets/icons/location.png"
import email from "../../assets/icons/email.png"
import muscle from "../../assets/icons/muscle.png"
import weight from "../../assets/icons/weight.png"
import coin from "../../assets/icons/coin.png"
import body_fat from "../../assets/icons/body_fat.png"
import bloodPressure from "../../assets/icons/blood-pressure.png"
import greenWifi from "../../assets/icons/green_wifi.png"
import blackWifi from "../../assets/icons/black_wifi1.png"
import blankUser from "../../assets/blankUser.png"
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';

// ----------------------------------------

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './Dashboard.css';
import 'charts.css'
import Navnode from '../Navnode/Navnode';
import ProgressBar from '../ProgressBar/ProgressBar';
import axios from 'axios';
import useCursor from "../elderly_cursor";

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { color } from "framer-motion";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Box } from '@mui/material';



const Dashboard = () => {
  const [userInventory, setUserInventory] = useState(null);
  const [userRegisterCourses, setRegisterCourses] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { cursor, changePosition } = useCursor();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [fieldToUpdate, setFieldToUpdate] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');



  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://127.0.0.1:9000/pingFlask');
        if (response.status === 200) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    const fetchUserInventory = async () => {
      try {
        const username = sessionStorage.getItem('username')
        if (username) {
          const response = await axios.post('http://127.0.0.1:9000/getInventory', {
            username: username
          });
          setUserInventory(response.data);
        } else {
          // username not here
          setUserInventory({
            "age": "00000",
            "body_fat_mass": "00000",
            "calories": "000",
            "city": "Manchester",
            "country": "England",
            "gender": "Non-Binary",
            "heart_rate": "00000",
            "height": "00000",
            "muscle_mass": "00000",
            "name": "displayUserName",
            "username": "displayUserName",
            "weight": "00000",
            "desired_body_part" : "NONE",
            "email" : "NONE",
            "level" : "NONE"

          });
        }
      } catch (error) {
        // can't get Inventory
        console.log(error);
        setUserInventory({
          "age": "00000",
          "body_fat_mass": "00000",
          "calories": "000",
          "city": "Manchester",
          "country": "England",
          "gender": "Non-Binary",
          "heart_rate": "00000",
          "height": "00000",
          "muscle_mass": "00000",
          "name": "displayUserName",
          "username": "displayUserName",
          "weight": "00000",
          "desired_body_part" : "NONE",
          "email" : "NONE",
          "level" : "NONE"
        })
      }
    };

    fetchUserInventory();
  }, []);


  useEffect(() => {
    const fetchRegisterCourses = async () => {
      try {
        const username = sessionStorage.getItem('username')
        if (username) {
          const response = await axios.post('http://localhost:9000/getRegisteredCourses', {
            username: username // Replace with the login username later
          });
          setRegisterCourses(response.data);
        }
        else {
          setRegisterCourses({
            "Best_Program_for_Elderly": {
              "overall": 0.0
            },
            "Fitness_101": {
              "overall": 0.0
            }
          })
        }
      } catch (error) {
        console.log(error);
        setRegisterCourses({
          "Best_Program_for_Elderly": {
            "overall": 0.0
          },
          "Fitness_101": {
            "overall": 0.0
          }
        })
      }
    };

    fetchRegisterCourses();
  }, []);

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const username = sessionStorage.getItem('username')
        if (username) {
          const response = await fetch('http://localhost:9000/getDailyCaloriesBurnt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username }) // Replace 'your-username' with the actual username
          });
        }

        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        const caloriesBurntToday = data.calories_burnt_today;

      } catch (error) {
        console.error(error);
      }
    };

    fetchCalories();
  }, []);

  const handleLogout = () => {
    // Clear the username from session storage
    sessionStorage.removeItem('username');
  };
  const handleEdit = () => {
    const editPrompt = "Select the field you want to select and confirm."
    setDialogOpen(true);
    setResponseMessage(editPrompt);
  };

  const handleEditConfirm = ()=>{
    const username = sessionStorage.getItem('username')
   // Prepare the data to be sent in the request body
   const data = {
    username: username, // Replace with the actual username
    [fieldToUpdate]: newFieldValue
  };

  // Send a POST request to the API endpoint
  axios.post('http://127.0.0.1:9000/updateInventoryAttr', data)
    .then(response => {
      // Handle the successful response
      setDialogOpen(true);
      setResponseMessage(response.data.message);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      setDialogOpen(true);
      setResponseMessage('An error occurred. Please try again.');
    });

  };



  return (
    <div className="dashboard" onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor} ></div>
      <Navnode />
      <div className="left">
        <div className="container large">
          <div className="row-1">
            <div className="connection" >
              {isConnected ? (
                <div className="connected-text" >
                  <img src={greenWifi}></img>
                  <p> Connected</p>
                </div>
              ) : (
                <div className="disconnected-text" >    <img src={blackWifi}></img>
                  <p> Disconnected</p></div>
              )}
            </div>
            <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
              <EditNoteIcon style={{ color: 'white', width: '130%' }} onClick={handleEdit} />
            </div>

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
              <DialogTitle sx={{ fontWeight: 'bolder' }}>Update Profile</DialogTitle>
              <DialogContent>
                {typeof responseMessage === 'string' ? (
                  <p>{responseMessage}</p>
                ) : (
                  <p>An error occurred. Please try again.</p>
                )}

              </DialogContent>
              <Box
                noValidate
                component="form"
                onSubmit={handleEditConfirm}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <FormControl
                  sx={{
                    mt: 2,
                    minWidth: 120,
                    borderColor: 'rgba(19, 146, 209, 0.8)', // Add custom styling for the border
                    borderWidth: '2px', // Add custom styling for the border
                    borderStyle: 'solid', // Add custom styling for the border
                    borderRadius: '4px', // Add custom styling for the border
                    // backgroundColor: 'white', // Set the background color to white
                  }}
                >
                  <InputLabel htmlFor="max-width" sx={{ 
                    color: 'gray' ,
                    fontWeight: 'lighter',
                    fontSize : '14px',
                    paddingTop: '0px',
                    
                    // after clicked on the Select Box , the Input label style: 
                    '&.Mui-focused': {  
                      color: 'white',
            
                    },
                
                    }}>Field to be updated
                    </InputLabel>
                  <Select
                    autoFocus
                    onChange={(event) => setFieldToUpdate(event.target.value)}
                    label="fieldToUpdate"
                    inputProps={{
                      name: 'field-to-update',
                      id: 'field-to-update',
               
                    }}
                    value={fieldToUpdate}
                   
                    sx={{
                      '&:focus': {
                        backgroundColor: 'transparent', // Override the focus background color
                  
                      },
                      '& .MuiSelect-icon': {
                        color: 'white', // Set the color of the select icon
                      },
                      '& .MuiSelect-select': {
                    
                        color: 'gray', // Set the text color for the selected option
                      },
                      '& .MuiSelect-select:focus': {
                        backgroundColor: 'transparent', // Override the focus background color for the selected option
                        color: 'white', // Set the text color for the selected option
                      },
                    }}
                    MenuProps={{
                  
                      getContentAnchorEl: null,
                      // The menu style after expand: 
                      PaperProps: {
                        style: {
                          backgroundColor: 'rgba(10, 10, 10, 0.8)',
                          color: 'white',
                          fontWeight: 'lighter',
                        },
                      },
                    }}
                  >
                  <MenuItem value="age">Age</MenuItem>
                  <MenuItem value="muscle_mass">Muscle Mass</MenuItem>
                  <MenuItem value="body_fat_mass">Body Fat Mass</MenuItem>
                  <MenuItem value="height">Height</MenuItem>
                  <MenuItem value="weight">Weight</MenuItem>
                  <MenuItem value="email">Email Address</MenuItem>
                  <MenuItem value="country">Country</MenuItem>
                  <MenuItem value="city">City</MenuItem>
                  {/* <MenuItem value="desired_body_part">Body Part</MenuItem> */}


                  </Select>
                </FormControl>

                {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            /> */}

                <TextField
                  required
                  margin="dense"
                  id="newFieldValue"
                  name="newFieldValue"
                  label="New Field Value"
                  type="text"
                  fullWidth
                  variant="standard"
                  value ={newFieldValue}
                  onChange={(event) => setNewFieldValue(event.target.value)}
                  sx={{
                    mt: 2,
                    minWidth: 120,
                    borderColor: 'rgba(19, 146, 209, 0.8)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderRadius: '4px',

                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'rgba(255, 255, 255, 0.8)', // Set the color to match the border color
                      paddingLeft: '10px',
                      fontSize : '12px'
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: 'white', // Set the text color to white
                      paddingLeft: '10px',
                    },
                  }}
                />
                 
              <Button 
                type="submit"
                onClick={() => setDialogOpen(false)} 
                variant="contained" 
                color="primary" 
                sx={{ background: 'none', color: '#42cffe' }}>
                  Confirm
                </Button>
   
              </Box>
      
             
         
            </Dialog>

            <div style={{ "margin-left": 'auto' }}>
              <Link to="/login" onClick={handleLogout}>
                <LogoutIcon style={{ color: 'white', "width": "100%" }} />
              </Link>
            </div>
          </div>
          <div className="profile">

            <div className="icon-part">
              <div className="icon"><img src={blankUser}></img> </div>

              <div className="name&id">
                <div className="name" >
                  {userInventory?.username || '---'} </div>
                <br></br>
                {/* <div className="userId">topadmin</div> */}
                <div className="userId" style={{ color: userInventory ? '#f59425' : 'gray' }}>
                  {userInventory?.username || '---'}</div>
              </div>
            </div>


            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <img src={user}></img>
              </span>
              <p>  {userInventory ? userInventory.gender : '---'}</p>
            </div>

            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <img src={age}></img>
              </span>
              <p>{userInventory ? userInventory.age : '---'}</p> <p style={{ "color": "gray" }}>yrs old</p>
            </div>

            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <svg width="25" height="25" viewBox="0 0 49 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4293 32.3789L15.7991 37.3712C16.0015 40.1028 18.0786 42.4886 21.0006 42.7836C22.1183 42.8964 23.5283 42.9998 24.965 42.9998C26.4018 42.9998 27.8117 42.8964 28.9294 42.7836C31.8514 42.4886 33.9286 40.1028 34.1309 37.3712L34.5007 32.3791C35.8305 32.6449 37.0613 32.9656 38.1668 33.3341C39.8828 33.9061 41.3797 34.6203 42.4784 35.4862C43.5602 36.3387 44.4645 37.5147 44.4645 38.9998C44.4645 40.4848 43.5602 41.6608 42.4784 42.5134C41.3797 43.3792 39.8828 44.0934 38.1668 44.6654C34.719 45.8147 30.0514 46.4998 24.9645 46.4998C19.8776 46.4998 15.21 45.8147 11.7622 44.6654C10.0462 44.0934 8.54933 43.3792 7.45061 42.5134C6.3688 41.6608 5.46454 40.4848 5.46454 38.9998C5.46454 37.5147 6.3688 36.3387 7.45061 35.4862C8.54933 34.6203 10.0462 33.9061 11.7622 33.3341C12.8679 32.9655 14.0991 32.6447 15.4293 32.3789Z" fill="#2859C5"></path>
                  <path d="M24.9645 15C28.5544 15 31.4645 12.0899 31.4645 8.5C31.4645 4.91015 28.5544 2 24.9645 2C21.3747 2 18.4645 4.91015 18.4645 8.5C18.4645 12.0899 21.3747 15 24.9645 15Z" fill="#8FBFFA"></path><path d="M24.9644 16.5C22.1819 16.5 20.1459 16.5804 18.7581 16.6672C17.1069 16.7706 15.6396 17.7188 14.9478 19.2466C14.2692 20.7452 13.4247 22.9489 12.8973 25.5542C12.499 27.5217 14.0247 29.2238 15.9615 29.3079C16.4873 29.3308 17.0732 29.354 17.7129 29.3759L18.2915 37.1868C18.4104 38.7916 19.6171 40.1315 21.2509 40.2964C21.5727 40.3289 21.9172 40.3603 22.2776 40.3883C23.1179 40.4535 23.8244 39.8044 23.8657 38.979L24.1659 32.975C24.1792 32.7089 24.3988 32.5 24.6653 32.5H25.2628C25.5292 32.5 25.7489 32.7089 25.7622 32.975L26.0624 38.9791C26.1036 39.8044 26.8102 40.4535 27.6504 40.3883C28.011 40.3603 28.3556 40.3289 28.6776 40.2964C30.3114 40.1315 31.5181 38.7916 31.637 37.1868L32.2155 29.3759C32.8551 29.354 33.441 29.3308 33.9666 29.3079C35.9034 29.2238 37.4291 27.5217 37.0308 25.5542C36.5034 22.9488 35.6588 20.745 34.9803 19.2465C34.2885 17.7187 32.8212 16.7706 31.1702 16.6672C29.7825 16.5804 27.7468 16.5 24.9644 16.5Z" fill="#8FBFFA"></path>
                </svg>
              </span>
              <p>Height:</p>  <p>{userInventory ? userInventory.height : '---'}</p> <p style={{ "color": "gray" }}>cm</p>
            </div>
            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <img src={weight}></img>
              </span>
              <p>Weight:</p>  <p>{userInventory ? userInventory.weight : '---'}</p> <p style={{ "color": "gray" }}>kg</p>
            </div>


            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <img src={location}></img>
              </span>
              <p>{userInventory ? userInventory.city : '---'}, {userInventory ? userInventory.country : '---'}</p>
            </div>
            <div className="info">
              <span width="1.5rem" className="sc-kFCroH keqUiL">
                <img src={email}></img>
              </span>
              <p>{userInventory ? userInventory.email : '---'}</p>
            </div>


          </div>
        </div>
      </div>
      <div className="right">
        <div className="row-1">


          <div className="container small">
            <img src={bloodPressure}></img>
            <div className="metric-text">
              <p className="bmi-label">Avg.Heart Rate</p>
              <div className="bmi-value">
                <p>{userInventory ? userInventory.heart_rate : '---'}</p>
                <p style={{ "color": "gray" }}> &nbsp; bpm </p>
                <img src={increase}></img>
              </div>
            </div>
          </div>

          <div className="container small">


            <div className="metric-text">
              <img src={calories}></img>
              <p className="bmi-label">Calories Burnt Today (kcal)</p>
              <div className="bmi-value">
                {/* <img src={increase}></img> */}
              </div>
            </div>

            <Gauge
              value={userInventory ? userInventory.calories : 0}
              startAngle={-110}
              endAngle={110}
              fill="white"
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 10,
                  transform: 'translate(0px, 0px)',
                  fill: 'white',
                },
                [`&  .${gaugeClasses.valueText} text`]: {
                  fill: '#52b202', // Set the color for .css-168bhqd-MuiGauge-container text
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#52b202',
                },

              }}
              text={({ value }) => `${value}` + "/ 500"}
            />

          </div>

          <div className="container small">
            <img src={muscle}></img>
            <div className="metric-text">
              <p className="bmi-label">Muscle Mass</p>
              <div className="bmi-value">
                <p style={{ "color": "lightgreen" }}> {userInventory ? userInventory.muscle_mass : '---'} </p>
                <p style={{ "color": "gray" }}>&nbsp; KG </p>
                <p > &nbsp; </p>
                <img src={increase}></img>
                <p style={{ "color": "lightgreen" }}> &nbsp;6% </p>
              </div>
            </div>
          </div>

          <div className="container small">
            <img src={body_fat}></img>
            <div className="metric-text">
              <p className="bmi-label">Body Fat Mass</p>
              <div className="bmi-value">
                <p style={{ "color": "lightgreen" }}> {userInventory ? userInventory.body_fat_mass : '---'} </p>
                <p style={{ "color": "gray" }}>&nbsp; KG </p>
                <img src={increase}></img>
                <p style={{ "color": "lightgreen" }}> 15% </p>
              </div>
            </div>
          </div>




        </div>

        <div className="row-2">
          <div className="container medium">
            <h3>Activity</h3>
            <div id="animations-example-3">
              <table className="charts-css column show-labels hide-data data-spacing-5 show-primary-axis">
                <caption> barchart animation </caption>
                <thead>
                  <tr>
                    <th > Year </th>
                    <th scope="col">  </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row"> MON </th>
                    <td style={{ "--size": 0.8 }}>
                      <span className="data"> 30 </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"> TUE </th>
                    <td style={{ "--size": 0.6 }}>
                      <span className="data"> 100 </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"> WED </th>
                    <td style={{ "--size": 0.8 }}>
                      <span className="data"> 80 </span>
                    </td>
                  </tr>
                  <tr>

                    <th scope="row"> THU </th>
                    <td style={{ "--size": 0.34 }}>
                      <span className="data"> 34 </span>
                    </td>

                  </tr>

                  <tr>
                    <th scope="row"> FRI </th>
                    <td style={{ "--size": 0.2 }}>
                      <span className="data"> 20 </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"> SAT </th>
                    <td style={{ "--size": 0.7 }}>
                      <span className="data"> 70 </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"> SUN </th>
                    <td style={{ "--size": 0.9 }}>
                      <span className="data"> 90 </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
          <div className="container medium">
            <h3>Learning Progress</h3>

            <div className='program-progress'>
              <div className='its-program'>  Fitness 101 </div>
              <div className='its-progress'>  <ProgressBar width={userRegisterCourses ? userRegisterCourses.Fitness_101.overall : 0.0} /> </div>
            </div>

            <div className='program-progress'>
              <div className='its-program'>  Best Program for Elderly </div>
              <div className='its-progress'> <ProgressBar width={userRegisterCourses ? userRegisterCourses.Best_Program_for_Elderly.overall : 0.0} /> </div>
            </div>




          </div>
          <div className="container medium">
            <h3>Recommended Courses for You </h3>

            <div className='program-progress'>
              <p> 1. </p>
              <div className='its-program'>  Fitness 101 </div>
              {/* <div className='its-progress'>  <ProgressBar width={userRegisterCourses ? userRegisterCourses.Fitness_101.overall : 0.0} /> </div> */}
            </div>

            <div className='program-progress'>
              <p> 2. </p>
              <div className='its-program'>  Best Program for Elderly </div>
              {/* <div className='its-progress'> <ProgressBar width={userRegisterCourses ? userRegisterCourses.Best_Program_for_Elderly.overall : 0.0} /> </div> */}
            </div>




          </div>
        </div>
        <div className="row-3">
          <div className="container long">
            <h3>Metrics Trend</h3>
            <div id="stock-chart-example-2">

              <table className="charts-css area">
                <caption> WorkRate </caption>
                <tbody>
                  <tr><td></td></tr>
                  <tr><td style={{ "--start": 0.3, "--size": 0.4 }}></td></tr>
                  <tr><td style={{ "--start": 0.4, "--size": 0.8 }}></td></tr>
                  <tr><td style={{ "--start": 0.4, "--size": 0.8 }}></td></tr>
                  <tr><td style={{ "--start": 0.8, "--size": 0.3 }}></td></tr>
                  <tr><td style={{ "--start": 0.4, "--size": 0.8 }}></td></tr>
                  <tr><td style={{ "--start": 0.4, "--size": 0.8 }}></td></tr>
                </tbody>
              </table>

              <table className="charts-css line">
                <caption> Body Weight Trend Line </caption>

                <tbody>
                  <tr><td style={{ "--start": 0.2, "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--start": 0.6, "--size": 0.8 }}></td></tr>
                  <tr><td style={{ "--start": 0.8, "--size": 0.5 }}></td></tr>
                  <tr><td style={{ "--start": 0.5, "--size": 0.8 }}></td></tr>
                </tbody>

              </table>


              <table className="charts-css column data-spacing-2">
                <caption> Progress </caption>
                <tbody>
                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>

                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>

                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.9 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>
                  <tr><td style={{ "--size": 0.6 }}></td></tr>

                  {/* The 31st day */}
                  <tr><td style={{ "--size": 0.9 }}></td></tr>

                </tbody>
              </table>
              <div className="primary-axis">Exercises Time Duration </div>
              <div className="data-1-axis"> Calories Burnt (Daily)</div>
              <div className="data-2-axis"> Distances  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;