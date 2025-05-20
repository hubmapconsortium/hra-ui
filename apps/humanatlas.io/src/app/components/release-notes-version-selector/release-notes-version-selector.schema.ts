import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Schema for Release Notes Version Selector Component */
export const ReleaseNotesVersionSelectorSchema = ContentTemplateSchema.extend({
  component: z.literal('ReleaseNotesVersionSelector'),
});
