import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FtuComponent } from './pages/ftu-page/ftu.component';
import { LandingComponent } from './pages/landing-page/landing.component';
import { ftuResolver } from './pages/ftu-page/ftu.resolver';

export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'ftu',
    component: FtuComponent,
    data: {
      name: 'ftu',
    },
    resolve: {
      id: ftuResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
