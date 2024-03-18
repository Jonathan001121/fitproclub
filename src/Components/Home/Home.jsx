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
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45}}>

       {/* <color attach="background" args={["#ececec"]} /> */}
       <Exp avatarProp={"animations/BackSquat.fbx"}></Exp>
    </Canvas>
    
    </div>
    <div className="homepageFoot">
      
    </div>

 <Navnode />
    </div>

    );
};

export default Home;