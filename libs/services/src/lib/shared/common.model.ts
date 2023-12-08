import { z } from 'zod';

/** Any url */
export const URL = z.string().url().brand('URL');

/** Same as an URL */
export const IRI = URL.brand('IRI');

/** Any url */
export type Url = z.infer<typeof URL>;

/** Same as an Url */
export type Iri = z.infer<typeof IRI>;

export function setUrl(url: string, baseHref: string): Url {
  if (url.startsWith('http')) {
    return url as Url;
  } else if (baseHref !== '' && !baseHref.endsWith('/')) {
    return `${baseHref}/${url}` as Url;
  } else {
    return `${baseHref}${url}` as Url;
  }
}
