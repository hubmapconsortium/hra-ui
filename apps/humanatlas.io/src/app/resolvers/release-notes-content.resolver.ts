import { ResolveFn } from '@angular/router';
import { joinWithSlash } from '@hra-ui/common/url';
import { ContentPageData, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';

/**
 * Creates resolver for getting release notes content
 * @param baseUrl Base URL for the path
 * @returns Content resolver function
 */
export function createReleaseNotesContentResolver(baseUrl: string): ResolveFn<ContentPageData> {
  return (route, state) => {
    const version = route.params['version'] as string;
    const url = joinWithSlash(baseUrl, `${version}.yaml`);
    const resolver = createYamlSpecResolver(url, ContentPageDataSchema);
    return resolver(route, state);
  };
}
