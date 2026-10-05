import { System } from '../ecs/System.js';
import { Query } from '../ecs/Query.js';
import { Input } from '../components/Input.js';
import { PlayerControlled } from '../components/PlayerControlled.js';
import { ControllerSettings } from '../components/ControllerSettings.js';
import { Velocity } from '../components/Velocity.js';
import { Grounded } from '../components/Grounded.js';

function moveTowards(current, target, maxDelta) {
    if (Math.abs(target - current) <= maxDelta) return target;
    return current + Math.sign(target - current) * maxDelta;
}

export class PlayerControllerSystem extends System {
    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, PlayerControlled, Input, ControllerSettings, Velocity, Grounded);
        for (const entity of entities) {
            const input = world.getComponent(entity, Input);
            const settings = world.getComponent(entity, ControllerSettings);
            const velocity = world.getComponent(entity, Velocity);
            const grounded = world.getComponent(entity, Grounded);

            // choose speed
            const speed = input.runHeld ? settings.runSpeed : settings.walkSpeed;

            // target speed 
            const mx = Number.isFinite(input.moveX) ? input.moveX : 0;
            const mz = Number.isFinite(input.moveZ) ? input.moveZ : 0;
            const targetVX = mx * speed;
            const targetVZ = mz * speed;

            // smooth acceleration
            const maxDelta = settings.acceleration * deltaTime;
            velocity.x = moveTowards(velocity.x, targetVX, maxDelta);
            velocity.z = moveTowards(velocity.z, targetVZ, maxDelta);

            // Jump logic 
            if (grounded.isGrounded) {
                grounded.coyoteTimer = 0;
            } else {
                grounded.coyoteTimer += deltaTime;
            }

            const canCoyoteJump = grounded.coyoteTimer <= settings.coyoteSeconds;
            // const canJump = input.jumpHeld && canCoyoteJump;
            const jumpBuffered = input.jumpPressed && input.jumpBufferTimer <= settings.jumpBufferSeconds;

            if (jumpBuffered && (grounded.isGrounded || canCoyoteJump)) {
                velocity.y = settings.jumpSpeed;
                grounded.isGrounded = false; //we are now aireborne
                input.jumpBufferTimer = Infinity;
                input.jumpPressed = false; //consume press
            }
            // short hop 
            if (input.jumpReleased && velocity.y > 0) {
                velocity.y *= 0.5;
            }
        }
    }
}