import React from 'react'
import "./Introduction.css"
import mediapipe from '../../assets/mediapipe.png'
import { Link as Route} from "react-router-dom";

const Introduction= (prop) => {
  return (
    <div className="Programs" id="introduction">
        <div className="programs-header">
    
            <span>About</span>
            <span className='stroke-text'>Us</span>
        </div>
        <span className='font' >By leveraging the capabilities of computer vision technology on MediaPipe, the application can provide real-time feedback and guidance, ensuring proper form and technique during exercises. This personalized method targets the particular muscle groups and balance systems that are most crucial for older adults, minimizing the chance of injury and optimizing training efficacy. As a result, the posture estimation application facilitates senior citizens to perform strength and balance exercises in a safe and effective manner, enhancing their general health, independence, and well-being.</span>
        <img className="demo" src={mediapipe} alt="loading..." />
        <div className="programs-categories">
        </div>
    </div>

  )
}

export default Introduction
