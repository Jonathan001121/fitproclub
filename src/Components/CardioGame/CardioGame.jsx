import React, { useEffect } from 'react';

import { Unity, useUnityContext } from "react-unity-webgl";
import "./CardioGame.css"
const CardioGame = () => {
  function unityShowBanner(msg, type) {
    const warningBanner = document.querySelector("#unity-warning");
    
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    
    const div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    
    if (type === 'error') {
      div.style = 'background: red; padding: 10px;';
    } else if (type === 'warning') {
      div.style = 'background: yellow; padding: 10px;';
      setTimeout(() => {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    
    updateBannerVisibility();
  }
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingBar = document.querySelector("#unity-loading-bar");
  const progressBarFull = document.querySelector("#unity-progress-bar-full");
  const fullscreenButton = document.querySelector("#unity-fullscreen-button");
  const moveButton = document.querySelector("#move");
  const jumpButton = document.querySelector("#jump");
 

  const buildUrl = "/src/Components/CardioGame/Build";
  const { unityProvider } = useUnityContext({
    loaderUrl:buildUrl + "/webgl.loader.js",
    dataUrl: buildUrl + "/webgl.data",
    frameworkUrl: buildUrl + "/webgl.framework.js",
    codeUrl: buildUrl + "/webgl.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Web_Game",
    productVersion: "0.1",
    showBanner: unityShowBanner,
  });
  const config = {
    dataUrl: buildUrl + "/webgl.data",
    frameworkUrl: buildUrl + "/webgl.framework.js",
    codeUrl: buildUrl + "/webgl.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Web_Game",
    productVersion: "0.1",
    showBanner: unityShowBanner,
  };

  const loaderUrl = buildUrl + "/webgl.loader.js";
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = './script.js';
    scriptElement.async = true;
  
    document.body.appendChild(scriptElement);

    const loaderScript = document.createElement('script');
    loaderScript.src = loaderUrl;
    loaderScript.async = true;
    
    loaderScript.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
              loadingBar.style.display = "none";
              fullscreenButton.onclick = () => {

                // use unityInstance to call functions in unity
                unityInstance.SetFullscreen(1);

              };
              moveButton.onclick = () => {
                  unityInstance.SendMessage("Player", "MoveForward");
                };

                jumpButton.onclick = () => {
                  unityInstance.SendMessage("Player", "Jump");
                };

            }).catch((message) => {
              alert(message);
            });
          };
    document.body.appendChild(loaderScript);
  
    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);



  useEffect(() => {
    const loaderScript = document.createElement('script');
    loaderScript.src = loaderUrl;
    loaderScript.async = true;
    
    loaderScript.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
              loadingBar.style.display = "none";
              fullscreenButton.onclick = () => {

                // use unityInstance to call functions in unity
                unityInstance.SetFullscreen(1);

              };
              moveButton.onclick = () => {
                  unityInstance.SendMessage("Player", "MoveForward");
                };

                jumpButton.onclick = () => {
                  unityInstance.SendMessage("Player", "Jump");
                };

            }).catch((message) => {
              alert(message);
            });
          };
    document.body.appendChild(loaderScript);
  
    return () => {
      document.body.removeChild(loaderScript);
    };
  }, []);

  return (
    
    <div className="CardioGame">
     
      <div className="gamedirectory-header">
        <span>Cardio </span>
        <span className="stroke-text">Game</span>
      </div>
      <div id="unity-container" className="unity-desktop">
      {/* <Unity unityProvider={unityProvider} /> */}
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