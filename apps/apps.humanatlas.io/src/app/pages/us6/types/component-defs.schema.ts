import { z } from 'zod';

export type ComponentDefId = z.infer<typeof ComponentDefIdSchema>;
export const ComponentDefIdSchema = z.string().brand<'ComponentDefId'>();

export type ComponentDef = z.infer<typeof ComponentDefSchema>;
export const ComponentDefSchema = z.object({
  id: ComponentDefIdSchema,
  productTitle: z.string(),
  webComponentName: z.string(),
  description: z.string(),
  previewImage: z.string(),
  embedAs: z.enum(['inline', 'overlay', 'external']),
  docLink: z.string(),
});

export type ComponentDefs = z.infer<typeof ComponentDefsSchema>;
export const ComponentDefsSchema = z.object({
  $schema: z.string(),
  defs: ComponentDefSchema.array(),
});

export default ComponentDefsSchema;
