import { z } from 'zod';
import { CarouselItemSchema } from '../../components/carousel/carousel.schema';
import { SectionCardItemSchema } from '../../components/section-cards/section-cards.schema';

/** Landing page data type */
export type LandingPageData = z.infer<typeof LandingPageDataSchema>;

/** Landing page data schema */
export const LandingPageDataSchema = z.object({
  $schema: z.string(),
  carouselItems: CarouselItemSchema.array(),
  countInfo: z
    .object({
      count: z.number(),
      label: z.string(),
      showSuffix: z.boolean().optional(),
      iconType: z.enum(['misc', 'product', 'organ']),
      icon: z.string(),
    })
    .array(),
  sectionCardInfo: SectionCardItemSchema.array(),
});

export default LandingPageDataSchema;
