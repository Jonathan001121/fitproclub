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
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
       {/* <color attach="background" args={["#ececec"]} /> */}
      <Exp></Exp>
    </Canvas>
 
        </div>

    );
};

export default Home;