import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { CdeVisualizationComponent } from '@hra-ui/cde-visualization';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { provideIcons } from './services/icon-registry/icon-registry.service';
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
    path: 'visualize',
    loadComponent: () => CdeVisualizationComponent,
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
  providers: [provideRouter(routes), provideHttpClient(), provideIcons(ICON_DEFINITIONS), provideAnimations()],
};
