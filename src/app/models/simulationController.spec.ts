import { SimulationController } from './simulationController';

describe('running simulation command(s)', () => {
  let simulation: SimulationController;

  beforeEach(() => {
    simulation = new SimulationController();
  });

  it("'5 5' should create a board of size 5:5", () => {
    let output = simulation.run('5 5');

    expect(output.type).toBe('simulation');
    expect(simulation.boardSize).toEqual({ X: 5, Y: 5 });
  });

  it("'75' should create a board of size 7:5", () => {
    let output = simulation.run('75');

    expect(output.type).toBe('simulation');
    expect(simulation.boardSize).toEqual({ X: 7, Y: 5 });
  });

  it("'L' should return missing board", () => {
    let output = simulation.run('L');

    expect(output.type).toBe('missing board');
  });

  it("'55','1' should return invalid", () => {
    let output = simulation.run('55');
    output = simulation.run('1');

    expect(output.type).toBe('invalid');
    expect(output.value).toBe('1');
  });

  it("'55','1 C N' should return invalid", () => {
    let output = simulation.run('55');
    output = simulation.run('1 C N');

    expect(output.type).toBe('invalid');
    expect(output.value).toBe('1 C N');
  });

  it("'55','C C N' should return invalid", () => {
    let output = simulation.run('55');
    output = simulation.run('C C N');

    expect(output.type).toBe('invalid');
    expect(output.value).toBe('C C N');
  });

  it("'55', '5 5 S','C C N' should return invalid when the first movement is not valid", () => {
    let output = simulation.run('55');
    output = simulation.run('5 5 S');
    output = simulation.run('C C N');

    expect(output.type).toBe('invalid');
    expect(output.value).toBe('C C N');
  });

  it("'55', '5 5 S','M C N' should return rover skipping invalid commands", () => {
    let output = simulation.run('55');
    output = simulation.run('5 5 S');
    output = simulation.run('M C N');

    expect(output.type).toBe('rover');
    expect(output.value).toBe('5 4 S');
  });

  it("'55', '31S','LCM' should return rover skipping invalid commands", () => {
    let output = simulation.run('55');
    output = simulation.run('31S');
    output = simulation.run('LCM');

    expect(output.type).toBe('rover');
    expect(output.value).toBe('4 1 E');
  });

  it("'55', '55S','LCM' should return rover and not move, just turn", () => {
    let output = simulation.run('55');
    output = simulation.run('55S');
    output = simulation.run('LCM');

    expect(output.type).toBe('rover');
    expect(output.value).toBe('5 5 E');
  });
});
