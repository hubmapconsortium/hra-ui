import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { provideIcons } from './services/icon-registry/icon-registry.service';
import { provideHttpClient } from '@angular/common/http';
import { ICON_DEFINITIONS } from './shared/icon-definitions';

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
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideIcons(ICON_DEFINITIONS)],
};
