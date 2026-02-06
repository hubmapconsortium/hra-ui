import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** HRA button type */
export type CopyEmailButton = z.infer<typeof CopyEmailButtonSchema>;

/** HRA button schema */
export const CopyEmailButtonSchema = ContentTemplateSchema.extend({
  component: z.literal('CopyEmailButton'),
  emailId: z.email(),
}).meta({ id: 'CopyEmailButton' });
