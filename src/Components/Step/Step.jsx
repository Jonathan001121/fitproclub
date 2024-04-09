import React, { useState, useEffect }  from 'react'
import image from '../../assets/bicepCurl.jpeg';
import bicepCurlStart from '../../assets/illustrations/bicepCurlStart.jpg';
import bicepCurlEnd from '../../assets/illustrations/bicepCurlEnd.jpg';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent , {timelineOppositeContentClasses,} from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlagIcon from '@mui/icons-material/Flag';
import Typography from '@mui/material/Typography';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircleIcon from '@mui/icons-material/Circle';
import "../Mediapipe/Mediapipe.css"

// import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Step= (props) => {
  const [select, setSelect] = useState(3);
  const [isStart,setisStart]=useState(false);
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  const handleStart = () => {
    setisStart(true);

  }
  const handleStop = () => {
    setisStart(false);

  }

  const  startIllustration  = props.startIllustration;
  const  middleIllustration  = props.middleIllustration;
  const exerciseName = props.exerciseName;
  const exerciseNameFix = exerciseName.replace(/\s+/g, '_').toLowerCase();
  console.log(exerciseNameFix)
  const cid = props.cid ;
  const renderTime = ({ remainingTime }) => {

    if (remainingTime === 0) {
      setIsTimerEnd(true);
    }
  
    return (
  
      <div className="timer-info">
        <div className="timer-text">Remaining</div>
        <div className="timer-value">{remainingTime}</div>
        <div className="timer-text">seconds</div>
      </div>
    );
  };

  const [startColor, setStartColor] = useState('');
  const [middleColor, setMiddleColor] = useState('');
  const [endColor, setEndColor] = useState('');


  const [repValue, setRepValue] = useState(props.count);
  const [setValue, setSetValue] = useState(0);

  useEffect(() => {
    const fetchSetValue = async () => {
      try {
        const username = sessionStorage.getItem('username');
        if (username) {
          const requestBody = {
            username: username
          };
          const response = await axios.post('http://127.0.0.1:9000/getRegisteredCourses', requestBody);
          
          if (response.data && response.data[program] && response.data[program].sub_progress && response.data[program].sub_progress[exerciseNameFix]) {
            console.log(response.data[program].sub_progress[exerciseNameFix]);
            setSetValue(response.data[program].sub_progress[exerciseNameFix]);
          }
        } else {
          console.log('Please Login');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    fetchSetValue();
  }, []);

  
  const postSet = async () => {
    const username = sessionStorage.getItem('username');
    setSetValue(setValue + 1)
    let program;

    switch (cid) {
      case 1:
        program = "Fitness_101";
        break;
      case 2:
        program = "Best_Program_for_Elderly";
        break;
      default:
        program = "";
        break;
    }
    try{
    if (username) {
      const requestBody = {
        username: username,
        program: program,
        [exerciseNameFix]: setValue
      };
      console.log(requestBody)
      const response = await axios.post('http://127.0.0.1:9000/update_progress', requestBody);
   
      // console.log('Response:', response.data);
    }
    else {
      console.log('Please Login');
    }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(()=>{
    setRepValue(props.count % 12);
  },[props.count])


 

useEffect(() => {
  if (props.start == true){
    setStartColor('success')
    handleStart();
  }
  else{
    setStartColor('')
    handleStop();
  }

  if (props.middle == true){
    setMiddleColor('success');
  }
  else{
    setMiddleColor('');
  }
  if (props.end == true){
    setEndColor('success');
  }
  else{
    setEndColor('');
  }
}, [props.start, props.middle, props.end]);







return (
<Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
              <div>
          {/* <p>Count: {count}</p>
          <p>Start: {start ? 'True' : 'False'}</p>
          <p>Middle: {middle ? 'True' : 'False'}</p>
          <p>End: {end ? 'True' : 'False'}</p> */}
   
    </div>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="left"
          variant="body2"
          color="text.secondary"
          flex="0"
        >
          Step1
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FlagIcon color={startColor} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '10px', px: 2 }}>
          <Typography variant="h6" component="span">
            Start
          </Typography>
          <Typography><img src={startIllustration} style={{"width":"50%", "height":"50%"}}/></Typography>
        </TimelineContent>
      </TimelineItem>





      { exerciseName !== "Plank"?
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          Step2
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
          <FlagIcon  color={middleColor}/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '10px', px: 2 }}>
          <Typography variant="h6" component="span">
            Middle
          </Typography>
          <Typography><img src={middleIllustration} style={{"width":"30%", "height":"30%"}}/></Typography>
        </TimelineContent>
      </TimelineItem>
      : null}








      <TimelineItem>
        {exerciseName !== "Plank"?(
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          Step3
        </TimelineOppositeContent>
        ):(
          <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          Step2
        </TimelineOppositeContent>
        )}
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
          <FlagIcon  color={endColor}/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '10px', px: 2 }}>
          <Typography variant="h6" component="span">
            End
          </Typography>
          <Typography><img src={startIllustration} style={{"width":"50%", "height":"80%"}}/></Typography>
        </TimelineContent>
      </TimelineItem>
      {exerciseName !== "Plank"?(
      <Typography variant="h6" component="span">
    Rep Count: 
      <div className="rep-count-container">       

       <p id="repValue"style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"51px"}}>  {repValue}     </p> 

       <p style={{"width":"80%","text-align": "right" ,"margin-right": "30px" ,"color":"white"}}> /12</p>
      </div>
      </Typography>
      ):(      
        <CountdownCircleTimer
        // key={timer}
        isPlaying={isStart}
        duration={select}
        trailColor={[["#dbdbdb"]]}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => [false, 1000]}
        size={380}
        strokeWidth = {50}
        trailStrokeWidth={50}
        className="countdownTimer"
        sx={{"color": "white"}}
      >
        {renderTime}
      </CountdownCircleTimer>)}



      <Typography variant="h6" component="span">
      Set: 
      <div className="rep-count-container">       

       <p id="setValue"style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"51px"}}>     {setValue}    </p> 

       <p style={{"width":"80%","text-align": "right" ,"margin-right": "30px" ,"color":"white"}}> /4</p>
      </div>
      </Typography>
      

      {exerciseName !== "Plank"?(
      <button
        className="startButton"
        style={{ fontSize: "12px", width: "80%" , backgroundColor: props.count < 12 ? 'gray' : 'orange',
        cursor: props.count < 12 ? 'not-allowed' : 'pointer',}}
        disabled={props.count <12} // Disable the button if count is not equal to 12
        onClick={postSet}
      >
           <span>Next Set </span> </button>)
           :
           <button
           className="startButton"
           style={{ fontSize: "12px", width: "80%" , backgroundColor: isTimerEnd==false ? 'gray' : 'orange',
           cursor: isTimerEnd==false ? 'not-allowed' : 'pointer',}}
           disabled={isTimerEnd==false} // Disable the button if count is not equal to 12
           onClick={postSet}
         >
              <span>Next Set </span> </button>
      }
     
 
 

     
    </Timeline>

   




      );
    };

export default Step
