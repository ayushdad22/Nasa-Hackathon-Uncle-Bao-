mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2hkYWQiLCJhIjoiY20xdGI4YTdhMDBvODJqcGJqaDV3bzQ1MCJ9.djla3giXDBGAh6Ked3QBeg";

// Initialize Mapbox map
const map = new mapboxgl.Map({
  container: "map",
  zoom: 11,
  center: [-9.31, 53.957],
  pitch: 120,
  bearing: -177.2,
  style: "mapbox://styles/mapbox/satellite-v9",
  antialias: true,
  interactive: false,
});

map.on("style.load", () => {
  // map.setFog({}); // Optional: Adds atmospheric fog for depth
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });

  map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
});

// model coordinates
const modelOrigin = [-9.31, 53.95];
const modelAltitude = 1500;
const modelRotate = [Math.PI / 2, 0, 0];

const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
  modelOrigin,
  modelAltitude
);
// transformation parameters to position, rotate and scale the 3D model onto the map
const modelTransform = {
  translateX: modelAsMercatorCoordinate.x,
  translateY: modelAsMercatorCoordinate.y,
  translateZ: modelAsMercatorCoordinate.z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
};

const THREE = window.THREE;

const customLayer = {
  id: "3d-model",
  type: "custom",
  renderingMode: "3d",
  onAdd: function (map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    const skybox_loader = new THREE.CubeTextureLoader();
    const skyboxImages = [
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Right
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Left
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Top
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Bottom
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Front
      "../Night_Sky_Mayo_Resized_1024x1024.jpg", // Back
    ];

    const skyboxTexture = skybox_loader.load(
      skyboxImages,
      () => {
        console.log("Skybox loaded successfully.");
      },
      undefined,
      (err) => {
        console.error("An error occurred loading the skybox", err);
      }
    );
    this.scene.background = skyboxTexture;
    console.log(this.scene.background);
    // create two three.js lights to illuminate the model
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight2);

   
    const loader = new THREE.GLTFLoader();
    loader.load("plane.gltf", (gltf) => {
      this.model = gltf.scene;
      const modelScaleFactor = 1000; 
      this.model.scale.set(
        modelScaleFactor,
        modelScaleFactor,
        modelScaleFactor
      );
      this.scene.add(this.model);
    });
    this.map = map;

    // Use the Mapbox GL JS map canvas for three.js
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });

    this.renderer.autoClear = false;
  },
  render: function (gl, matrix) {
    const rotationX = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      modelTransform.rotateX
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 1, 0),
      modelTransform.rotateY
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      modelTransform.rotateZ
    );

    const m = new THREE.Matrix4().fromArray(matrix);
    const l = new THREE.Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
      )
      .scale(
        new THREE.Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale
        )
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  },
};
document.getElementById("goToMayo").addEventListener("click", () => {
  map.flyTo({
    center: [-9.31, 53.957],
    zoom: 11,
    pitch: 120,
    bearing: -177.2,
    speed: 1.5,
    curve: 1,
    essential: true,
  });
  const dublinCoordinates = [-9.31, 53.957];

  const dublinAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    dublinCoordinates,
    modelAltitude
  );

  modelTransform.translateX = dublinAsMercatorCoordinate.x;
  modelTransform.translateY = dublinAsMercatorCoordinate.y;
  modelTransform.translateZ = dublinAsMercatorCoordinate.z;
  camera.position.x = dublinAsMercatorCoordinate.x;
  camera.position.y = dublinAsMercatorCoordinate.y - 0.001;
  //camera.position.z =dublinAsMercatorCoordinate.z;
});

document.getElementById("goToDublin").addEventListener("click", () => {
  map.flyTo({
    center: [-6.2603, 53.3498], // Dublin coordinates
    zoom: 11,
    pitch: 120,
    bearing: -177.2,
    speed: 1.5,
    curve: 1,
    essential: true,
  });
  const dublinCoordinates = [-6.2603, 53.3498];

  const dublinAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    dublinCoordinates,
    modelAltitude
  );

  // Now, update the model transform's translateX, translateY, and translateZ
  modelTransform.translateX = dublinAsMercatorCoordinate.x;
  modelTransform.translateY = dublinAsMercatorCoordinate.y;
  modelTransform.translateZ = dublinAsMercatorCoordinate.z;
  camera.position.x = dublinAsMercatorCoordinate.x;
  camera.position.y = dublinAsMercatorCoordinate.y - 0.001;
  // camera.position.z =dublinAsMercatorCoordinate.z;
});
map.on("style.load", () => {
  map.addLayer(customLayer);
});

const movementSpeed = 500;
const camera = map.getFreeCameraOptions();

document.addEventListener("keydown", function (event) {
  const speed = 0.0001;

  switch (event.key) {
    case "w": // Move forward
      camera.position.y += speed;
      modelTransform.rotateY = 0;
      modelTransform.translateY += speed;
      break;
    case "a": // Move left
      camera.position.x += speed;
      modelTransform.rotateY = Math.PI / 2;
      modelTransform.translateX += speed;
      break;
    case "s": // Move backward
      camera.position.y -= speed;
      modelTransform.rotateY = Math.PI;
      modelTransform.translateY -= speed;
      break;
    case "d": // Move right
      camera.position.x -= speed;
      modelTransform.rotateY = -Math.PI / 2;
      modelTransform.translateX -= speed;
      break;
  }

  // Set the camera altitude to match the cube's altitude
  //camera.position.z = modelTransform.translateZ;

  map.setFreeCameraOptions(camera);
});
