import React, { useEffect } from 'react';
import './CustomAvatar.css';

const CustomAvatar = () => {
  useEffect(() => {
    const subdomain = 'demo'; // Replace with your custom subdomain
    const frame = document.getElementById('frame');

    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);

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

  return (
    <div className='customAvatarPage'>
      <div className="customAvatarTitle">
        <span>Create Your</span>
        <span className="stroke-text"> Customised Gymnastic Avatar</span>
      </div>
      <div className="customAvatarIntro">
   
      </div>
      <div className="customAvatarInstruction">
      <ul>
        <li>Click the "CREATE NOW" button.</li>
        <li>Create an avatar and click the "Done" button when you're done customizing.</li>
        <li>After creation, this parent page receives the URL to the avatar.</li>
        <li>The CREATE NOW window closes, and the URL is displayed.</li>
      </ul>
      </div>
  
     
      {/* <p className="warning">
        If you have a subdomain, replace the 'demo' subdomain in the iframe source URL with yours.
      </p> */}

      <button type="button" onClick={displayIframe}>CREATE NOW</button>
      <p id="avatarUrl">Avatar URL:</p>

      <iframe id="frame" className="avatarCreatorFrame" allow="camera *; microphone *; clipboard-write" hidden></iframe>
    </div>
  );
};

export default CustomAvatar;