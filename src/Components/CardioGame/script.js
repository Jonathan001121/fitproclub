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
  
  const buildUrl = "Build";
  const loaderUrl = buildUrl + "/webgl.loader.js";
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
  
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingBar = document.querySelector("#unity-loading-bar");
  const progressBarFull = document.querySelector("#unity-progress-bar-full");
  const fullscreenButton = document.querySelector("#unity-fullscreen-button");
  const moveButton = document.querySelector("#move");
  const jumpButton = document.querySelector("#jump");
  
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    container.className = "unity-mobile";
    canvas.className = "unity-mobile";
  } else {
    canvas.style.width = "960px";
    canvas.style.height = "600px";
  }
  
  loadingBar.style.display = "block";
  
  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
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
  
  document.body.appendChild(script);