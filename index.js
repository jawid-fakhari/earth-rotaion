// https://planetpixelemporium.com/earth.html
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";

// Create Scene
const scene = new THREE.Scene();
// Create Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
// Create Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//////////////////////////
// Create Earth Group Object
const earthGroup = new THREE.Group();
// calculate Earth's tilt angle
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
// Add Earthgrpup to scene
scene.add(earthGroup);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Create loader object
const loader = new THREE.TextureLoader();

// Create Geometry
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1, detail);
// Create Material
const material = new THREE.MeshStandardMaterial({
  map: loader.load("/assets/earth_map.jpg"),
  // flatShading: true,
});
// calling getStarfield function from import
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

const lightsMat = new THREE.MeshBasicMaterial({
  // transparent: true,
  // opacity: 0.6
  map: loader.load("/assets/earth_lights.jpg"),
  blending: THREE.AdditiveBlending, 
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);
// Create Mesh
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Lights
// const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x000000, 1);
// scene.add(hemisphereLight);
// sun light
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.1, 1);
scene.add(sunLight);
// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();
