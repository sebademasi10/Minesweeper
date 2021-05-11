import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILocationMap } from 'src/app/interfaces/location-map';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() baseNumberOfTiles = 9;
  @Input() numberOfMines = 10;

  remainingMines: number = 0;
  loaded: boolean = false;

  @ViewChild('loseModal') loseModal: ElementRef;

  pressed: boolean = false;
  gameStatus: string = 'playing';

  closeResult: string = '';

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

  constructor(
    private modalService: NgbModal,
    public router: Router
    ) { 
  }

  ngOnInit(): void {
    this.initializeBoard();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }
  
  initializeBoard() {
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
    this.gameStatus = 'playing';
    this.remainingCells = Math.pow(this.baseNumberOfTiles, 2) - this.numberOfMines;
    this.remainingMines = this.numberOfMines;
  }


  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  putMines() {

    let minesLocation = this.getMinesLocation(this.numberOfMines, this.baseNumberOfTiles);
    
    
    for (const cell of minesLocation) {
      this.cells[cell[0]][cell[1]].hasMine = true; 
    }


  }

  getMinesLocation(numberOfMines: number, baseNumberOfTiles: number): number [][] {
    let minesLocation: number [][] = [];

    let locationMap: ILocationMap = {
    }
    

    for (let index = 0; index < numberOfMines; index++) {

      let rowIndex = this.getRandomInt(0,baseNumberOfTiles - 1);
      let colIndex = this.getRandomInt(0,baseNumberOfTiles - 1);

      let hashedLocation = `${rowIndex}-${colIndex}`

      while (locationMap[hashedLocation]) {
        rowIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);
        colIndex = this.getRandomInt(0,this.baseNumberOfTiles - 1);
        hashedLocation = `${rowIndex}-${colIndex}`

      }

      locationMap[hashedLocation] = true;
      
      minesLocation.push([rowIndex,colIndex]);
    }

    return minesLocation;
  }

  

  openModal() {
    this.modalService.open(this.loseModal);
  }

  flag(x: number, y:number) {
    if (this.cells[x][y].status === 'flag') {
      this.cells[x][y].status = 'open';
        this.remainingMines += 1
    } else {
      this.cells[x][y].status = 'flag';
        this.remainingMines -= 1
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
      this.gameStatus = 'lose';
      this.openModal();
      return 'lose';
    } else {
      this.cells[x][y].status = 'clear';
      if (this.remainingCells-- <= 1) {
        this.gameStatus = 'win';
        this.revealAll();
        this.openModal();
      }
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
