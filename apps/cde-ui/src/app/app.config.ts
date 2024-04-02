import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

/**
 * App routes
 */
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

/**
 * Set of config options available during the application bootstrap operation.
 */ import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};
