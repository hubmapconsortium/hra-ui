import { Location } from '@angular/common';
import { ResolveFn } from '@angular/router';
import { createYamlSpecResolver } from '../../../resolvers/spec.resolver';
import { ReleaseNotesContent, ReleaseNotesContentSchema } from '../types/content.schema';

export function createReleaseNotesContentResolver(baseUrl: string): ResolveFn<ReleaseNotesContent> {
  return (route, state) => {
    const version = route.params['version'] as string;
    const url = Location.joinWithSlash(baseUrl, `${version}.yaml`);
    const resolver = createYamlSpecResolver(url, ReleaseNotesContentSchema);
    return resolver(route, state);
  };
}
