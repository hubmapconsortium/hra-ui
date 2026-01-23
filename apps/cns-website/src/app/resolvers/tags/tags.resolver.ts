import { ResolveFn } from '@angular/router';
import { TagsData, TagsDataSchema } from '../../schemas/tags.schema';
import { createJsonResolver } from '../json-resolver.util';

/** URL for the tags JSON data */
const TAGS_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-tags.json';

/**
 * Creates a resolver that fetches tags data from the external JSON source
 *
 * @param url Optional custom URL for the tags data
 * @returns A resolver function that fetches and validates tags data
 */
export function createTagsResolver(url: string = TAGS_URL): ResolveFn<TagsData> {
  return createJsonResolver(url, TagsDataSchema);
}
