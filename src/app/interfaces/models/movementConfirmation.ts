import { Direction } from "./direction";

export interface MovementConfirmation {
    direction: Direction;
    apply(): void;
}
