import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppLayoutData } from '@hra-ui/application';
import { ProjectedContentTemplate } from '@hra-ui/cdk/content-template';
import { assetUrl } from '@hra-ui/common/url';
import { map } from 'rxjs';
import z from 'zod';

/**
 * Creates resolver for publications content
 * @param url Url for fetching publications data
 * @param spec Zod schema for validating data
 * @returns publications resolver
 */
export function createPublicationsResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>> {
  return () => {
    const http = inject(HttpClient);
    return http
      .get(assetUrl(url)(), { responseType: 'json' })
      .pipe(map((data) => spec.parse(normalizePublications(data as Record<string, string[]>))));
  };
}

/**
 * Normalizes publications from a mapping object into an array
 *
 * @param publications Mapping from year to contents
 * @returns Array of normalized and sorted items
 */
function normalizePublications(publications: Record<string, string[]>): AppLayoutData {
  const pairs = Object.entries(publications);
  const filteredPairs = pairs.sort((a, b) => +b[0] - +a[0]).filter((pair) => pair[1].length > 0);
  const data = {
    $schema: '../../../app/schemas/content-page/content-page.schema.json',
    content: filteredPairs.map((pair) => {
      return {
        anchor: `year-${pair[0]}`,
        component: 'PageSection',
        content: pair[1].map((value) => convertContent(value)),
        level: 2,
        tagline: pair[0],
      };
    }),
    banner: {
      title: 'Publications',
      imgSrc: 'assets/content/publications-page/images/publications.png',
    },
  } satisfies AppLayoutData;
  return data;
}

/**
 * Converts publication html to format used for content template
 * @param value
 * @returns content
 */
function convertContent(value: string): ProjectedContentTemplate {
  return { component: 'Markdown', data: fixupContent(value) };
}

/**
 * Fixes problems with publication content html
 *
 * @param value HTML string
 * @returns HTML string without author links
 */
function fixupContent(value: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, 'text/html');
  const authorLinks = doc.body.querySelectorAll('a[href]:not([itemprop="url"])');
  authorLinks.forEach((link) => link.replaceWith(link.textContent as string));
  const publicationLinks = doc.body.querySelectorAll('a[href^="/docs/publications/"]');
  publicationLinks.forEach((el) => el.setAttribute('href', `https://cns.iu.edu${el.getAttribute('href')}`));
  return doc.body.innerHTML;
}
