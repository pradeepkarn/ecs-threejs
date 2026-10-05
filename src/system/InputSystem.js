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

            input.clearFrameFrags();

            const left = (this.keys['KeyA'] || this.keys['ArrowLeft']) ? 1 : 0;
            const right = (this.keys['KeyD'] || this.keys['ArrowRight']) ? 1 : 0;
            const up = (this.keys['KeyW'] || this.keys['ArrowUp']) ? 1 : 0;
            const down = (this.keys['KeyS'] || this.keys['ArrowDown']) ? 1 : 0;

            input.moveX = right - left;
            input.moveZ = down - up;

            input.runHeld = !!(this.keys['ShiftLeft'] || this.keys['ShiftRight']);
            const jumpNow = !!this.keys['Space'];
            if (jumpNow && !input.jumpHeld) {
                input.jumpPressed = true;
                input.jumpBufferTimer = 0; // start the buffer
            }
            if (!jumpNow && input.jumpHeld) {
                input.jumpReleased = true;
            }
            input.jumpHeld = jumpNow;

            if(input.jumpBufferTimer !== null){
                input.jumpBufferTimer += deltaTime;
            }
            
        }
    }
}
