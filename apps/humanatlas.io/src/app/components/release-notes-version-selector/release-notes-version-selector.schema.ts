import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export const ReleaseNotesVersionSelectorSchema = ContentTemplateSchema.extend({
  component: z.literal('ReleaseNotesVersionSelector'),
});
