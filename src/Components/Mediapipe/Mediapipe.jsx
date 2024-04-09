import React, { useState, useEffect, useRef } from 'react';
import "./Mediapipe.css"
import { Canvas } from "@react-three/fiber";
import { Exp } from "../Exp";
import { useLocation } from 'react-router-dom';
import Step from "../Step/Step"
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { Alert, AlertTitle , Collapse} from '@mui/material';
import ExerciseDialog from '../ExerciseDialog/ExerciseDialog';
import useCursor from "../elderly_cursor";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Margin } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Speech from 'react-speech';
import { useSpeech } from "react-text-to-speech";
const Mediapipe = () => {
  const [count, setCount] = useState(0);
  const [startf, setStart] = useState(false);
  const [middle, setMiddle] = useState(false);
  const [end, setEnd] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const speechButtonRef = useRef(null);

  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
    start
  } = useSpeech({ text: errorMessages });

  useEffect(() => {
    if (errorMessages !== '') {

      if (speechButtonRef.current) {
        speechButtonRef.current.click();
        console.log("clicked")
      }
    }
  }, [errorMessages]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/data');
        const { count, start, middle, end, errorMessages} = response.data;
        // console.log(response.data)
        setCount(count);
        setStart(start);
        setMiddle(middle);
        setEnd(end);
        setErrorMessages(errorMessages);

       
        
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 500); // FPS on frontend

    return () => {
      clearInterval(interval);
    };
  }, []);







  const [showImage, setShowImage] = useState(false);
  const [select, setSelect] = useState(10);
  const [isStart,setisStart]=useState(false);
  const [timer, setTimer] = React.useState(0);

  const startTimer = () => {
    
    setTimeout(() => {
      setShowImage(true);
    }, 10000);

  };
  const handleStart = () => {
    setisStart(true);
    startTimer();

  }
const renderTime = ({ remainingTime }) => {

  if (remainingTime === 0) {
    setShowImage(true);
    
  }

  return (

    <div className="timer-info">
      <div className="timer-text">Remaining</div>
      <div className="timer-value">{remainingTime}</div>
      <div className="timer-text">seconds</div>
    </div>
  );
};
     // cursor
  const { cursor, changePosition } = useCursor();
   
  const location = useLocation();
  const fbx = location.state?.fbx;
  const exerciseName = location.state?.exerciseName;
  const startIllustration = location.state?.startIllustration;
  const middleIllustration = location.state?.middleIllustration;
  const cid = location.state?.cid;


  const [path, setPath] = useState('');
  const [zAxis, setZAxis] = useState(3);
  const num = location.state?.num;
  // console.log(num);
  useEffect(() => {
    // const path= exerciseName.toLowerCase().replace(/\s/g, '');
    setPath(exerciseName.toLowerCase().replace(/\s/g, ''));
  },[path]);

  return (
    <div className="MediaPipePage" onMouseMove={changePosition}>
    <div className="cursor-style" ref={cursor}></div>
     
      <div className="MppPageLeft">

        <h1 className="Welcome">{exerciseName}</h1>

        <span className="stroke-text">MediaPipe Pose</span>
        <div className="canvas-container ">
          <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
            <Exp avatarProp={fbx}></Exp>
          </Canvas>
          <div className="character-control-panel">

          <Slider
            defaultValue={3}
            value={zAxis}
            onChange={(event, newValue) => setZAxis(newValue)}
            min={0}
            max={10}
            step={0.1}
            sx={{
              width: 260,
              color: 'lightgreen',
            }}
          /></div>
        </div>
      </div>



      <div className="MppPageMiddle">
        <div className="alertPanel">
          <Alert severity='error'>
              <AlertTitle>Alert</AlertTitle>
              <div style={{"display":"flex", "flex-direction":"row","justify-content":"space-between","width":"100%", "margin-left": "0"}}  > 
              <p>  {errorMessages}</p>
              <button ref={speechButtonRef} onClick={start}/>
              <ExerciseDialog num={num} />
              </div>
          </Alert>
        </div>
    {
      // console.log(isStart)
    }
        <div className="MainPartMMP">
          {showImage ? (
            <div className="videoFeed">
              <img id="videoFeed" src={`http://127.0.0.1:8000/${path}`} />
            </div>
          ) : (
            <div className="countDownField">
            {isStart && <h1 className="ready-prompt">GET READY !</h1>}
            {isStart ? (
          
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
              </CountdownCircleTimer>
            ) : (

              <button className="startButton" onClick={handleStart}>
            <span>Start  </span>
              </button>
            )}
          </div>
          
          )}
        </div>
      </div>
        

   

        <div class="overlayContainer">
        <div class="textInfo">
        <Step cid={cid} exerciseName={exerciseName}count={count} start={startf} middle={middle} end={end} startIllustration={startIllustration} middleIllustration={middleIllustration}  />
        </div>
        </div>

       
   

    </div>
  );
};

export default Mediapipe;