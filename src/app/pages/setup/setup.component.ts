import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDifficult } from 'src/app/interfaces/difficult';
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {


  form: FormGroup;

  difficultSelected: boolean = false;
  sizes: string [] = [
    '9 x 9',
    '18 x 18',
    '27 x 27'
  ]

  difficults: IDifficult [] = [
    {name: 'Easy', minesPercent: 12.35},
    {name: 'Medium', minesPercent: 15.63},
    {name: 'Hard', minesPercent: 20.63},
  ]

  constructor(
    private gameService: GameService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.form = this.fb.group({
        Size: [0],
        Difficult: [12.35]
      })
  }

  calculateNumberOfTiles(amount: number): number {
    return (amount + 1) * 9
  }

  
  start() {
    let numberOfTiles = this.calculateNumberOfTiles(this.form.value.Size);
    let minesPercent = this.form.value.Difficult;
    this.gameService.setUpGame(numberOfTiles, minesPercent)

    this.router.navigate(['game'])
  }


}
