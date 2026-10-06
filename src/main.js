import './style.css';
import * as THREE from 'three';
import { World } from './ecs/World.js';
import { MovementSystem } from './system/MovementSysterm.js';
import { createPlayer } from './game/PlayerFactory.js';
import { RenderSystem } from './system/RenderSysterm.js';
import { InputSystem } from './system/InputSystem.js';
import { PlayerControllerSystem } from './system/PlayerControllerSystem.js';
import { GroundSystem } from './system/groundSystem.js';
import { CameraSystem } from './system/CameraSystem.js';
import { createFollowCamera } from './game/CameraFactory.js';

// ........Canvas...........
const canvas = document.getElementById('game');

// THREE.js setup
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper(3);
scene.add(axes);
axes.visible = false;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x202030, 1);


// ........ECS...........
const world = new World();
world.addSystem(new InputSystem());
world.addSystem(new PlayerControllerSystem());
world.addSystem(new MovementSystem());
world.addSystem(new GroundSystem());
world.addSystem(new CameraSystem(camera));
world.addSystem(new RenderSystem(renderer, scene, camera));

createPlayer(world, scene);
createFollowCamera(world);

console.log("Scene children count: " + scene.children.length);
// .........Resize Handler...........
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// Axes Helper Toggle using H key
document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyH') {
    axes.visible = !axes.visible;
  }
});


// .........Game Loop...........
let lastTime  = performance.now();
function gameLoop() {
  const  now = performance.now();
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  world.update(deltaTime);
  requestAnimationFrame(gameLoop);
}

gameLoop();