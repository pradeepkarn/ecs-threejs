import * as THREE from 'three'
import { Transform } from '../components/Transform.js';
import { Mesh } from '../components/Mesh.js';
import { StaticBody } from '../components/StaticBody.js';
import { ColliderAABB } from '../components/ColliderAABB.js';

export function createGround(world, scene) {
    const entity = world.createEntity();

    // visual
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new THREE.MeshStandardMaterial({ metalness: 0, roughness: 0.5 });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // ECS data
    world.addComponent(entity, new Transform(0, 0, 0));
    world.addComponent(entity, new Mesh(plane));
    world.addComponent(entity, new StaticBody());

    // Collider
    world.addComponent(entity, new ColliderAABB(25, 0.1, 25));

    return entity;
}