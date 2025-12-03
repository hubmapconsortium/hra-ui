import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import * as z from 'zod';

/** Base URL for CNS website content */
const CNS_CONTENT_BASE_URL = 'https://cns-iu.github.io/cns-website/content/person';

/** Base role schema with common fields */
const BaseRoleSchema = z.object({
  dateStart: z.string(),
  dateEnd: z.string().nullable(),
});

/** Member role schema */
const MemberRoleSchema = BaseRoleSchema.extend({
  type: z.literal('member'),
  title: z.string(),
  displayOrder: z.number().optional(),
  office: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  education: z.string().optional(),
  background: z.string().optional(),
  interests: z.string().optional(),
});

/** Student role schema */
const StudentRoleSchema = BaseRoleSchema.extend({
  type: z.literal('student'),
  topic: z.string(),
  degree: z.string(),
  department: z.string(),
});

/** Collaborator role schema */
const CollaboratorRoleSchema = BaseRoleSchema.extend({
  type: z.literal('collaborator'),
  project: z.string(),
});

/** Discriminated union of all role types */
const RoleSchema = z.discriminatedUnion('type', [MemberRoleSchema, StudentRoleSchema, CollaboratorRoleSchema]);

/** Breadcrumb item schema */
const BreadcrumbItemSchema = z.object({
  name: z.string(),
  route: z.string().optional(),
});

/** People profile data schema */
export const PeopleProfileDataSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  image: z.string(),
  slug: z.string().optional(),
  roles: z.array(RoleSchema),
  breadcrumbs: z.array(BreadcrumbItemSchema).optional(),
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
          breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'People', route: '/people' }, { name: parsed.name }],
        };
      }),
    );
  };
}
