import { Component } from '../ecs/Component.js';
export class Input extends Component {
    constructor() {
        super();
        // Axis intent (raw) in range -1 to 1
        this.moveX = 0;
        this.moveY = 0;
        // Button intent (raw) in range 0 to 1
        this.runHeld = false;
        this.jumpHeld = false;

        this.jumpPressed = false; // true only if key was pressed
        this.jumpReleased = false; // true only if key was released

        // timestamp-style a simple timer for jump buffering
        this.jumpBufferTime = 0;
    }
    // calls once per frame to reset the jumpPressed and jumpReleased flags
    clearFrameFlags() {
        this.jumpPressed = false;
        this.jumpReleased = false;
    }
}