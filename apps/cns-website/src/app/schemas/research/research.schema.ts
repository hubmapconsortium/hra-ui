import * as z from 'zod';
import { GalleryCardItemSchema } from '@hra-ui/design-system/cards/gallery-card';

export type ResearchPageData = z.infer<typeof ResearchPageDataSchema>;

export const ResearchPageDataSchema = z
  .object({
    $schema: z.string(),
    news: GalleryCardItemSchema.array(),
  })
  .meta({ id: 'ResearchPageData' });

export default ResearchPageDataSchema;
