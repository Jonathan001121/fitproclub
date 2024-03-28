import React, { useEffect } from 'react';

const CardioGame = () => {
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = './script.js';
    scriptElement.async = true;
  
    document.body.appendChild(scriptElement);
  
    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);

  return (
    <div className="CardioGame">
      <div className="gamedirectory-header">
        <span>Cardio </span>
        <span className="stroke-text">Game</span>
      </div>
      <div id="unity-container" className="unity-desktop">
        <canvas id="unity-canvas" width="960" height="600" tabIndex="-1"></canvas>
        <div id="unity-loading-bar">
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
          </div>
        </div>
        <div id="unity-warning"></div>
        <div id="unity-footer">
          <div id="unity-webgl-logo"></div>
          <div id="unity-fullscreen-button"></div>
          <div id="unity-build-title">Web_Game</div>
        </div>
        <div className="buttons">
          <button id="move">Move one step</button>
          <button id="jump">Jump</button>
        </div>
      </div>
    </div>
  );
};

export default CardioGame;