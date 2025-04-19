import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';

import { LandingPageData } from './landing-page.schema';

/** Resolver for landing page data */
export const landingPageResolver: ResolveFn<Observable<LandingPageData>> = () => {
  return inject(HttpClient)
    .get(`assets/content/pages-v2/landing-page.yaml`, {
      observe: 'body',
      responseType: 'text',
    })
    .pipe(map((yamlString) => load(yamlString) as LandingPageData));
};
