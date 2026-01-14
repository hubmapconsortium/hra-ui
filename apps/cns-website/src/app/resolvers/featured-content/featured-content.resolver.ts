import { ResolveFn } from '@angular/router';
import { FeaturedContentData, FeaturedContentDataSchema } from '../../schemas/featured-content/featured-content.schema';
import { createJsonResolver } from '../json-resolver.util';

/** URL for the featured content JSON data */
const FEATURED_CONTENT_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-featured.json';

/**
 * Creates a resolver that fetches featured content data from the external JSON source
 *
 * @param url Optional custom URL for the featured content data
 * @returns A resolver function that fetches and validates featured content data
 */
export function createFeaturedContentResolver(url: string = FEATURED_CONTENT_URL): ResolveFn<FeaturedContentData> {
  return createJsonResolver(url, FeaturedContentDataSchema);
}
