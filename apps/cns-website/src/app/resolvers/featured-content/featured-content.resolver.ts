import { ResolveFn } from '@angular/router';
import { FeaturedData, FeaturedDataSchema } from '../../schemas/featured.schema';
import { createJsonResolver } from '../json-resolver.util';

/** URL for the featured content JSON data */
const FEATURED_CONTENT_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-featured.json';

/**
 * Creates a resolver that fetches featured content data from the external JSON source
 *
 * @param url Optional custom URL for the featured content data
 * @returns A resolver function that fetches and validates featured content data
 */
export function createFeaturedContentResolver(url: string = FEATURED_CONTENT_URL): ResolveFn<FeaturedData> {
  return createJsonResolver(url, FeaturedDataSchema);
}
