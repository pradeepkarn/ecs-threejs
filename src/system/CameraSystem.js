import * as THREE from 'three';
import { System } from '../ecs/System.js';
import { Query } from '../ecs/Query';
import { Transform } from '../components/Transform';
import { PlayerControlled } from '../components/PlayerControlled';
import { CameraFollow } from '../components/CameraFollow';


function damp(current, target, smoothing, deltaTime) {
    // Exponential smoothing == faster catch-up, https://en.wikipedia.org/wiki/Exponential_smoothing
    const t = 1 - Math.exp(-smoothing * deltaTime);
    return current + (target - current) * t;
}

export class CameraSystem extends System {
    construtor(camera) {
        super();
        this.camera = camera;
        this.smoothedPosition = new THREE.Vector3();
        this.initialized = false;
    }
    update(world, deltaTime) {
        const players = Query.entitiesWith(world, PlayerControlled, Transform);
        const cameras = Query.entitiesWith(world, CameraFollow);

        if (players.length ===0 || cameras.length === 0) return;
            
        const playerEntity = players[0];
        const cameraEntity = cameras[0];

    }
}