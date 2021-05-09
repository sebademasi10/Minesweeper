import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() baseNumberOfTiles = 9;
  @Input() numberOfMines = 10;

  pressed: boolean = false;
  gameStatus: string = 'playing';

  adjacentCells: number[][] = [
    [-1, -1], 
    [-1, 0], 
    [-1, 1], 
    [0, -1], 
    [0, 1], 
    [1, -1], 
    [1, 0], 
    [1, 1]
  ]; 
  
  remainingCells: number = 0;
  minesCount: number = 0;

  cells: CellComponent [][] = [];

  constructor() { }

  ngOnInit(): void {
    for (let y = 0; y < this.baseNumberOfTiles; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.baseNumberOfTiles; x++) {
        this.cells[y][x] = new CellComponent();
        this.cells[y][x].row = y;
        this.cells[y][x].col = x;
      }
    }
    this.putMines();
    this.setNumberOfAdjacentMines();
    
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private putMines() {

    let minesLocation: number [][] = [];

    for (let index = 0; index < this.numberOfMines; index++) {
      let rowIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);
      let colIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);

      while (minesLocation.some( cell => cell.includes(rowIndex,colIndex))) {
        rowIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);
        colIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);
      }
      
      minesLocation.push([rowIndex,colIndex]);
    }
    console.log(minesLocation.length);
    console.log(minesLocation);

    for (const cell of minesLocation) {
      this.cells[cell[0]][cell[1]].hasMine = true; 
    }

  }

  flag(x: number, y:number) {
    if (this.cells[x][y].status === 'flag') {
      this.cells[x][y].status = 'open';
      if (this.cells[x][y].hasMine) {
        this.numberOfMines += 1
      }
    } else {
      this.cells[x][y].status = 'flag';
      if (this.cells[x][y].hasMine) {
        this.numberOfMines -= 1
      }
    }
  }

  setNumberOfAdjacentMines() {
    for (let y = 0; y < this.baseNumberOfTiles; y++) {
      for (let x = 0; x < this.baseNumberOfTiles; x++) {
        let adjacentMines = 0;
        for (const peer of this.adjacentCells) {
          if (
            this.cells[y + peer[0]] &&
            this.cells[y + peer[0]][x + peer[1]] &&
            this.cells[y + peer[0]][x + peer[1]].hasMine
          ) {
            adjacentMines++;
          }
        }
        this.cells[y][x].minesAround = adjacentMines;

        if (this.cells[y][x].hasMine) {
          this.minesCount++;
        }
      }
    }
  }

  open(x: number, y: number): string | undefined | void {
    if (this.cells[x][y].status !== 'open') {
      return;
    } else if (this.cells[x][y].hasMine) {
      this.revealAll();
      this.gameStatus = 'gameover';
      return 'gameover';
    } else {
      this.cells[x][y].status = 'clear';

      if(this.cells[x][y].minesAround === 0) {
        for(const peer of this.adjacentCells) {
          if (
            this.cells[this.cells[x][y].row + peer[0]] &&
            this.cells[this.cells[x][y].row + peer[0]][this.cells[x][y].col + peer[1]]
          ) {
            this.open(x + peer[0],y + peer[1]);
          }
        }
      }
    }
  }

  revealAll() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.status === 'open') {
          cell.status = 'clear';
        }
      }
    }
  }

}
