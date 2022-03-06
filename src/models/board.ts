import { Directions } from "../enums/directions";
import { Movement } from "../enums/movement";
import { Direction } from "../interfaces/models/direction";
import { IBoard } from "../interfaces/models/iboard";
import { IEntity } from "../interfaces/models/ientity";
import { Position } from "../interfaces/models/position";
import { Rover } from "./rover";

export class Board implements IBoard {
    private positionGrid: {
        [x: number]: { [y: number]: IEntity };
    } = {};

    get gridSize(): Position {
        return { ...this._gridSize };
    }

    constructor(private _gridSize: Position) {}

    private validPosition(point: Position) {
        return (
            point.X <= this._gridSize.X &&
            point.X >= 0 &&
            point.Y <= this._gridSize.Y &&
            point.Y >= 0
        );
    }

    getCell(point: Position): IEntity | undefined {
        return this.positionGrid[point.X]?.[point.Y];
    }

    createRover(direction: Direction): Rover | undefined {
        if (this.validPosition(direction) && !this.getCell(direction)) {
            if (!this.positionGrid[direction.X]) {
                this.positionGrid[direction.X] = {};
            }

            return (this.positionGrid[direction.X][direction.Y] = new Rover(
                direction
            ));
        }
    }

    act(direction: Direction, movement: Movement): Direction | undefined {
        let entity = this.getCell(direction);

        if (entity) {
            let newDirection: Direction;

            if (movement === Movement.M) {
                newDirection = this.moveEntity(entity, movement);
            } else {
                newDirection = this.turnEntity(entity, movement);
            }

            return newDirection;
        }
    }

    private applyMovementToGrid(entity: IEntity, newDirection: Direction) {
        delete this.positionGrid[entity.direction.X][entity.direction.Y];

        if (!this.positionGrid[newDirection.X]) {
            this.positionGrid[newDirection.X] = {};
        }

        this.positionGrid[newDirection.X][newDirection.Y] = entity;
    }

    private moveEntity(entity: IEntity, movement: Movement): Direction {
        let movementRequest = entity.generateMovement(movement);
        let newDirection = movementRequest.direction;

        if (this.validPosition(newDirection)) {
            this.applyMovementToGrid(entity, newDirection);

            movementRequest.apply();

            return movementRequest.direction;
        }

        return entity.direction;
    }

    private turnEntity(entity: IEntity, movement: Movement): Direction {
        let movementRequest = entity.generateMovement(movement);

        movementRequest.apply();

        return movementRequest.direction;
    }
}
