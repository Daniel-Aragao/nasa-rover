import { Component, OnInit, Input } from '@angular/core';
import { Direction } from 'src/app/interfaces/models/direction';
import { Position } from 'src/app/interfaces/models/position';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss'],
})
export class RoverComponent implements OnInit {
  @Input() rover: Direction | undefined;

  get Z() {
    return this.rover?.Z;
  }

  get X() {
    return this.rover?.X;
  }

  get Y() {
    return this.rover?.Y;
  }

  constructor() {}

  ngOnInit(): void {}
}
