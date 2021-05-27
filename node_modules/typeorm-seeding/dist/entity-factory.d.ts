import { ObjectType } from 'typeorm';
import { FactoryFunction, EntityProperty } from './types';
export declare class EntityFactory<Entity, Context> {
    name: string;
    entity: ObjectType<Entity>;
    private factory;
    private context?;
    private mapFunction;
    constructor(name: string, entity: ObjectType<Entity>, factory: FactoryFunction<Entity, Context>, context?: Context);
    /**
     * This function is used to alter the generated values of entity, before it
     * is persist into the database
     */
    map(mapFunction: (entity: Entity) => Promise<Entity>): EntityFactory<Entity, Context>;
    /**
     * Make a new entity, but does not persist it
     */
    make(overrideParams?: EntityProperty<Entity>): Promise<Entity>;
    /**
     * Create makes a new entity and does persist it
     */
    create(overrideParams?: EntityProperty<Entity>): Promise<Entity>;
    makeMany(amount: number, overrideParams?: EntityProperty<Entity>): Promise<Entity[]>;
    createMany(amount: number, overrideParams?: EntityProperty<Entity>): Promise<Entity[]>;
    seed(overrideParams?: EntityProperty<Entity>): Promise<Entity>;
    seedMany(amount: number, overrideParams?: EntityProperty<Entity>): Promise<Entity[]>;
    private makeEnity;
    private resolveEntity;
}
