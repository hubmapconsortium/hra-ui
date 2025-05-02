import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { AboutPageData, AboutPageDataSchema } from './about-page.schema';

/** Resolver for about page data */
export const AboutPageResolver: ResolveFn<Observable<AboutPageData[]>> = () => {
  return inject(HttpClient)
    .get(`assets/content/about-page/about.yaml`, { responseType: 'text' })
    .pipe(
      map((yamlString) => load(yamlString)),
      map((raw) => AboutPageDataSchema.array().parse(raw)),
    );
};
