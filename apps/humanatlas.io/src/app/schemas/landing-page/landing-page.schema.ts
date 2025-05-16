import { z } from 'zod';
import { CarouselItemSchema } from '../../components/carousel/carousel.schema';
import { CountInfoItemSchema } from '../../components/count-info/count-info.schema';
import { SectionCardItemSchema } from '../../components/section-cards/section-cards.schema';

/** Landing page data type */
export type LandingPageData = z.infer<typeof LandingPageDataSchema>;

/** Landing page data schema */
export const LandingPageDataSchema = z.object({
  $schema: z.string(),
  carouselItems: CarouselItemSchema.array(),
  countInfo: CountInfoItemSchema.array(),
  sectionCardInfo: SectionCardItemSchema.array(),
});

export default LandingPageDataSchema;
