import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return a random number between 2 given values', () => {
    const min = 3;
    const max = 16;

    const random = component.getRandomInt(min, max);

    expect(random).toBeGreaterThanOrEqual(min);
    expect(random).toBeLessThanOrEqual(max);
  });

  it('Should set a flag in cell given by x and y coordenates', () =>{
    const x = 4;
    const y = 7;

    component.flag(x,y)

    expect(component.cells[x][y].status).toBe('flag')

  });

  it('Should open a cell which has a flag', () =>{
    const x = 4;
    const y = 7;

    component.cells[x][y].status = 'flag';

    component.flag(x,y)

    expect(component.cells[x][y].status).toBe('open')

  });

  it('Should create a matrix with x amount of valid mine coordinates for an n x n matrix ', () => {
    let x = 10;
    let n = 9;
    let minesLocation = component.getMinesLocation(x,n);

    let hasLenghtDifferentThan2 = false;

    for (const mineCell of minesLocation) {
      if (mineCell.length != 2) {
        hasLenghtDifferentThan2 = true;
        break;
      }
    }

    expect(minesLocation.length).toBe(x);
    expect(hasLenghtDifferentThan2).toBeFalsy;

  });

  it('Should end the game as losed if the clicked cell has a mine',() => {

    let x = 0;
    let y = 0;
    
    let cellWithMine = component.cells[x][y];
    cellWithMine.hasMine = true;

    component.open(x, y);
    expect(component.gameStatus).toBe('lose')

  });

  it('Should win the game if there are no cells left ', () => {
    let x = 0;
    let y = 0;

    component.remainingCells = 1;
    let clearCell = component.cells[x][y];
    clearCell.status = 'open';

    component.open(x,y);
    expect(component.gameStatus).toBe('win')

  });

  it('Should clear the clicked cell and the nearby cells with 0', () => {
    let x = 0;
    let y = 0;

    component.remainingCells = 1;
    let cellWithNoMine = component.cells[x][y];
    cellWithNoMine.hasMine = false;
    cellWithNoMine.minesAround = 0;


    component.open(x,y);

    for(const peer of component.adjacentCells) {
      if (
        component.cells[component.cells[x][y].row + peer[0]] &&
        component.cells[component.cells[x][y].row + peer[0]][component.cells[x][y].col + peer[1]]
      ) {
        expect(component.cells[x + peer[0]][y + peer[1]].status).toBe('clear')
      }
    }


  });



});
