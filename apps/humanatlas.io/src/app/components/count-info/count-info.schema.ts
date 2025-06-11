import { z } from 'zod';

/** Card info data containing metric name, count, and icon info */
export type CountInfoItem = z.infer<typeof CountInfoItemSchema>;

/** Count info item schema */
export const CountInfoItemSchema = z.object({
  label: z.string(),
  count: z.union([z.number(), z.string()]),
  icon: z.string(),
});
