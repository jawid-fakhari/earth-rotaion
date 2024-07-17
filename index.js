import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Create Scene

const scene = new THREE.Scene();

// Create Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

// Create Renderer

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls

const controls = new OrbitControls(camera, renderer.domElement);

// Create Geometry

const geometry = new THREE.IcosahedronGeometry(1, 12);

// Create Material

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  flatShading: true,
});

// Create Mesh

const earthMesh = new THREE.Mesh(geometry, material);
earthMesh.rotation.x = 5;
scene.add(earthMesh);

// Lights

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x000000, 1);
scene.add(hemisphereLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.z += 0.001;
  // cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
