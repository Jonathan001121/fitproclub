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
  const [path, setPath] = useState('');
  const [zAxis, setZAxis] = useState(3);

  useEffect(() => {
    // const path= exerciseName.toLowerCase().replace(/\s/g, '');
    setPath(exerciseName.toLowerCase().replace(/\s/g, ''));
  },[path]);

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
          <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
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
   
        <img id="videoFeed" class="videoFeed" src={`http://127.0.0.1:8000/${path}`} />
   
        <div class="textInfo">
   
          <Step />
  
    

        </div>
   
    </div>
    </div>
  );
};

export default Mediapipe;