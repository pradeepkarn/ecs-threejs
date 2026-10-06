import { Component } from '../ecs/Component.js';

export class ColliderAABB extends Component {
    constructor(halfX = 0, halfY = 0, halfZ = 0) {
        super();
        this.halfX = halfX;
        this.halfY = halfY;
        this.halfZ = halfZ;
       
    }
}