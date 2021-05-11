import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set baseNumberOfTiles and numberOfMines of gamesetup interface', () => {
    const baseNumberOfTiles = 9;
    const minesPercent = 12.35;

    service.setUpGame(baseNumberOfTiles, minesPercent);

    expect(service.gameSetup.baseNumberOfTiles).toBe(baseNumberOfTiles);
    expect(service.gameSetup.numberOfMines).toBe(10);
  });
});
