import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Direction } from 'src/app/interfaces/models/direction';
import { Grid } from 'src/app/interfaces/models/grid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() grid: Grid<Direction | undefined> | undefined;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.table(this.grid);
  }

  ngOnInit(): void {}

  calcWidth(boardWidth: number) {
    if (this.grid) {
      return Math.floor(boardWidth / this.grid?.[0]?.length) - 15;
    }

    return 0;
  }

  Y(i: number) {
    return (this.grid?.length || 0) - i - 1;
  }

  X(j: number) {
    return j;
  }
}
