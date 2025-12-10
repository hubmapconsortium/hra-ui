import * as z from 'zod';

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
}).meta({ id: 'PeopleProfileMemberRole' });

/** Student role schema */
const StudentRoleSchema = BaseRoleSchema.extend({
  type: z.literal('student'),
  topic: z.string(),
  degree: z.string(),
  department: z.string(),
}).meta({ id: 'PeopleProfileStudentRole' });

/** Collaborator role schema */
const CollaboratorRoleSchema = BaseRoleSchema.extend({
  type: z.literal('collaborator'),
  project: z.string(),
}).meta({ id: 'PeopleProfileCollaboratorRole' });

/** Discriminated union of all role types */
const RoleSchema = z
  .discriminatedUnion('type', [MemberRoleSchema, StudentRoleSchema, CollaboratorRoleSchema])
  .meta({ id: 'PeopleProfileRole' });

/** People profile data schema */
export const PeopleProfileDataSchema = z
  .object({
    name: z.string(),
    lastName: z.string(),
    image: z.string(),
    slug: z.string().optional(),
    roles: z.array(RoleSchema),
  })
  .meta({ id: 'PeopleProfileData' });

/** People profile data type */
export type PeopleProfileData = z.infer<typeof PeopleProfileDataSchema>;
