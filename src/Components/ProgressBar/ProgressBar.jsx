import React, { useState } from "react";
import "./ProgressBar.css";




const ProgressBar = () => {
    return (
        <div className="ProgressBar">
            <div className="bar-back">
            <div className="bar">
                <div className="progress-bar">
                    <span className="css"style={{ "width": "75%"}} ></span>
                </div>  
            </div>
    </div>
    </div>
    );
  };
  
  export default ProgressBar;
