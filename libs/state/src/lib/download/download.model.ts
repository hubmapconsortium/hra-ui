import { StateContext } from '@ngxs/store';
import { z } from 'zod';

export type DownloadFormatId = z.infer<typeof DOWNLOAD_FORMAT_ID>;

export type DownloadFormat = z.infer<typeof DOWNLOAD_FORMAT>;

export type DownloadEntry = z.infer<typeof DOWNLOAD_ENTRY>;

export type DownloadModel = z.infer<typeof DOWNLOAD_MODEL>;

export type DownloadContext = StateContext<DownloadModel>;

export const DOWNLOAD_FORMAT_ID = z
  .string()
  .transform((id) => `DownloadFormatId:'${id}'`)
  .brand('DownloadFormatId');

export const DOWNLOAD_ENTRY = z.discriminatedUnion('type', [
  z.object({ type: z.literal('url'), url: z.string() }),
  z.object({ type: z.literal('data'), data: z.string() }),
]);

export const DOWNLOAD_FORMAT = z
  .object({
    id: DOWNLOAD_FORMAT_ID,
    label: z.string(),
    extension: z.string(),
  })
  .partial({ extension: true });

export const DOWNLOAD_MODEL = z.object({
  formats: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_FORMAT),
  entries: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_ENTRY),
});

export function createDownloadFormatId(id: string): DownloadFormatId {
  return DOWNLOAD_FORMAT_ID.parse(id);
}
