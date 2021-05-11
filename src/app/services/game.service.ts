import { Injectable } from '@angular/core';
import { IGameSetup } from '../interfaces/game-setup';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameSetup: IGameSetup = {
    baseNumberOfTiles: 9,
    numberOfMines: 10
  };

  constructor() { }

  setUpGame(baseNumberOfTiles: number, minesPercent: number): void {
    this.gameSetup.baseNumberOfTiles = baseNumberOfTiles;
    this.setNumberOfMines(minesPercent);
  }

  private setNumberOfMines(percent: number): void {
    const numberOfTiles = Math.pow(this.gameSetup.baseNumberOfTiles, 2);
    this.gameSetup.numberOfMines = Math.round(numberOfTiles * percent / 100);
  }

  getGameSetup(): IGameSetup {
    return this.gameSetup;
  }

}
