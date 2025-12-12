import * as z from 'zod';

/** Component definition id */
export type ComponentDefId = z.infer<typeof ComponentDefIdSchema>;
/** Component definition id schema */
export const ComponentDefIdSchema = z.string().brand<'ComponentDefId'>().meta({ id: 'ComponentDefId' });

/**
 * Component def
 */
export type ComponentDef = z.infer<typeof ComponentDefSchema>;

/**
 * Component def schema
 */
export const ComponentDefSchema = z
  .object({
    id: ComponentDefIdSchema,
    productTitle: z.string(),
    webComponentName: z.string(),
    description: z.string(),
    previewImage: z.string(),
    embedAs: z.enum(['inline', 'overlay', 'external']),
    docLink: z.string(),
  })
  .meta({ id: 'ComponentDef' });

/**
 * Component defs
 */
export type ComponentDefs = z.infer<typeof ComponentDefsSchema>;

/**
 * Component defs schema
 */
export const ComponentDefsSchema = z
  .object({
    $schema: z.string(),
    defs: ComponentDefSchema.array(),
  })
  .meta({ id: 'ComponentDefs' });

export default ComponentDefsSchema;
