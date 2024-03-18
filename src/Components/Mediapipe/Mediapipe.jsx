import React from 'react';
import "./Mediapipe.css"
const Mediapipe = () => {
  return (
    <div>
      <h1>Mediapipe</h1>
      <div class="overlayContainer">
        <div class="textInfo">Your text info here</div>
        <img id="videoFeed" class ="videoFeed" src="http://127.0.0.1:5000/video_feed_for_curl" />
      </div>
    </div>
  );
};

export default Mediapipe;