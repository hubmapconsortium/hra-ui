import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FtuComponent } from './pages/ftu-page/ftu.component';
import { LandingComponent } from './pages/landing-page/landing.component';
import { ftuResolver } from './pages/ftu-page/ftu.resolver';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingComponent,
  },
  {
    path: 'ftu',
    resolve: {
      id: ftuResolver,
    },
    loadComponent: () => FtuComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
