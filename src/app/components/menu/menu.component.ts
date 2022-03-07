import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Directions } from 'src/app/enums/directions';
import { Direction } from 'src/app/interfaces/models/direction';
import { Position } from 'src/app/interfaces/models/position';
import { Rover } from 'src/app/models/rover';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() resetBoard = new EventEmitter<void>();
  @Output() action = new EventEmitter<string>();
  @Input() board: Position | undefined;
  @Input() rover: Direction | undefined;

  delay = 100;
  command: string;
  running = false;

  constructor() {
    this.command = '';
  }

  ngOnInit(): void {}

  act() {
    this.running = true;
    let commands = this.command.trim().split('\n');

    commands.forEach((command, i) => {
      setTimeout(() => {
        try {
          if (command) {
            this.singleAction(command);
          }
        } finally {
          if (i >= commands.length - 1) {
            this.running = false;
            this.command = '';
          }
        }
      }, this.delay * i);
    });
  }

  singleAction(command: string) {
    this.action.emit(command);
  }

  reset() {
    this.resetBoard.emit();
    this.running = false;
    this.command = '';
    this.delay = 100;
  }
}
