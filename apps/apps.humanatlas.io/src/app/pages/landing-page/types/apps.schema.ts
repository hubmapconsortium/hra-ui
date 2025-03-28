import { z } from 'zod';

export type App = z.infer<typeof AppSchema>;

export const AppSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  imagePath: z.string(),
  logoPath: z.string(),
  appStatus: z.optional(z.enum(['Preview', 'Alpha', 'Beta'])),
  appUrl: z.string(),
  documentLink: z.string(),
});

export type Apps = z.infer<typeof AppsSchema>;

export const AppsSchema = z.object({
  $schema: z.string(),
  apps: AppSchema.array(),
});

export default AppsSchema;
