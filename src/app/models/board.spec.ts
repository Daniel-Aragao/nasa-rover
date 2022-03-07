import { Directions } from 'src/app/enums/directions';
import { Movement } from 'src/app/enums/movement';
import { Position } from 'src/app/interfaces/models/position';
import { Board } from 'src/app/models/board';
import { Rover } from 'src/app/models/rover';

describe('Board model creation', function () {
  let gridSize: Position = {
    X: 5,
    Y: 5,
  };

  it('should return a correct gridSize', function () {
    let board = new Board(gridSize);

    expect(board.gridSize.X).toBe(gridSize.X);
    expect(board.gridSize.Y).toBe(gridSize.Y);
  });

  it('should return always a different reference for gridSize', function () {
    let board = new Board(gridSize);

    expect(board.gridSize === board.gridSize).toBeFalse();
  });
});

describe('Board createRover method', function () {
  let gridSize: Position = {
    X: 5,
    Y: 5,
  };

  let board: Board;

  beforeEach(() => {
    board = new Board(gridSize);
  });

  it('should not create a rover in X:6 Y:5 Z:N', function () {
    let rover = board.createRover({
      X: gridSize.X + 1,
      Y: gridSize.Y,
      Z: Directions.N,
    });

    expect(rover).toBeUndefined();
  });

  it('should not create a rover in X:5 Y:6 Z:N', function () {
    let rover = board.createRover({
      X: gridSize.X,
      Y: gridSize.Y + 1,
      Z: Directions.N,
    });

    expect(rover).toBeUndefined();
  });

  it('should not create a rover in X:-1 Y:5 Z:N', function () {
    let rover = board.createRover({
      X: -1,
      Y: gridSize.Y,
      Z: Directions.N,
    });

    expect(rover).toBeUndefined();
  });

  it('should not create a rover in X:5 Y:-1 Z:N', function () {
    let rover = board.createRover({
      X: gridSize.X,
      Y: -1,
      Z: Directions.N,
    });

    expect(rover).toBeUndefined();
  });

  it('should create a rover in X:5 Y:5 Z:N', function () {
    let rover = board.createRover({ ...gridSize, Z: Directions.N });

    expect(rover?.direction.X).toBe(gridSize.X);
    expect(rover?.direction.Y).toBe(gridSize.Y);
    expect(rover?.direction.Z).toBe(Directions.N);
  });

  it('should not create two rover in X:5 Y:5 Z:N', function () {
    let rover1 = board.createRover({ ...gridSize, Z: Directions.N });
    let rover2 = board.createRover({ ...gridSize, Z: Directions.N });

    expect(rover1).toBeTruthy();
    expect(rover2).toBeUndefined();
  });
});

describe('Board getCell method', function () {
  let gridSize: Position = {
    X: 5,
    Y: 5,
  };

  let board: Board;
  let rover: Rover;

  beforeEach(() => {
    board = new Board(gridSize);
    rover = board.createRover({ ...gridSize, Z: Directions.N })!;
  });

  it('should not return the default rover in X:5 Y:6', function () {
    let roverTest = board.getCell({ X: 5, Y: 6 });

    expect(roverTest).toBeUndefined();
  });

  it('should return the default rover', function () {
    let roverTest = board.getCell(gridSize);

    expect(roverTest).toBe(rover);
  });
});

describe('Board act method', function () {
  let gridSize: Position = {
    X: 5,
    Y: 5,
  };

  let board: Board;
  let rover: Rover;
  let defaultDirection = { X: 3, Y: 3, Z: Directions.N };

  beforeEach(() => {
    board = new Board(gridSize);
    rover = board.createRover(defaultDirection)!;
  });

  it('with default rover should return the direction X:3 Y:4 Z:N with movement M', function () {
    let newDirection = board.act(rover.direction, Movement.M);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(4);
    expect(newDirection?.Z).toBe(Directions.N);
  });

  it('with default rover should return the direction X:3 Y:5 Z:N with 5 movements M', function () {
    let newDirection = board.act(rover.direction, Movement.M);
    newDirection = board.act(rover.direction, Movement.M);
    newDirection = board.act(rover.direction, Movement.M);
    newDirection = board.act(rover.direction, Movement.M);
    newDirection = board.act(rover.direction, Movement.M);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(5);
    expect(newDirection?.Z).toBe(Directions.N);
  });

  it('with default rover should return the direction X:3 Y:3 Z:W with movement L', function () {
    let newDirection = board.act(rover.direction, Movement.L);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.W);
  });

  it('with default rover should return the direction X:3 Y:3 Z:E with movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.E);
  });

  it('with default rover should return the direction X:3 Y:3 Z:E with movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.E);
  });

  it('with default rover should return the direction X:3 Y:3 Z:E with movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.E);
  });

  it('with default rover should return the direction X:3 Y:3 Z:S with 1x movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.E);
  });

  it('with default rover should return the direction X:3 Y:3 Z:S with 2x movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.S);
  });

  it('with default rover should return the direction X:3 Y:3 Z:W with 3x movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.W);
  });

  it('with default rover should return the direction X:3 Y:3 Z:N with 4x movement R', function () {
    let newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);
    newDirection = board.act(rover.direction, Movement.R);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.N);
  });

  it('with default rover should return the direction X:3 Y:3 Z:S with 1x movement L', function () {
    let newDirection = board.act(rover.direction, Movement.L);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.W);
  });

  it('with default rover should return the direction X:3 Y:3 Z:S with 2x movement L', function () {
    let newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.S);
  });

  it('with default rover should return the direction X:3 Y:3 Z:W with 3x movement L', function () {
    let newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.E);
  });

  it('with default rover should return the direction X:3 Y:3 Z:N with 4x movement L', function () {
    let newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);
    newDirection = board.act(rover.direction, Movement.L);

    expect(newDirection?.X).toBe(3);
    expect(newDirection?.Y).toBe(3);
    expect(newDirection?.Z).toBe(Directions.N);
  });
});
