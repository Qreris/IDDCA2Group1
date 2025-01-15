import {
    ViewerApp,
    AssetManagerPlugin,
    addBasePlugins,
    ScrollableCameraViewPlugin,
    VariationConfiguratorPlugin,
    FrameFadePlugin,
    LoadingScreenPlugin,
    PickingPlugin,
    TweakpaneUiPlugin,
    MaterialConfiguratorPlugin,
  
    // Import THREE.js internals
    Color,
      Texture,
    Vector3,
  } from 'webgi';
  import * as THREE from 'three';
  
  async function setupViewer() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('web-canvas'),
    });
  
    await addBasePlugins(viewer);
  
    const manager = await viewer.getPlugin(AssetManagerPlugin);
    const scene = viewer.scene;
    
    viewer.renderer.refreshPipeline();
    //await viewer.setEnvironmentMap("./assets/autumn forest.hdr");
    await viewer.load("./assets/Sneakers6.glb");

    const model = await manager.addFromPath("./assets/Sneakers6.glb");
    
    const object = scene.getObjectByName('SHOE_FINAL001');
    if (object) {
        console.log('Object loaded:', object);
    } else {
        console.error('Object not found in the scene.');
    }
  
    
    // Camera transform
	  viewer.scene.activeCamera.position = new Vector3(15, 5, 30);
	  viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

    // Camera options
    const options = viewer.scene.activeCamera.getCameraOptions();
    options.fov = 25;
    viewer.scene.activeCamera.setCameraOptions(options);
    
    // Control options
    const controls = viewer.scene.activeCamera.controls;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.rotateSpeed = 2.0;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    
    const texture = manager.materials.findMaterialsByName('TEXTURE')[0];
    if(texture){
      console.log("Found Texture");
    }
    else {
      console.warn("Didn't find texture");
    }

    
    document.querySelector('.colour-white')?.addEventListener('click', () => {
      colourSelectedIs("W");
      if(changingWhatPart == "upper")
      {
        changeUpperColour("W");
      }
      else if(changingWhatPart == "sole")
        {
          changeSoleColour("W");
        }
        else if(changingWhatPart == "lace")
          {
            changeLaceColour("W");
          }
      else{
        changeWholeShoeColor();
      }

    })
    document.querySelector('.colour-blue')?.addEventListener('click', () => {
      colourSelectedIs("B");
      if(changingWhatPart == "upper")
      {
        changeUpperColour("B");
      }
      else if(changingWhatPart == "sole")
        {
          changeSoleColour("B");
        }
        else if(changingWhatPart == "lace")
          {
            changeLaceColour("B");
          }
      else{
        changeWholeShoeColor();
      }

    })
    document.querySelector('.colour-green')?.addEventListener('click', () => {
      colourSelectedIs("G");
      if(changingWhatPart == "upper")
        {
          changeUpperColour("G");
        }
        else if(changingWhatPart == "sole")
          {
            changeSoleColour("G");
          }
          else if(changingWhatPart == "lace")
            {
              changeLaceColour("G");
            }
      else{
        changeWholeShoeColor();
      }

    })
    document.querySelector('.colour-yellow')?.addEventListener('click', () => {
      colourSelectedIs("Y");
      if(changingWhatPart == "upper")
        {
          changeUpperColour("Y");
        }
        else if(changingWhatPart == "sole")
          {
            changeSoleColour("Y");
          }
          else if(changingWhatPart == "lace")
            {
              changeLaceColour("Y");
            }
      else{
        changeWholeShoeColor();
      }
    })

    //part of shoe selecter
    
    let changingWhatPart = ""
    console.log(changingWhatPart);
    
    let upperColour = "W";
    let soleColour = "W";
    let laceColour = "W";
    function changeColour() {
      textureFinder(upperColour, soleColour, laceColour);
      viewer.scene.setDirty(); 
    }

    function changeWholeShoeColor() {
      if (texture && texture.map && colourSelected == "W") {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('public/assets/textures/WWW.png', (texture) => {
        object.material.map = texture; 
        object.material.needsUpdate = true;
        upperColour = "W";
        soleColour = "W";
        laceColour = "W"; 
        });
      }
      else if (texture && texture.map && colourSelected == "B") {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('public/assets/textures/BBB.png', (texture) => {
        object.material.map = texture; 
        object.material.needsUpdate = true; 
        upperColour = "B";
        soleColour = "B";
        laceColour = "B";
        });
      }
      else if (texture && texture.map && colourSelected == "G") {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('public/assets/textures/GGG.png', (texture) => {
        object.material.map = texture; 
        object.material.needsUpdate = true; 
        upperColour = "G";
        soleColour = "G";
        laceColour = "G";
        });
      }
      else if (texture && texture.map && colourSelected == "Y") {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('public/assets/textures/YYY.png', (texture) => {
        object.material.map = texture; 
        object.material.needsUpdate = true; 
        upperColour = "Y";
        soleColour = "Y";
        laceColour = "Y";
        });
      }

      viewer.scene.setDirty();
    }

    function changeUpperColour(newColour) {
    upperColour = newColour;
    changeColour(); 
    }

    function changeSoleColour(newColour) {
      soleColour = newColour;
      changeColour(); 
    }

    function changeLaceColour(newColour) {
      laceColour = newColour;
      changeColour();
    }
        
    function textureFinder(upperColour, soleColour, laceColour) {
      
      const key = `${upperColour}${soleColour}${laceColour}`;
      const textureToLoad = textureMapping[key];
      
      if (textureToLoad) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(`public/assets/textures/${textureToLoad}.png`, (texture) => {
          if (object && object.material) {
            object.material.map = texture; 
            object.material.needsUpdate = true; 
            console.log(`Loaded texture: ${textureToLoad}`);
          }
        });
      } else {
        console.error(`No texture found for combination: ${key}`);
      }
    }

    //colour selector
    const textureMapping = {
      "WWW": "WWW",
      "WWB": "WWB",
      "WWG": "WWG",
      "WWY": "WWY",
      "WBW": "WBW",
      "WBB": "WBB",
      "WBG": "WBG",
      "WBY": "WBY",
      "WGW": "WGW",
      "WGB": "WGB",
      "WGG": "WGG",
      "WGY": "WGY",
      "WYW": "WYW",
      "WYB": "WYB",
      "WYG": "WYG",
      "WYY": "WYY",
      "BWW": "BWW",
      "BWB": "BWB",
      "BWG": "BWG",
      "BWY": "BWY",
      "BBW": "BBW",
      "BBB": "BBB",
      "BBG": "BBG",
      "BBY": "BBY",
      "BGW": "BGW",
      "BGB": "BGB",
      "BGG": "BGG",
      "BGY": "BGY",
      "BYW": "BYW",
      "BYB": "BYB",
      "BYG": "BYG",
      "BYY": "BYY",
      "GWW": "GWW",
      "GWB": "GWB",
      "GWG": "GWG",
      "GWY": "GWY",
      "GBW": "GBW",
      "GBB": "GBB",
      "GBG": "GBG",
      "GBY": "GBY",
      "GGW": "GGW",
      "GGB": "GGB",
      "GGG": "GGG",
      "GGY": "GGY",
      "GYW": "GYW",
      "GYB": "GYB",
      "GYG": "GYG",
      "GYY": "GYY",
      "YWW": "YWW",
      "YWB": "YWB",
      "YWG": "YWG",
      "YWY": "YWY",
      "YBW": "YBW",
      "YBB": "YBB",
      "YBG": "YBG",
      "YBY": "YBY",
      "YGW": "YGW",
      "YGB": "YGB",
      "YGG": "YGG",
      "YGY": "YGY",
      "YYW": "YYW",
      "YYB": "YYB",
      "YYG": "YYG",
      "YYY": "YYY"
    };

    let colourSelected = "W";
    function colourSelectedIs(whatColour)
    {
      colourSelected = whatColour;
      console.log("The current colour selected is " + colourSelected);
    }

    //focusing on the button
    const btnElList = document.querySelectorAll('.circle-button');
    
    btnElList.forEach(btnEl => {
      btnEl.addEventListener('click', () => {
        document.querySelector('.selectedColour')?.classList.remove('selectedColour');
        btnEl.classList.add('selectedColour');
      })
    })

    document.querySelector('.whole')?.addEventListener('click', () => {
      changingWhatPart ="whole";
      console.log(changingWhatPart);})
    document.querySelector('.upper')?.addEventListener('click', () => {
      changingWhatPart ="upper";
      console.log(changingWhatPart);})
    document.querySelector('.sole')?.addEventListener('click', () => {
      changingWhatPart ="sole";
      console.log(changingWhatPart);})
    document.querySelector('.lace')?.addEventListener('click', () => {
      changingWhatPart ="lace";
      console.log(changingWhatPart);})

    
  }

  
  setupViewer();