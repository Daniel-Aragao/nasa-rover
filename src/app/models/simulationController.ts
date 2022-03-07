import { commandSizes } from '../enums/commandSizes';
import { Directions } from '../enums/directions';
import { Movement } from '../enums/movement';
import { Direction } from '../interfaces/models/direction';
import { IEntity } from '../interfaces/models/ientity';
import { Output } from '../interfaces/models/output';
import { Board } from './board';

export class SimulationController {
  private board: Board | undefined;
  private rover: IEntity | undefined;

  get boardSize() {
    return this.board?.gridSize;
  }

  get roverDirection() {
    return this.rover?.direction;
  }

  get grid() {
    return this.board?.grid;
  }

  /**
   *
   */
  constructor() {}

  run(command: string): Output {
    let chars = command.split('');

    chars = chars.filter((char) => char.trim());

    if (chars.length) {
      if (isNaN(Number(chars[0]))) {
        return this.readMovements(chars);
      } else {
        if (chars.length == commandSizes.createGrid) {
          return this.createBoard(chars);
        } else if (chars.length == commandSizes.direction) {
          return this.readDirection(chars);
        }
      }
    }

    return {
      type: 'invalid',
      value: command,
    };
  }
  private createBoard(chars: string[]): Output {
    this.board = new Board({ X: Number(chars[0]), Y: Number(chars[1]) });

    return {
      type: 'simulation',
      value: `Board created ${chars.join(',')}`,
    };
  }

  private readDirection(chars: string[]): Output {
    if (!this.board) {
      return {
        type: 'missing board',
        value: chars.join(' '),
      };
    }

    if (isNaN(Number(chars[1]))) {
      return {
        type: 'invalid',
        value: chars.join(' '),
      };
    }

    if (!this.validDirection(chars[2])) {
      return {
        type: 'invalid',
        value: chars.join(' '),
      };
    }

    let direction: Direction = {
      X: Number(chars[0]),
      Y: Number(chars[1]),
      Z: chars[2] as Directions,
    };

    let entity = this.board.getCell(direction);

    if (!entity) {
      entity = this.board.createRover(direction);

      if (entity) {
        this.rover = entity;

        return {
          type: 'simulation',
          value: `Rover created ${chars.join(',')}`,
        };
      }
      return {
        type: 'invalid',
        value: chars.join(' '),
      };
    }

    this.rover = entity;

    return {
      type: 'simulation',
      value: `Rover found ${chars.join(',')}`,
    };
  }

  private readMovements(chars: string[]): Output {
    if (!this.board) {
      return {
        type: 'missing board',
        value: chars.join(' '),
      };
    }

    if (!this.validMovement(chars[0])) {
      return {
        type: 'invalid',
        value: chars.join(' '),
      };
    }

    if (!this.rover) {
      return {
        type: 'missing rover',
        value: chars.join(' '),
      };
    }

    chars
      .filter((c) => this.validMovement(c))
      .forEach((movement) => {
        this.board!.act(this.rover!.direction, movement as Movement);
      });

    return {
      type: 'rover',
      value: `${this.rover.direction.X} ${this.rover.direction.Y} ${this.rover.direction.Z}`,
    };
  }

  private validDirection(direction: string) {
    return !!Object.keys(Directions).find((d) => d === direction);
  }

  private validMovement(movement: string) {
    return !!Object.keys(Movement).find((d) => d === movement);
  }

  reset() {
    this.board = undefined;
    this.rover = undefined;
  }
}
