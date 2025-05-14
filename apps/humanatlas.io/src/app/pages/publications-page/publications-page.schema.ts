import { z } from 'zod';

/** Publications page data type */
export type PublicationsPageData = z.infer<typeof PublicationsPageDataSchema>;

/** Publications page data schema */
export const PublicationsPageDataSchema = z.record(z.string(), z.string().array());
