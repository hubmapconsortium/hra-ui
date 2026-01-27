import * as z from 'zod';

/** News page data item type */
export type GalleryCardItem = z.infer<typeof GalleryCardItemSchema>;

/** News page data item schema */
export const GalleryCardItemSchema = z.object({
  name: z.string(),
  imageSrc: z.string(),
  date: z.string(),
  link: z.string(),
  external: z.boolean(),
  tags: z.string().array(),
});
