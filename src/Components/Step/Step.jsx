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
import CircleIcon from '@mui/icons-material/Circle';
import "../Mediapipe/Mediapipe.css"

// import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Step= (props) => {
  const  startIllustration  = props.startIllustration;
  const  middleIllustration  = props.middleIllustration;
  

  const [startColor, setStartColor] = useState('');
  const [middleColor, setMiddleColor] = useState('');
  const [endColor, setEndColor] = useState('');


useEffect(() => {
  if (props.start == true){
    setStartColor('success')
  }
  else{
    setStartColor('')
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
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          Step3
        </TimelineOppositeContent>
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
      <Typography variant="h6" component="span">
      Rep Count: 
      <div className="rep-count-container">       
<<<<<<< HEAD
       <p style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"51px"}}>  {props.count}      </p> 
=======
       <p style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"31px"}}>  {count}      </p> 
>>>>>>> f717ba84e11c398340e019db60934668b4fccae0
       <p style={{"width":"80%","text-align": "right" ,"margin-right": "30px" ,"color":"white"}}> /12</p>
      </div>
      </Typography>

      <Typography variant="h6" component="span">
      Set: 
      <div className="rep-count-container">       
<<<<<<< HEAD
       <p style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"51px"}}>  {props.count}      </p> 
=======
       <p style={{"font-size": "50px" ,"text-align": "center" ,"padding": "0px" ,"margin": "0px","color":"rgb(64, 240, 74)","height":"31px"}}>  {count}      </p> 
>>>>>>> f717ba84e11c398340e019db60934668b4fccae0
       <p style={{"width":"80%","text-align": "right" ,"margin-right": "30px" ,"color":"white"}}> /4</p>
      </div>
      </Typography>

      <button
        className="startButton"
        style={{ fontSize: "12px", width: "80%" , backgroundColor: props.count < 12 ? 'gray' : 'orange',
        cursor: props.count < 12 ? 'not-allowed' : 'pointer',}}
        disabled={props.count <12} // Disable the button if count is not equal to 12
      >
           <span>Next Set </span> </button>
     
 
 

     
    </Timeline>

   















      );
    };

export default Step
