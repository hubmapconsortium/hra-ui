import * as z from 'zod';

/** Base role schema with common fields */
const BaseRoleSchema = z.object({
  dateStart: z.iso.date().pipe(z.coerce.date()),
  dateEnd: z.iso.date().pipe(z.coerce.date()).nullable(),
});

/** Type representing a team member role */
export type MemberRole = z.infer<typeof MemberRoleSchema>;

/** Member role schema */
export const MemberRoleSchema = z
  .object({
    ...BaseRoleSchema.shape,
    type: z.literal('member'),
    title: z.string(),
    displayOrder: z.number().nullish(),
    office: z.string(),
    phone: z.string(),
    fax: z.string(),
    email: z.string(),
    education: z.string(),
    background: z.string(),
    interests: z.string(),
  })
  .meta({ id: 'RoleMember' });

/** Type representing a student role */
export type StudentRole = z.infer<typeof StudentRoleSchema>;

/** Student role schema */
export const StudentRoleSchema = z
  .object({
    ...BaseRoleSchema.shape,
    type: z.literal('student'),
    topic: z.string(),
    degree: z.enum(['Ph.D.', 'Masters']).nullable(),
    department: z.string(),
  })
  .meta({ id: 'RoleStudent' });

/** Type representing a collaborator role */
export type CollaboratorRole = z.infer<typeof CollaboratorRoleSchema>;

/** Collaborator role schema */
export const CollaboratorRoleSchema = z
  .object({
    ...BaseRoleSchema.shape,
    type: z.literal('collaborator'),
    project: z.string(),
  })
  .meta({ id: 'RoleCollaborator' });

/** Union type representing any valid role */
export type AnyRole = z.infer<typeof RoleSchema>;

/** Literal union of all possible role type discriminators */
export type RoleType = AnyRole['type'];

/** Discriminated union of all role types */
export const RoleSchema = z
  .discriminatedUnion('type', [MemberRoleSchema, StudentRoleSchema, CollaboratorRoleSchema])
  .meta({ id: 'Role' });
