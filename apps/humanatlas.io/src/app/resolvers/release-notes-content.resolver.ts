import { Location } from '@angular/common';
import { ResolveFn } from '@angular/router';

import { ContentPageData, ContentPageDataSchema } from '../schemas/content-page/content-page.schema';
import { createYamlSpecResolver } from './spec.resolver';

/**
 * Creates resolver for getting release notes content
 * @param baseUrl Base URL for the path
 * @returns Content resolver function
 */
export function createReleaseNotesContentResolver(baseUrl: string): ResolveFn<ContentPageData> {
  return (route, state) => {
    const version = route.params['version'] as string;
    const url = Location.joinWithSlash(baseUrl, `${version}.yaml`);
    const resolver = createYamlSpecResolver(url, ContentPageDataSchema);
    return resolver(route, state);
  };
}
