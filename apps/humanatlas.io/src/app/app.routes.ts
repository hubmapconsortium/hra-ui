import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn, Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';

/** Resolver for publications */
export const publicationsResolver: ResolveFn<Record<string, string[]>> = () => {
  return inject(HttpClient).get<Record<string, string[]>>('https://cns.iu.edu/publications.json?sort=hra', {
    responseType: 'json',
  });
};

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: publicationsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
