import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** API command button type */
export type ApiCommandButton = z.infer<typeof ApiCommandButtonSchema>;

/** Schema representing the details of an api command button */
export const ApiCommandButtonSchema = z.object({
  /** Text for the plain button */
  label: z.string(),
  /** Icon name for the button */
  icon: z.string().optional(),
  /** External URL for the button */
  url: z.string().url().optional(),
});

/** API command type */
export type ApiCommand = z.infer<typeof ApiCommandSchema>;

/** Schema for api command */
export const ApiCommandSchema = ContentTemplateSchema.extend({
  component: z.literal('ApiCommand'),
  /** API request url to be displayed in the card */
  request: z.string(),
  /** Can be GET or POST */
  method: z.enum(['GET', 'POST']),
  /** Details of the right button */
  rightButton: ApiCommandButtonSchema,
});
