import React, { useState } from "react";
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
      <div className="bar-back">
        <div className="bar">
        {showDialog && (

            <div className="dialog-box" style={{ width: `${width}%`}}>
            {width}%
            </div>

        )}
        <div className="progress-bar">
            <span className="css" style={{ width: `${width}%` }}></span>
        </div>
        </div>
      </div>
     
    </div>
  );
};

export default ProgressBar;