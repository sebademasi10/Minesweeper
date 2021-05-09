import { Component, OnInit } from '@angular/core';
import { IGameSetup } from 'src/app/interfaces/game-setup';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameSetup: IGameSetup;
  remainingMines: number;

  constructor(private gameService: GameService) {
    this.gameSetup = this.gameService.getGameSetup();
    this.remainingMines = this.gameSetup.numberOfMines;
   }

  ngOnInit(): void {
  }

}
