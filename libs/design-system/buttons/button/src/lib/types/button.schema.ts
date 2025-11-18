import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** HRA button type */
export type Button = z.infer<typeof ButtonSchema>;

/** HRA button schema */
export const ButtonSchema = ContentTemplateSchema.extend({
  component: z.literal('Button'),
  label: z.string(),
  href: z.string(),
  type: z.enum(['default', 'flat', 'cta', 'fab']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  size: z.enum(['small', 'medium']).optional(),
  disabled: z.boolean().optional(),
  icon: z.string().optional(),
});
