import { Movement } from "../../enums/movement";
import { Direction } from "./direction";
import { MovementConfirmation } from "./movementConfirmation";

export interface IEntity {
    get name(): string;
    get direction(): Direction;
    generateMovement(movement: Movement): MovementConfirmation;
}
