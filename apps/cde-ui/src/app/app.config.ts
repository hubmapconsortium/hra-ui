import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => LandingPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
