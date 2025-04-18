import { z } from 'zod';

import { CarouselItemSchema } from '../../components-v2/carousel/carousel.schema';
import { CountInfoItemSchema } from '../../components-v2/count-info/count-info.schema';
import { SectionCardItemSchema } from '../../components-v2/section-cards/section-cards.schema';

/** Landing page data type */
export type LandingPageData = z.infer<typeof LandingPageDataSchema>;

/** Landing page data schema */
export const LandingPageDataSchema = z.object({
  carouselItems: CarouselItemSchema.array(),
  countInfo: CountInfoItemSchema.array(),
  sectionCardInfo: SectionCardItemSchema.array(),
});
