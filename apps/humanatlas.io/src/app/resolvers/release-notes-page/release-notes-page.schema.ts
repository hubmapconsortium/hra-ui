import { z } from 'zod';

/** Release notes section data type */
export type ReleaseNotesSectionData = z.infer<typeof ReleaseNotesPageDataSchema>;

/** Release notes section data schema */
export const ReleaseNotesSectionDataSchema = z.object({
  header: z.string(),
  content: z.string(),
  sections: z.object({ header: z.string(), content: z.string() }).array().optional(),
});

/** Release notes page data type */
export type ReleaseNotesPageData = z.infer<typeof ReleaseNotesPageDataSchema>;

/** Release notes page data schema */
export const ReleaseNotesPageDataSchema = z.object({
  releaseTitle: z.string(),
  releaseDescription: z.string(),
  releaseVersion: z.number(),
  content: ReleaseNotesSectionDataSchema.array(),
});
