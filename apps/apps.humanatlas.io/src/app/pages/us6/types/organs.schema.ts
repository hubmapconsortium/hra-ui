import { z } from 'zod';
import { ComponentDefIdSchema } from './component-defs.schema';

export type OrganId = Organ['id'];

export type OrganAppData = z.infer<typeof OrganAppDataSchema>;
export const OrganAppDataSchema = z.record(z.string(), z.any());

export type Organ = z.infer<typeof OrganSchema>;
export const OrganSchema = z.object({
  id: z.string().brand<'OrganId'>(),
  label: z.string(),
  appData: z.record(ComponentDefIdSchema, OrganAppDataSchema),
});

export type Organs = z.infer<typeof OrgansSchema>;
export const OrgansSchema = z.object({
  $schema: z.string(),
  organs: OrganSchema.array(),
});

export default OrgansSchema;
