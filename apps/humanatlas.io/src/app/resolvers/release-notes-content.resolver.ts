import { Location } from '@angular/common';
import { ResolveFn } from '@angular/router';
import { ContentPageData, ContentPageDataSchema } from '../pages/content-page/types/content-page.schema';
import { createYamlSpecResolver } from './spec.resolver';

export function createReleaseNotesContentResolver(baseUrl: string): ResolveFn<ContentPageData> {
  return (route, state) => {
    const version = route.params['version'] as string;
    const url = Location.joinWithSlash(baseUrl, `${version}.yaml`);
    const resolver = createYamlSpecResolver(url, ContentPageDataSchema);
    return resolver(route, state);
  };
}
