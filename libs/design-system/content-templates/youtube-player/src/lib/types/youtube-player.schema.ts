import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** YouTube component data */
export type YouTubePlayer = z.infer<typeof YouTubePlayerSchema>;

/** Schema for YouTube component */
export const YouTubePlayerSchema = ContentTemplateSchema.extend({
  component: z.literal('YouTubePlayer'),
  videoId: z.string(),
});
