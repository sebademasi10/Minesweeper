import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SetupComponent } from './pages/setup/setup.component';

const routes: Routes = [
  {path: 'setup', component: SetupComponent},
  {path: 'game', component: GameComponent},
  {path: '', redirectTo: 'setup', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
