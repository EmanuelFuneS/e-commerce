import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'about',
    component: LandingComponent,
  },
  {
    path: 'detail/:id',
    component: GameDetailComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
