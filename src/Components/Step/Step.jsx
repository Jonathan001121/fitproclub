import React, { useState, useEffect }  from 'react'
import image from '../../assets/bicepCurl.jpeg';
import bicepCurlStart from '../../assets/bicepCurlStart.jpg';
import bicepCurlEnd from '../../assets/bicepCurlEnd.jpg';
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

// import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Step= () => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [middle, setMiddle] = useState(false);
  const [end, setEnd] = useState(false);
  const [startColor, setStartColor] = useState('');
  const [middleColor, setMiddleColor] = useState('');
  const [endColor, setEndColor] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/data');
        const { count, start, middle, end } = response.data;
        console.log(response.data)
        setCount(count);
        setStart(start);
        setMiddle(middle);
        setEnd(end);

        if (start == true){
          setStartColor('success')
        }
        else{
          setStartColor('')
        }

        if (middle == true){
          setMiddleColor('success');
        }
        else{
          setMiddleColor('');
        }
        if (end == true){
          setEndColor('success');
        }
        else{
          setEndColor('');
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 500); // FPS on frontend

    return () => {
      clearInterval(interval);
    };
  }, []);








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
          <Typography><img src={bicepCurlStart} style={{"width":"30%", "height":"30%"}}/></Typography>
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
          <Typography><img src={bicepCurlEnd} style={{"width":"30%", "height":"30%"}}/></Typography>
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
          <Typography><img src={bicepCurlEnd} style={{"width":"30%", "height":"30%"}}/></Typography>
        </TimelineContent>
      </TimelineItem>
      <Typography variant="h6" component="span">
      Count: 
      <div className="count-container">        <p style={{"margin-left": "6px" , "color":"rgb(64, 240, 74)"}}>  {count} </p>  &nbsp; /12</div>
          </Typography>
     
 
 

     
    </Timeline>

   















      );
    };

export default Step
