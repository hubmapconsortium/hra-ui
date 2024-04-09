import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { provideIcons } from './services/icon-registry/icon-registry.service';
import { provideHttpClient } from '@angular/common/http';

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
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideIcons([
      {
        name: 'facebook',
        url: '../assets/logo/facebook.svg',
      },
      {
        name: 'x',
        url: '../assets/logo/x.svg',
      },
      {
        name: 'instagram',
        url: '../assets/logo/instagram.svg',
      },
      {
        name: 'youtube',
        url: '../assets/logo/youtube.svg',
      },
      {
        name: 'linkedin',
        url: '../assets/logo/linkedin.svg',
      },
      {
        name: 'email',
        url: '../assets/logo/email.svg',
      },
    ]),
  ],
};
