import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type Assists = {
  screenMesh: THREE.Mesh;
  computerMesh: THREE.Mesh;
  crtMesh: THREE.Mesh;
  keyboardMesh: THREE.Mesh;
  shadowPlaneMesh: THREE.Mesh;
  bakeTexture: THREE.Texture;
  bakeFloorTexture: THREE.Texture;
  publicPixelFont: Font;
  chillFont: Font;
  environmentMapTexture: THREE.CubeTexture;
  gltfScene: THREE.Group;
};

function loadAssists(callback: (assists: Assists) => any) {
  const assists: any = {};

  const loadingDOM = document.querySelector("#loading");
  const loadingItemsDOM = document.querySelector("#loading-items");
  const loadingBarDOM = document.querySelector("#loading-bar-progress");

  const manager = new THREE.LoadingManager();

  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onError = function (url) {
    console.error("There was an error loading " + url);
    if (loadingItemsDOM) {
      (loadingItemsDOM as HTMLElement).textContent = `Error loading: ${url}`;
      (loadingItemsDOM as HTMLElement).style.color = "red";
    }
  };

  manager.onLoad = function () {
    if (!loadingItemsDOM) return;
    loadingItemsDOM.textContent = `Nearly There...`;

    console.log("Loading complete!");
    window.setTimeout(() => {
      (loadingDOM as any).style.opacity = "0";
      callback(assists as Assists);
    }, 200);
    window.setTimeout(() => {
      (loadingDOM as any).style.display = "none";
    }, 500);
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    if (!loadingItemsDOM || !loadingBarDOM) return;
    (loadingBarDOM as HTMLElement).style.transform = `scaleX(${
      itemsLoaded / itemsTotal
    })`;
    loadingItemsDOM.textContent = `${itemsLoaded} of ${itemsTotal} File Loaded: ${url}`;
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  // Fonts
  const fontLoader = new FontLoader(manager);
  fontLoader.load("/fonts/public-pixel.json", (font) => {
    assists.publicPixelFont = font;
  });
  fontLoader.load("/fonts/chill.json", (font) => {
    assists.chillFont = font;
  });

  // Texture

  // Texture
  const textureLoader = new THREE.TextureLoader(manager);
  textureLoader.load("/textures/bake-quality-5.jpg", (tex) => {
    tex.flipY = false;
    tex.encoding = THREE.sRGBEncoding;
    assists.bakeTexture = tex;
  });

  textureLoader.load("/textures/bake_floor-quality-3.jpg", (tex) => {
    tex.flipY = false;
    tex.encoding = THREE.sRGBEncoding;
    assists.bakeFloorTexture = tex;
  });

  const cubeTextureLoader = new THREE.CubeTextureLoader(manager);

  cubeTextureLoader.load(
    [
      `/textures/environmentMap/px.jpg`,
      `/textures/environmentMap/nx.jpg`,
      `/textures/environmentMap/py.jpg`,
      `/textures/environmentMap/ny.jpg`,
      `/textures/environmentMap/pz.jpg`,
      `/textures/environmentMap/nz.jpg`,
    ],
    (tex) => {
      assists.environmentMapTexture = tex;
    }
  );

  // Mesh
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load(`/models/Commodore710_33.5.glb`, (gltf) => {
    assists.gltfScene = gltf.scene;
    
    assists.screenMesh = gltf.scene.getObjectByName("Screen") as THREE.Mesh;
    assists.computerMesh = gltf.scene.getObjectByName("Computer") as THREE.Mesh;
    assists.crtMesh = gltf.scene.getObjectByName("CRT") as THREE.Mesh;
    assists.keyboardMesh = gltf.scene.getObjectByName("Keyboard") as THREE.Mesh;
    assists.shadowPlaneMesh = gltf.scene.getObjectByName("ShadowPlane") as THREE.Mesh;
  });
}

export { loadAssists };
export type { Assists };
