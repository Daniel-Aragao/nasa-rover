import { Directions } from '../enums/directions';
import { Movement } from '../enums/movement';
import { Direction } from '../interfaces/models/direction';
import { MovementConfirmation } from '../interfaces/models/movementConfirmation';
import { Position } from '../interfaces/models/position';
import { IEntity } from '../interfaces/models/ientity';

export class Entity implements IEntity {
  get name() {
    return this._name;
  }

  get direction() {
    return {
      ...this._direction,
    };
  }

  private set direction(direction: Direction) {
    this._direction = { ...direction };
  }

  /**
   *
   */
  constructor(private _direction: Direction, private _name: string = '') {
    this._name = _name.length ? _name : Entity.nameGenerator();
  }

  static nameGenerator(size = 5) {
    let name = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charsLength = chars.length;

    for (let i = 0; i < size; i++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }

    return name;
  }

  generateMovement(movement: Movement): MovementConfirmation {
    let newDirection = this.direction;

    if (Movement.M == movement) {
      let position = this.move();

      newDirection.X = position.X;
      newDirection.Y = position.Y;
    } else {
      newDirection.Z = this.turn(movement);
    }

    return {
      apply: () => (this.direction = newDirection),
      direction: { ...newDirection },
    };
  }

  private turn(movement: Movement): Directions {
    let directions = [Directions.N, Directions.E, Directions.S, Directions.W];

    let moveCursor =
      movement == Movement.R ? 1 : movement == Movement.L ? -1 : 0;

    let cursor = directions.indexOf(this._direction.Z);

    cursor = cursor + moveCursor;

    cursor = cursor > -1 ? cursor : directions.length - 1;
    cursor = cursor <= directions.length - 1 ? cursor : 0;

    return directions[cursor];
  }

  private move(): Position {
    let xMove = 0;
    let yMove = 0;

    if (this._direction.Z === Directions.E) {
      xMove += 1;
    } else if (this._direction.Z === Directions.W) {
      xMove -= 1;
    } else if (this._direction.Z === Directions.N) {
      yMove += 1;
    } else if (this._direction.Z === Directions.S) {
      yMove -= 1;
    }

    return {
      X: this._direction.X + xMove,
      Y: this._direction.Y + yMove,
    };
  }
}
