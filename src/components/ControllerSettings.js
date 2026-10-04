import { Component } from '../ecs/Component.js';
export class ControllerSettings extends Component {
    constructor() {
        super();
        // movement settings
        this.walkSpeed = 3;
        this.runSpeed = 6;
        this.acceleration = 25;

        // jump settings
        this.jumpSpeed = 7;
        this.jumpBufferSeconds = 0.12; // press jump slightly early
        this.coyoteSeconds = 0.10; // Jump after leaving the ground for this many seconds
    }
   
}