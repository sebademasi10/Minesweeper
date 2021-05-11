import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() hasMine = false;
  @Input() minesAround = 0;

  @Input() row = 0;
  @Input() col = 0;
  @Input() status = 'open';
  @Input() content = -1;
  pressed = false;

  constructor() { }

  ngOnInit(): void {
  }

  getClasses(value: number): string {
    return `opened cell cell-${value}`;
  }

}
