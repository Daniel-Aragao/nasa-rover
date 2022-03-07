import { Component, OnInit, Input } from '@angular/core';
import { Output } from 'src/app/interfaces/models/output';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  @Input() outputs: Output[] = [];
  onlyRover = false;

  constructor() {}

  ngOnInit(): void {}

  invalid(output: Output) {
    return output.type != 'rover' && output.type != 'simulation';
  }
}
