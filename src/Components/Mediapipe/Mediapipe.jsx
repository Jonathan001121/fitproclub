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

const Mediapipe = () => {


  const location = useLocation();
  const fbx = location.state?.fbx;
  const exerciseName = location.state?.exerciseName;


  const [zAxis, setZAxis] = useState(3);
  const [camera, setCamera] = useState({ position: [0, 0, zAxis], fov: 45 });





  useEffect(() => {
    // Update the camera prop with the new z-axis value
    const updatedCamera = { position: [0, 0, zAxis], fov: 45 };
    // Update the camera prop in the Canvas component
    setCamera(updatedCamera);
    console.log("Latest z-axis value:", zAxis);
  }, [zAxis]);

  return (
    <div className="MediaPipePage">
  
     
      <div className="MppPageHeader">
      {/* <Alert style ={{"display": "block"}}severity='error'>
          <AlertTitle> Warning</AlertTitle>
          This is the warning.
        </Alert> */}
        <h1 className="Welcome">{exerciseName}</h1>
        <span className="stroke-text">MediaPipe Pose</span>
        <div className="canvas-container ">
          <Canvas shadows camera={camera}>
            <Exp avatarProp={fbx}></Exp>
          </Canvas>
          <div className="character-control-panel">
          <ExerciseDialog />
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

      <div class="overlayContainer">
   
        <img id="videoFeed" class="videoFeed" src="http://127.0.0.1:8000/video_feed_for_curl" />
   
        <div class="textInfo">
   
          <Step />
  
    

        </div>
   
    </div>
    </div>
  );
};

export default Mediapipe;