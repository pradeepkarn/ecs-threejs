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
    constructor(camera) {
        super();
        this.camera = camera;
        this.smoothedPosition = new THREE.Vector3();
        this.initialized = false;
    }
    update(world, deltaTime) {
        const players = Query.entitiesWith(world, PlayerControlled, Transform);
        const cameras = Query.entitiesWith(world, CameraFollow);//

        if (players.length === 0 || cameras.length === 0) return;

        const playerEntity = players[0];
        const cameraEntity = cameras[0];

        const playerTransform = world.getComponent(playerEntity, Transform);
        const follow = world.getComponent(cameraEntity, CameraFollow);

        const targetCamX = playerTransform.x + follow.offsetX;
        const targetCamY = playerTransform.y + follow.offsetY;
        const targetCamZ = playerTransform.z + follow.offsetZ;

        if (!this.initialized) {
            this.smoothedPosition.set(targetCamX, targetCamY, targetCamZ);
            this.initialized = true;
        }

        this.smoothedPosition.x = damp(this.smoothedPosition.x, targetCamX, follow.smoothness, deltaTime);
        this.smoothedPosition.y = damp(this.smoothedPosition.y, targetCamY, follow.smoothness, deltaTime);
        this.smoothedPosition.z = damp(this.smoothedPosition.z, targetCamZ, follow.smoothness, deltaTime);

        this.camera.position.copy(this.smoothedPosition);
        this.camera.lookAt(
            playerTransform.x,
            playerTransform.y + follow.lookAtHeight,
            playerTransform.z
        );
    }
}