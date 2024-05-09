import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { CreateVisualizationPageComponent } from './pages/create-visualization-page/create-visualization-page.component';
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
    path: 'create',
    loadComponent: () => CreateVisualizationPageComponent,
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
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), provideIcons(ICON_DEFINITIONS)],
};
