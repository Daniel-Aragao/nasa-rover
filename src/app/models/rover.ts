import { Direction } from "../interfaces/models/direction";
import { Entity } from "./entity";

export class Rover extends Entity {
    /**
     *
     */
    constructor(direction: Direction) {
        super(direction, `Rover ${Entity.nameGenerator()}`);
    }
}
