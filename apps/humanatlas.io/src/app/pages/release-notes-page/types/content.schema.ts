import { AnyContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type ReleaseNotesContent = z.infer<typeof ReleaseNotesContentSchema>;

export const ReleaseNotesContentSchema = z.object({
  $schema: z.string(),
  content: AnyContentTemplateSchema.array(),
});

export default ReleaseNotesContentSchema;
