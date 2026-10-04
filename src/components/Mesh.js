import { Component } from '../ecs/Component.js';
export class Mesh extends Component {
    constructor(mesh) {
        super();
        this.mesh = mesh;
    }
}