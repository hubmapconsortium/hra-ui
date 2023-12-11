import { z } from 'zod';

/** Any url */
export const URL = z.string().url().brand('URL');

/** Same as an URL */
export const IRI = URL.brand('IRI');

/** Any url */
export type Url = z.infer<typeof URL>;

/** Same as an Url */
export type Iri = z.infer<typeof IRI>;

/**
 * Returns url with base href value
 * @param url url
 * @param baseHref base href
 * @returns updated url
 */
export function setUrl(url: string, baseHref: string): Url {
  if (url.startsWith('http')) {
    return url as Url;
  } else if (baseHref !== '' && !baseHref.endsWith('/')) {
    return `${baseHref}/${url}` as Url;
  } else {
    return `${baseHref}${url}` as Url;
  }
}
