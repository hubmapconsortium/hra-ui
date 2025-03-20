import { z } from 'zod';

/** Carousel item type */
export type CarouselItem = z.infer<typeof CarouselItemSchema>;

/** Carousel item Zod schema */
export const CarouselItemSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  action: z.string(),
  link: z.union([z.object({ url: z.string().url() }), z.object({ route: z.string() })]),
});
