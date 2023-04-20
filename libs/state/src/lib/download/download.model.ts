import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/**
 * Define a TypeScript type called `DownloadFormatId`,
 * which is inferred from the type of the `DOWNLOAD_FORMAT_ID` constant
 */
export type DownloadFormatId = z.infer<typeof DOWNLOAD_FORMAT_ID>;

/**
 * Define a TypeScript type called `DownloadFormat`,
 * which is inferred from the type of the `DOWNLOAD_FORMAT` constant
 */
export type DownloadFormat = z.infer<typeof DOWNLOAD_FORMAT>;

/**
 * Define a TypeScript type called `DownloadEntry`,
 * which is inferred from the type of the `DOWNLOAD_ENTRY` constant
 */
export type DownloadEntry = z.infer<typeof DOWNLOAD_ENTRY>;

/**
 * Define a TypeScript type called `DownloadModel`,
 * which is inferred from the type of the `DOWNLOAD_MODEL` constant
 */
export type DownloadModel = z.infer<typeof DOWNLOAD_MODEL>;

/**
 * Define a TypeScript type called `DownloadContext`,
 * which is a state context for the `DownloadModel` type
 */
export type DownloadContext = StateContext<DownloadModel>;

/**
 * Define a Zod schema for `DOWNLOAD_FORMAT_ID`,
 * which is a string that is transformed into a branded string
 */
export const DOWNLOAD_FORMAT_ID = z
  .string()
  .transform((id) => `DownloadFormatId:'${id}'`)
  .brand('DownloadFormatId');

/**
 * Define a Zod schema for `DOWNLOAD_ENTRY`,
 * which is a discriminated union of two objects with different properties
 */
export const DOWNLOAD_ENTRY = z.discriminatedUnion('type', [
  z.object({ type: z.literal('url'), url: z.string() }),
  z.object({ type: z.literal('data'), data: z.string() }),
]);

/**
 * Define a Zod schema for `DOWNLOAD_FORMAT`,
 * which is an object with `id`, `label`, and `extension` properties
 */
export const DOWNLOAD_FORMAT = z
  .object({
    id: DOWNLOAD_FORMAT_ID,
    label: z.string(),
    extension: z.string(),
  })
  .partial({ extension: true });

/** Define a Zod schema for `DOWNLOAD_MODEL`,
 * which is an object with `formats` and `entries` properties */
export const DOWNLOAD_MODEL = z.object({
  formats: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_FORMAT),
  entries: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_ENTRY),
});

/**
 * Creates download format id
 * @param id
 * @returns download format id
 */
export function createDownloadFormatId(id: string): DownloadFormatId {
  return DOWNLOAD_FORMAT_ID.parse(id);
}
