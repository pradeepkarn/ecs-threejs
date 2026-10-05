import * as THREE from 'three'
import { CameraFollow } from '../components/CameraFollow.js';

export function createFollowCamera(world) {
    const cameraEntity = world.createEntity();
    world.addComponent(cameraEntity, new CameraFollow({
        offsetY: 3,
        offsetZ: 6,
        smoothness: 8,
        lookAtHeight: 1,
    }));
    return cameraEntity;
}