import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** API command button type */
export type APICommandButton = z.infer<typeof APICommandButtonSchema>;

/** Schema representing the details of an api command button */
export const APICommandButtonSchema = z.object({
  /** Text for the plain button */
  label: z.string(),
  /** Icon name for the button */
  icon: z.string().optional(),
  /** External URL for the button */
  url: z.string().url().optional(),
});

/** API command type */
export type APICommand = z.infer<typeof APICommandSchema>;

/** Schema for api command */
export const APICommandSchema = ContentTemplateSchema.extend({
  component: z.literal('APICommand'),
  /** API url to be displayed in the card */
  url: z.string(),
  /** Can be GET or POST */
  function: z.string(),
  /** Details of the plain button */
  leftButton: APICommandButtonSchema,
  /** Details of the dynamic button */
  rightButton: APICommandButtonSchema,
});
