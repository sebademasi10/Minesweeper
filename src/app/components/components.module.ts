import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [
    BoardComponent, 
    CellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent
  ]
})
export class ComponentsModule { }
