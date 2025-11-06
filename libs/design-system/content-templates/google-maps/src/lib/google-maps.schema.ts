import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Google Maps component data */
export type GoogleMaps = z.infer<typeof GoogleMapsSchema>;

/** Schema for Google Maps component */
export const GoogleMapsSchema = ContentTemplateSchema.extend({
  component: z.literal('GoogleMaps'),
  lat: z.number(),
  lng: z.number(),
  zoom: z.number().optional(),
});
