import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
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
