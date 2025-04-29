import { z } from 'zod';

/** Release notes section data type */
export type ReleaseNotesSectionData = z.infer<typeof ReleaseNotesSectionDataSchema>;

/** Release notes section data schema */
export const ReleaseNotesSectionDataSchema = z.object({
  header: z.string(),
  level: z.number(),
  pageData: z
    .object({
      itemList: z.string().optional(),
      buttonUrl: z.string().url().optional(),
      buttonText: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export type ReleaseVersionData = z.infer<typeof ReleaseVersionSchema>;

export const ReleaseVersionSchema = z.object({
  version: z.number(),
  label: z.string(),
  date: z.string(),
  description: z.string(),
});
