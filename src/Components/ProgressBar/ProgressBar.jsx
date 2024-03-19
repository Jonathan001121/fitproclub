import React, { useState } from "react";
import { Tooltip } from '@mui/material';
import "./ProgressBar.css";

const ProgressBar = ({ width }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    setShowDialog(true);
  };

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setShowDialog(false);
  };
  

  return (
    <div
      className="ProgressBar"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
  
  <Tooltip title={`${width * 100}%`} followCursor>

  <div className="bar-back">
        <div className="bar">
      
            <div className="progress-bar">
                <span className="css" style={{ width: `${width*100}%` }}></span>
            </div>
        </div>
      </div>

   </Tooltip>
   
     
    </div>
  );
};

export default ProgressBar;