import { System } from '../ecs/System.js';
import { Query } from '../ecs/Query.js';
import { Input } from '../components/Input.js';
import { PlayerControlled } from '../components/PlayerControlled.js';

export class InputSystem extends System {
    constructor() {
        super();
        this.keys = {};

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }
    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, PlayerControlled, Input);
        for (const entity of entities) {
            const input = world.getComponent(entity, Input);
            const playerControlled = world.getComponent(entity, PlayerControlled);
            input.clearFrameFlags();
            const left = this.keys['KeyA'] ? 1 : 0;
            const right = this.keys['KeyD'] ? 1 : 0;
            const up = this.keys['KeyW'] ? 1 : 0;
            const down = this.keys['KeyS'] ? 1 : 0;

            input.moveX = left - right;
            input.moveY = up - down;

            input.runHeld = !!this.keys['ShiftLeft'];
            const jumpNow = !!this.keys['Space'];
            if (jumpNow && !input.jumpHeld) {
                input.jumpPressed = true;
                input.jumpBufferTimer = 0; // start the buffer
            }
            if (!jumpNow && input.jumpHeld) {
                input.jumpReleased = true;
            }
            input.jumpHeld = jumpNow;

            if(input.jumpBufferTime !== null){
                input.jumpBufferTime += deltaTime;
            }
        }
    }
}
