import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { ReleaseVersionData, ReleaseVersionSchema } from './release-notes-page.schema';

/** Resolver for release notes page version data */
export const ReleaseVersionResolver: ResolveFn<Observable<ReleaseVersionData[]>> = () => {
  return inject(HttpClient)
    .get(`assets/content/pages-v2/release-notes/versions.yaml`, { responseType: 'text' })
    .pipe(
      map((yamlString) => load(yamlString)),
      map((raw) => ReleaseVersionSchema.array().parse(raw)),
    );
};
