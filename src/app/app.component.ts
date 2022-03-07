import { SimulationController } from './models/simulationController';
import { Component } from '@angular/core';
import { Output } from './interfaces/models/output';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private simulation: SimulationController;
  outputs: Output[] = [];

  get boardSize() {
    return this.simulation.boardSize;
  }

  get roverDirection() {
    return this.simulation.roverDirection;
  }

  /**
   *
   */
  constructor() {
    this.simulation = new SimulationController();
  }

  reset() {
    this.simulation.reset();
    this.outputs = [];
  }

  run(command: string) {
    let output = this.simulation.run(command);
    this.outputs.push(output);
  }
}
