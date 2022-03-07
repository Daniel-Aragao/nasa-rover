import { Position } from "./position";
import { IEntity } from "./ientity";
import { Direction } from "./direction";
import { Movement } from "../../enums/movement";

export interface IBoard {
    get gridSize(): Position;
    getCell(point: Position): IEntity | undefined;
    createRover(direction: Direction): IEntity | undefined;
    act(
        point: Position,
        movement: Movement,
        create: boolean
    ): Direction | undefined;
}
