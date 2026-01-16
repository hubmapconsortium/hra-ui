import * as z from 'zod';

/** Base role schema with common fields */
const BaseRoleSchema = z.object({
  dateStart: z.iso.date().transform((date) => new Date(date)),
  dateEnd: z.iso
    .date()
    .transform((date) => new Date(date))
    .nullable(),
});

/** Member role schema */
const MemberRoleSchema = BaseRoleSchema.extend({
  type: z.literal('member'),
  title: z.string(),
  displayOrder: z.number().nullable().optional(),
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

/** Union type representing any valid role */
export type AnyRole = z.infer<typeof RoleSchema>;
/** Type representing a team member role */
export type MemberRole = z.infer<typeof MemberRoleSchema>;
/** Type representing a student role */
export type StudentRole = z.infer<typeof StudentRoleSchema>;
/** Type representing a collaborator role */
export type CollaboratorRole = z.infer<typeof CollaboratorRoleSchema>;
/** Literal union of all possible role type discriminators */
export type RoleType = AnyRole['type'];

/** Discriminated union of all role types */
const RoleSchema = z
  .discriminatedUnion('type', [MemberRoleSchema, StudentRoleSchema, CollaboratorRoleSchema])
  .meta({ id: 'PeopleProfileRole' });

/** People profile item type */
export type PeopleProfileItem = z.infer<typeof PeopleProfileItemSchema>;

/** People profile item schema */
export const PeopleProfileItemSchema = z
  .object({
    slug: z.string(),
    name: z.string(),
    lastName: z.string(),
    image: z.string().optional(),
    roles: z.array(RoleSchema),
  })
  .meta({ id: 'PeopleProfileItem' });

/** People profile data type */
export type PeopleProfileData = z.infer<typeof PeopleProfileDataSchema>;

/** People profile data schema (array of items) */
export const PeopleProfileDataSchema = z.array(PeopleProfileItemSchema);
