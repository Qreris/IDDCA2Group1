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
  import { gsap } from "gsap";
  import { _numWithUnitExp } from "gsap/gsap-core";
  import { ScrollTrigger } from "gsap/ScrollTrigger";



//GSAP animation codes
gsap.registerPlugin(ScrollTrigger);


gsap.from(".usp-block", {
  opacity: 0, 
  y: -50, 
  duration: 1, 
  stagger: 0.2, 
  scrollTrigger: {
    trigger: ".usp", 
    start: "center center", 
    toggleActions: "play none none none", 
  },
});

gsap.to(".banner", {
    scale: 1.15,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".banner",
      start: "top center",
      end: "bottom center", 
      scrub: true,
    },
  });


//   async function setupViewer() {
//     const viewer = new ViewerApp({
//         canvas: document.getElementById('start3d-canvas'),
//     });
  
//     await addBasePlugins(viewer);
  
//     const manager = await viewer.getPlugin(AssetManagerPlugin);
//     const scene = viewer.scene;
    
//     viewer.renderer.refreshPipeline();
//     //await viewer.setEnvironmentMap("./assets/autumn forest.hdr");
//     await viewer.load("./assets/Sneakers6.glb");

//     const model = await manager.addFromPath("./assets/Sneakers6.glb");
    
//     const object = scene.getObjectByName('SHOE_FINAL001');
//     if (object) {
//         console.log('Object loaded:', object);
//     } else {
//         console.error('Object not found in the scene.');
//     }
  
    
//     // Camera transform
// 	  viewer.scene.activeCamera.position = new Vector3(15, 5, 30);
// 	  viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

//     // Camera options
//     const options = viewer.scene.activeCamera.getCameraOptions();
//     options.fov = 25;
//     viewer.scene.activeCamera.setCameraOptions(options);
    
//     // Control options
//     const controls = viewer.scene.activeCamera.controls;
//     controls.autoRotate = false;
//     controls.autoRotateSpeed = 1;
//     controls.enableDamping = true;
//     controls.rotateSpeed = 2.0;
//     controls.enableZoom = true;
//     controls.enablePan = false;
//     controls.minDistance = 2;
//     controls.maxDistance = 8;
    
//     const texture = manager.materials.findMaterialsByName('TEXTURE')[0];
//     if(texture){
//       console.log("Found Texture");
//     }
//     else {
//       console.warn("Didn't find texture");
//     }
// }
// setupViewer();

async function setupViewer2() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('display1-canvas'),
    });
    await addBasePlugins(viewer);
  
    const manager = await viewer.getPlugin(AssetManagerPlugin);
    const scene = viewer.scene;
    
    viewer.renderer.refreshPipeline();
    //await viewer.setEnvironmentMap("./assets/autumn forest.hdr");
    await viewer.load("./assets/Sneakers1.glb");

    const model = await manager.addFromPath("./assets/Sneakers1.glb");
    
    const object = scene.getObjectByName('SHOE_LEFT');
    if (object) {
        console.log('Object loaded:', object);
    } else {
        console.error('Object not found in the scene.');
    }
    const texture = manager.materials.findMaterialsByName('TEXTURE1')[0];
    if(texture){
      console.log("Found Texture");
    }
    else {
      console.warn("Didn't find texture");
    }
    // Camera transform
    viewer.scene.activeCamera.position = new Vector3(15, 5, 30);
    viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

    // Camera options
    const options = viewer.scene.activeCamera.getCameraOptions();
    options.fov = 30;
    viewer.scene.activeCamera.setCameraOptions(options);
    
    // Control options
    const controls = viewer.scene.activeCamera.controls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableDamping = false;
    controls.rotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    startTextureSwapping(manager, object);
    
}
function startTextureSwapping(manager, object) {
    const textures = [
        './assets/textures/CCC.png',
        './assets/textures/PPP.png',
        './assets/textures/BBB.png',
        './assets/textures/GGG.png',
        './assets/textures/YYY.png',
        './assets/textures/WWW.png',
        './assets/textures/OOO.png',
        './assets/textures/WBW.png',
        './assets/textures/BWB.png',
        './assets/textures/GWG.png',
        './assets/textures/WGW.png',
        './assets/textures/YWY.png',
        './assets/textures/WYW.png',
        './assets/textures/BWY.png',
        './assets/textures/BWG.png',
        './assets/textures/YYW.png',
        './assets/textures/BBW.png',
        './assets/textures/GGW.png'
    ];

    setInterval(async () => {
        const randomTextureIndex = Math.floor(Math.random() * textures.length);
        const randomTexturePath = textures[randomTextureIndex];

        const textureLoader = new THREE.TextureLoader();
        const randomTexture = await textureLoader.loadAsync(randomTexturePath);

        if (object && object.material) {
            object.material.map = randomTexture;
            object.material.needsUpdate = true;
            console.log(`Texture swapped to: ${randomTexturePath}`);
        }
    }, 3000); //3 seconds
}
setupViewer2();

async function setupViewer3() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('display2-canvas'),
    });
    await addBasePlugins(viewer);
  
    const manager = await viewer.getPlugin(AssetManagerPlugin);
    const scene = viewer.scene;
    
    viewer.renderer.refreshPipeline();
    //await viewer.setEnvironmentMap("./assets/autumn forest.hdr");
    await viewer.load("./assets/Sneakers2.glb");

    const model = await manager.addFromPath("./assets/Sneakers2.glb");
    
    const object = scene.getObjectByName('SHOE_MIDDLE');
    if (object) {
        console.log('Object loaded:', object);
    } else {
        console.error('Object not found in the scene.');
    }
    const texture = manager.materials.findMaterialsByName('TEXTURE2')[0];
    if(texture){
      console.log("Found Texture");
    }
    else {
      console.warn("Didn't find texture");
    }
    // Camera transform
    viewer.scene.activeCamera.position = new Vector3(15, 5, 30);
    viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

    // Camera options
    const options = viewer.scene.activeCamera.getCameraOptions();
    options.fov = 30;
    viewer.scene.activeCamera.setCameraOptions(options);
    
    // Control options
    const controls = viewer.scene.activeCamera.controls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.1;
    controls.enableDamping = false;
    controls.rotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    startTextureSwapping(manager, object);
    
}
setupViewer3();

async function setupViewer4() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('display3-canvas'),
    });
    await addBasePlugins(viewer);
  
    const manager = await viewer.getPlugin(AssetManagerPlugin);
    const scene = viewer.scene;
    
    viewer.renderer.refreshPipeline();
    //await viewer.setEnvironmentMap("./assets/autumn forest.hdr");
    await viewer.load("./assets/Sneakers0.glb");

    const model = await manager.addFromPath("./assets/Sneakers0.glb");
    
    const object = scene.getObjectByName('SHOE_RIGHT');
    if (object) {
        console.log('Object loaded:', object);
    } else {
        console.error('Object not found in the scene.');
    }
    const texture = manager.materials.findMaterialsByName('TEXTURE3')[0];
    if(texture){
      console.log("Found Texture");
    }
    else {
      console.warn("Didn't find texture");
    }
    // Camera transform
    viewer.scene.activeCamera.position = new Vector3(15, 5, 30);
    viewer.scene.activeCamera.target = new Vector3(0, 0, 0);

    // Camera options
    const options = viewer.scene.activeCamera.getCameraOptions();
    options.fov = 30;
    viewer.scene.activeCamera.setCameraOptions(options);
    
    // Control options
    const controls = viewer.scene.activeCamera.controls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.4;
    controls.enableDamping = false;
    controls.rotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    startTextureSwapping(manager, object);
    
}
setupViewer4();