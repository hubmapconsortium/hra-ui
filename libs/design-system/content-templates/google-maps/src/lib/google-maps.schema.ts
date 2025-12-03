import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Google Maps component data */
export type GoogleMaps = z.infer<typeof GoogleMapsSchema>;

/** Schema for Google Maps component */
export const GoogleMapsSchema = ContentTemplateSchema.extend({
  component: z.literal('GoogleMaps'),
  url: z.string(),
  externalUrl: z.string(),
  fallbackImageUrl: z.string(),
}).meta({ id: 'GoogleMaps' });
