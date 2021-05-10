import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() hasMine: boolean = false;
  @Input() minesAround: number = 0;
  
  @Input() row: number = 0
  @Input() col: number = 0
  @Input() status: string = 'open';
  @Input() content: any = -1;
  
  pressed: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  getClasses(value: number) {
    return `opened cell cell-${value}`
  }

}
