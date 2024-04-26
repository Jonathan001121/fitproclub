import React, { useState, useEffect , useRef} from 'react';
import './CustomAvatar.css';
import {InputLabel,  TextField}from '@mui/material';
const CustomAvatar = () => {

  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
 

  const startCamera = async () => {
    const video = videoRef.current;
    video.style.display = "block";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };
  
  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  
    // Set canvas dimensions to match the video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // Pause the video
    video.pause();
  
    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Get the image data from the canvas
    const imageData = canvas.toDataURL("image/png");
  
    // Display the captured image on the canvas
    const img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageData;
  };
  




// ----------------


  useEffect(() => {
    const subdomain = 'silverfit'; // Replace with your custom subdomain
    const frame = document.getElementById('frame');

    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

    window.addEventListener('message', subscribe);

    function subscribe(event) {
      const json = parse(event);

      if (json?.source !== 'readyplayerme') {
        return;
      }

      // Subscribe to all events sent from Ready Player Me once the frame is ready
      if (json.eventName === 'v2.frame.ready') {
        frame.contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v2.**'
          }),
          '*'
        );
      }

      // Get the avatar GLB URL
      if (json.eventName === 'v2.avatar.exported') {
        console.log(`Avatar URL: ${json.data.url}`);
        document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
        document.getElementById('frame').hidden = true;
        downloadFile(json.data.url);
      }

      // Get the user id
      if (json.eventName === 'v2.user.set') {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
      }
    }

    function parse(event) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    }
  }, []);

  function displayIframe() {
    document.getElementById('frame').hidden = false;
  }

  function renderOnHomePage () {
    document.getElementById('uploadContainer').hidden = false;
  }

  function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '~/fitproclub/public/models/avatar.glb';
    link.click();
  
    // Save the file in the specified directory
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        const blob = new Blob([fileReader.result], { type: 'model/gltf-binary' });
        const formData = new FormData();
        formData.append('file', blob, 'avatar.glb');
  
        const request = new XMLHttpRequest();
        request.open('POST', '/models', true); // Replace with the appropriate API endpoint
        request.send(formData);
      };
      fileReader.readAsArrayBuffer(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  function handleRenderClick() {
    const url = 'https://models.readyplayer.me/6614be82ae4a3d682a2ddb2d.glb'; // Replace with the desired URL
    downloadFile(url);
  }
  return (
    <div className='customAvatarPage'>
      <div className="customAvatarTitle">
        <span>Create Your</span>
        <span className="stroke-text"> Customised Gymnastic Avatar</span>
      </div>

      <div className="customAvatarBody">
        <div className="customAvatarIntro">
          <div className="customAvatarInstruction">
            <ul>
              <li>Click the "CREATE NOW" button.</li>
              <li>Create an avatar and click the "Done" button when you're done customizing.</li>
              <li>After creation, this parent page receives the URL to the avatar.</li>
              <li>The CREATE NOW window closes, and the URL is displayed.</li>
            </ul>
          </div>
        </div>
        <div className="customAvatarWorkField">

        <div>
        <video ref={videoRef} autoPlay muted style={{ display: "block" }}></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={capture}>Take Photo</button>
      {/* <button onClick={uploadPhoto}>Upload Photo</button> */}
      {imageSrc && <img src={imageSrc} alt="Avatar" />}
    </div>



        <div className="customAvatarButtons">
          <button type="button" className="createIFrameButton" onClick={displayIframe}>CREATE NOW</button>
          <button type="button" className="uploadPhotoButton" >Upload Photo</button>
          {/* <input >Avatar URL:</input> */}
          </div>

       <div className="pasteLinkGroup">
         <p style={{'width':'100px'}}>Step 2:  </p>
          <TextField id="pasteAvatarUrl"
               required
               margin="dense"
        
               name=""
               label="Paste your Avatar Url here"
               type="text"
               fullWidth
               variant="standard"
            
       
               sx={{
                 mt: 2,
                 minWidth: 120,
                 borderColor: 'rgba(19, 146, 209, 0.8)',
                 borderWidth: '2px',
                 borderStyle: 'solid',
                 backgroundColor: 'rgba(10, 16, 20, 0.8)',
                 borderRadius: '4px',
                 minHeight: '40px'

               }}
               InputLabelProps={{
                 sx: {
                   color: 'rgba(255, 255, 255, 0.8)', // Set the color to match the border color
                   paddingLeft: '10px',
                   fontSize : '12px'
                 },
               }}
               InputProps={{
                 sx: {
                   color: 'white', // Set the text color to white
                   paddingLeft: '10px',
                 },
               }}
             />
             <button className="renderButton" onClick={handleRenderClick} >Render</button>
            </div>


          {/* <p id="avatarUrl">Avatar URL:</p> */}
          <iframe id="frame" className="avatarCreatorFrame" allow="camera *; microphone *; clipboard-write" hidden></iframe>
          <div className="uploadContainer" allow="camera *; microphone *; clipboard-write" hidden>
            <button type="button" className="createIFrameButton" onClick={displayIframe}>CREATE NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAvatar;