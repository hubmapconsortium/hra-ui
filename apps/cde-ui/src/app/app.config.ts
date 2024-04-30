import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { CdeVisualizationComponent } from '@hra-ui/cde-visualization';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { provideIcons } from './services/icon-registry/icon-registry.service';

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
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideIcons([
      {
        name: 'facebook',
        url: 'assets/logo/facebook.svg',
        namespace: 'social',
      },
      {
        name: 'x',
        url: 'assets/logo/x.svg',
        namespace: 'social',
      },
      {
        name: 'instagram',
        url: 'assets/logo/instagram.svg',
        namespace: 'social',
      },
      {
        name: 'youtube',
        url: 'assets/logo/youtube.svg',
        namespace: 'social',
      },
      {
        name: 'linkedin',
        url: 'assets/logo/linkedin.svg',
        namespace: 'social',
      },
      {
        name: 'email',
        url: 'assets/logo/email.svg',
        namespace: 'social',
      },
    ]),
  ],
};