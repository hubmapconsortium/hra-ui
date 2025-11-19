import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Schema for Release Notes Version Selector Component */
export const ReleaseNotesVersionSelectorSchema = ContentTemplateSchema.extend({
  component: z.literal('ReleaseNotesVersionSelector'),
}).meta({ id: 'ReleaseNotesVersionSelector' });
