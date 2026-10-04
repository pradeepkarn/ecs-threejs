import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { Transform } from "../components/Transform";
import { Mesh } from "../components/Mesh";

export class RenderSystem extends System {
    constructor(renderer, scene, camera) {
        super();
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, Transform, Mesh);
        for (const entity of entities) {
            const transform = world.getComponent(entity, Transform);
            const meshComponent = world.getComponent(entity, Mesh);
            meshComponent.mesh.position.set(transform.x, transform.y, transform.z);
        }
        this.renderer.render(this.scene, this.camera);
    }
}
