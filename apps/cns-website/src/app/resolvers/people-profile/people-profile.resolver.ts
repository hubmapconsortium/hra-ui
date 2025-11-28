import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import * as z from 'zod';

/** Base URL for CNS website content */
const CNS_CONTENT_BASE_URL = 'https://cns-iu.github.io/cns-website/content/person';

/** Role schema */
const RoleSchema = z.object({
  type: z.enum(['member', 'student', 'collaborator']),
  title: z.string().optional(),
  displayOrder: z.number().optional(),
  office: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  education: z.string().optional(),
  background: z.string().optional(),
  interests: z.string().optional(),
  dateStart: z.string(),
  dateEnd: z.string().nullable(),
  project: z.string().optional(),
  topic: z.string().optional(),
  degree: z.string().optional(),
  department: z.string().optional(),
});

/** People profile data schema */
export const PeopleProfileDataSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  image: z.string().optional(),
  slug: z.string().optional(),
  roles: z.array(RoleSchema).optional(),
});

/** People profile data type */
export type PeopleProfileData = z.infer<typeof PeopleProfileDataSchema>;

/**
 * Creates a resolver that fetches people profile data from external YAML source
 *
 * @param baseUrl Base URL for person content
 * @returns A resolver function that fetches and validates person data
 */
export function createPeopleProfileResolver(baseUrl: string = CNS_CONTENT_BASE_URL): ResolveFn<PeopleProfileData> {
  return (route) => {
    const http = inject(HttpClient);
    const slug = route.paramMap.get('slug');

    if (!slug) {
      throw new Error('Person slug is required');
    }

    const url = `${baseUrl}/${slug}/data.yaml`;

    return http.get(url, { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url }) as unknown),
      map((data) => {
        const parsed = PeopleProfileDataSchema.parse(data);
        return {
          ...parsed,
          image: parsed.image ? `${baseUrl}/${slug}/${parsed.image}` : parsed.image,
        };
      }),
    );
  };
}

/**
 * Default people profile resolver
 */
export const peopleProfileResolver = createPeopleProfileResolver();
