import React, { useState, useEffect } from 'react';
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
const Mediapipe = () => {
  const [showImage, setShowImage] = useState(false);
  const [select, setSelect] = useState(10);
  const [isStart,setisStart]=useState(false);
  const [timer, setTimer] = React.useState(0);

  const startTimer = () => {
    
    setTimeout(() => {
      setShowImage(true);
    }, 1000);

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
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};
     // cursor
  const { cursor, changePosition } = useCursor();
   
  const location = useLocation();
  const fbx = location.state?.fbx;
  const exerciseName = location.state?.exerciseName;
  const [path, setPath] = useState('');
  const [zAxis, setZAxis] = useState(3);
  const num = location.state?.num;
  console.log(num);
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
              <AlertTitle > Alert</AlertTitle>
              <div style={{"display":"flex", "flex-direction":"row","justify-content":"space-between","width":"100%", "margin-left": "0"}}  > 
              <p>  No Error Detected</p>
              <ExerciseDialog num={num} />
              </div>
          </Alert>
        </div>
    {
      console.log(isStart)
    }
        <div className="MainPartMMP">
          {showImage ? (
            <div className="videoFeed">
              <img id="videoFeed" src={`http://127.0.0.1:8000/${path}`} />
            </div>
          ) : (
            <div className="countDownField">
            {isStart ? (
              <CountdownCircleTimer
                key={timer}
                isPlaying={isStart}
                duration={select}
                colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                onComplete={() => [false, 1000]}
                size={380}
                className="countdownTimer"
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
        <Step />
        </div>
        </div>
       
   

    </div>
  );
};

export default Mediapipe;