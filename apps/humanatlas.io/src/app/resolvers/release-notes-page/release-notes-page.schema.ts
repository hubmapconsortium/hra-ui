import { z } from 'zod';

/** Schema for release notes subsection */
export const ReleaseNotesSubSectionDataSchema = z.object({
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

/** Type for release notes section data */
export type ReleaseNotesSectionData = z.infer<typeof ReleaseNotesSectionDataSchema>;

/** Schema for release notes section, may contain subsections */
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
  sections: ReleaseNotesSubSectionDataSchema.array().optional(),
});

/** Type for release version data */
export type ReleaseVersionData = z.infer<typeof ReleaseVersionSchema>;

/** Schema for release version */
export const ReleaseVersionSchema = z.object({
  version: z.number(),
  label: z.string(),
  date: z.string(),
  description: z.string(),
});
