import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import { z } from 'zod';

export function createYamlSpecResolver<T extends z.ZodTypeAny>(file: string, spec: T): ResolveFn<z.infer<T>> {
  return () => {
    const http = inject(HttpClient);
    const assetsHref = inject(APP_ASSETS_HREF);
    const url = Location.joinWithSlash(assetsHref(), file);
    return http.get(url).pipe(
      map((data) => load(data, { filename: file })),
      map((data) => spec.parse(data)),
    );
  };
}
