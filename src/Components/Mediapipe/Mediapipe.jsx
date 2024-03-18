import React from 'react';
import "./Mediapipe.css"
const Mediapipe = () => {
  return (
    <div className="MediaPipePage">
      <div className="HomepageHeader">
            <h1 className="Welcome">Bicep Curl</h1>
            <span className="stroke-text">MediaPipe Pose</span>
          </div>
      <div class="overlayContainer">
        <img id="videoFeed" class ="videoFeed" src="http://127.0.0.1:8000/video_feed_for_curl" />
        <div class="textInfo">Your text info here</div>
      </div>
    </div>
  );
};

export default Mediapipe;