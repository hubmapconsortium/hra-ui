import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { z } from 'zod';

/** Organ entry type */
export type OrganEntry = z.infer<typeof ORGANS_DEF>[number];

/** Default endpoint for reference organs */
const DEFAULT_ENDPOINT = 'https://apps.humanatlas.io/api/v1/reference-organs';

/** Typing for organ data */
const ORGANS_DEF = z
  .object({
    representation_of: z.string(),
    label: z.string(),
  })
  .transform(({ representation_of, label }) => ({
    id: representation_of,
    label,
  }))
  .array();

/** Fetches and parses reference organ data */
export function organsResolver(endpoint = DEFAULT_ENDPOINT): ResolveFn<OrganEntry[]> {
  return () => {
    const http = inject(HttpClient);
    const rawOrgans$ = http.get<z.input<typeof ORGANS_DEF>>(endpoint, { responseType: 'json' });
    return rawOrgans$.pipe(
      map((data) => ORGANS_DEF.parse(data)),
      map((organs) => dedupByLabel(organs)),
    );
  };
}

/** Returns only unique organ entries */
function dedupByLabel(organs: OrganEntry[]): OrganEntry[] {
  const seen = new Set<string>();
  return organs.filter(({ label }) => {
    const exclude = seen.has(label);
    seen.add(label);
    return exclude;
  });
}
