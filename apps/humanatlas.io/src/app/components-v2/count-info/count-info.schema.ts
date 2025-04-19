import { z } from 'zod';

/** Card info data containing metric name, count, and icon info */
export type CountInfoItem = z.infer<typeof CountInfoItemSchema>;

/** Count info item schema */
export const CountInfoItemSchema = z.object({
  label: z.string(),
  count: z.string(),
  icon: z.union([z.object({ fontText: z.string() }), z.object({ url: z.string().url() })]),
});
