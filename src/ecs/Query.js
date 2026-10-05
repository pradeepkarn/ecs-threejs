export class Query {
    static entitiesWith(world, ...componentClasses) {
        return [...world.entities].filter(entity =>
            componentClasses.every(componentClass =>
                world.hasComponent(entity, componentClass)
            )
        );
    }
}