import { Grid } from 'src/app/interfaces/models/grid';
import { SimulationController } from './models/simulationController';
import { Component, OnInit } from '@angular/core';
import { Output } from './interfaces/models/output';

declare var particlesJS: {
  load: (elementId: string, configPath: string, callback: () => void) => void;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private simulation: SimulationController;
  outputs: Output[] = [];

  get boardSize() {
    return this.simulation.boardSize;
  }

  get roverDirection() {
    return this.simulation.roverDirection;
  }

  get grid() {
    return this.simulation.grid;
  }

  /**
   *
   */
  constructor() {
    this.simulation = new SimulationController();
  }
  ngOnInit(): void {
    particlesJS.load(
      'particle-container',
      'assets/particlesjs-config.json',
      function () {
        console.log('callback - particles.js config loaded');
      }
    );
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
