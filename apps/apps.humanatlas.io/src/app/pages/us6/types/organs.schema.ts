import { z } from 'zod';
import { ComponentDefIdSchema } from './component-defs.schema';

// Organ Id
export type OrganId = Organ['id'];

// Organ App Data
export type OrganAppData = z.infer<typeof OrganAppDataSchema>;
// Organ App Data Schema
export const OrganAppDataSchema = z.record(z.string(), z.any());

// Organ
export type Organ = z.infer<typeof OrganSchema>;
// Organ Schema
export const OrganSchema = z.object({
  id: z.string().brand<'OrganId'>(),
  label: z.string(),
  appData: z.record(ComponentDefIdSchema, OrganAppDataSchema),
});

// Organs Type
export type Organs = z.infer<typeof OrgansSchema>;
// Organs Schema
export const OrgansSchema = z.object({
  $schema: z.string(),
  organs: OrganSchema.array(),
});

// Default export Organs Schema
export default OrgansSchema;
