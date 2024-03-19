import React from 'react';
import "./Mediapipe.css"
import { Canvas } from "@react-three/fiber";
import { Exp } from "../Exp";
import { useLocation } from 'react-router-dom';
const Mediapipe = () => {
  const location = useLocation();
  const fbx = location.state?.fbx;
  const cameraHeight = {
    "normal" : 0,
    "shoulderPress" : 5,
    "shoulderPress" : 5
  }
  return (
    <div className="MediaPipePage">
      <div className="MppPageHeader">
            <h1 className="Welcome">Bicep Curl</h1>
            <span className="stroke-text">MediaPipe Pose</span>
            <div className="canvas-container ">
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45}}>

       {/* <color attach="background" args={["#ececec"]} /> */}
      <Exp avatarProp={fbx}></Exp>
    </Canvas>
    
    </div>
        </div>
      <div class="overlayContainer">
        <img id="videoFeed" class ="videoFeed" src="http://127.0.0.1:8000/video_feed_for_curl" />
        <div class="textInfo">Your text info here</div>
      </div>

    
    </div>
  );
};

export default Mediapipe;