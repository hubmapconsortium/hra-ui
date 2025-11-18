import { z } from 'zod';

/** Release notes version type */
export type ReleaseNotesVersion = z.infer<typeof ReleaseNotesVersionSchema>;

/** Schema for release notes data */
export const ReleaseNotesVersionSchema = z.object({
  version: z.string(),
  label: z.string(),
  date: z.string(),
});

/** Release notes versions type */
export type ReleaseNotesVersions = z.infer<typeof ReleaseNotesVersionsSchema>;

/** Release notes versions schema */
export const ReleaseNotesVersionsSchema = z.object({
  $schema: z.string(),
  versions: ReleaseNotesVersionSchema.array(),
});

export default ReleaseNotesVersionsSchema;
