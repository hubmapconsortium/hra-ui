import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { PublicationsPageData } from './publications-page.schema';

/** Resolver for publications */
export const publicationsResolver: ResolveFn<Observable<PublicationsPageData>> = () => {
  return inject(HttpClient).get<PublicationsPageData>('https://cns.iu.edu/publications.json?sort=hra', {
    responseType: 'json',
  });
};
