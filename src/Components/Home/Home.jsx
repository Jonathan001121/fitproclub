import React from 'react';

import Xavier from "../../assets/Xavier.jpeg"
import bmi from  "../../assets/icons/bmi.png"
import increase from  "../../assets/icons/increase.png"
import 'charts.css'
import "./Home.css"
import { Canvas } from "@react-three/fiber";
import { Exp } from "../Exp";


import Navnode from '../Navnode/Navnode'; 
//https://www.youtube.com/watch?v=pGMKIyALcK0&t=885s&ab_channel=WawaSensei

const Home = () => {
  return (
    <div className="home">
         <div className="HomepageHeader">
            <h1 className="Welcome">Welcome Back To</h1>
            <span className="stroke-text">SILVIS</span>
          </div>
          <div className="canvas-container ">
       {/*  x: The horizontal position of the camera. 
            y: The vertical position of the camera. 
            z: The depth position of the camera. 
            The fov Field of View parameter represents the extent of the observable world 
            that is seen at any given moment. 
            It is specified in degrees and determines how "zoomed in" or "zoomed out" the camera's view is. A higher fov value results in a wider field of view, making objects appear smaller and further away, while a lower fov value results in a narrower field of view,*/}

               <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
               {/* <color attach="background" args={["#ececec"]} /> */}
               <Exp avatarProp={"animations/row.fbx"}></Exp>
            </Canvas>
            </div>


 <Navnode />
    </div>

    );
};

export default Home;