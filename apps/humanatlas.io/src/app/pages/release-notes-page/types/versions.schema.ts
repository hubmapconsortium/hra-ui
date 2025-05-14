import { z } from 'zod';

export type ReleaseNotesVersions = z.infer<typeof ReleaseNotesVersionsSchema>;

export const ReleaseNotesVersionsSchema = z.object({
  $schema: z.string(),
  versions: z
    .object({
      version: z.string(),
      label: z.string(),
      date: z.string(),
    })
    .array(),
});

export default ReleaseNotesVersionsSchema;
