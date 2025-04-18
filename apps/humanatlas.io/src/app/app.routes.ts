import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn, Route } from '@angular/router';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';

/** An interface representing the page definitions */
export interface PageDef {
  /** Details of the page element */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/** Resolver for landing page data */
export const landingPageResolver: ResolveFn<Observable<PageDef[]>> = () => {
  return inject(HttpClient)
    .get(`assets/content/pages-v2/landing-page.yaml`, {
      observe: 'body',
      responseType: 'text',
    })
    .pipe(map((yamlString) => load(yamlString) as PageDef[]));
};

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      data: landingPageResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
