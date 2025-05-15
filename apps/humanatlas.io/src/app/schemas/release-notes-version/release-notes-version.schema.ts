import { z } from 'zod';

export type ReleaseNotesVersion = z.infer<typeof ReleaseNotesVersionSchema>;

export const ReleaseNotesVersionSchema = z.object({
  version: z.string(),
  label: z.string(),
  date: z.string(),
});

export type ReleaseNotesVersions = z.infer<typeof ReleaseNotesVersionsSchema>;

export const ReleaseNotesVersionsSchema = z.object({
  $schema: z.string(),
  versions: ReleaseNotesVersionSchema.array(),
});

export default ReleaseNotesVersionsSchema;
