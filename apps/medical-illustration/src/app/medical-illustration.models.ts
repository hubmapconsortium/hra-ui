import { NodeMapEntry } from '@hra-ui/components/molecules';
import { z } from 'zod';

/** Cell entry zod validator */
export const CELL_ENTRY = z
  .object({
    label: z.string(),
    svg_id: z.string(),
    svg_group_id: z.string(),
    representation_of: z.string(),
  })
  .passthrough();

/** Illustration file zod validator */
export const ILLUSTRATION_FILE = z.object({
  file: z.string(),
  file_format: z.string(),
});

/** Illustration zod validator */
export const ILLUSTRATION = z.object({
  '@id': z.string(),
  mapping: CELL_ENTRY.array(),
  illustration_files: ILLUSTRATION_FILE.array(),
});

/** Illustration graph jsonld zod validator */
export const ILLUSTRATIONS_JSONLD = z.object({
  '@graph': ILLUSTRATION.array(),
});

/** Single cell entry in an illustration */
export type CellEntry = z.infer<typeof CELL_ENTRY>;

/** Illustration file information */
export type IllustrationFile = z.infer<typeof ILLUSTRATION_FILE>;

/** Illustration data object */
export type Illustration = z.infer<typeof ILLUSTRATION>;

/** Collection of illustrations as jsonld */
export type IllustrationsJsonld = z.infer<typeof ILLUSTRATIONS_JSONLD>;

/** Internal node type used in the interactive svg */
export interface CellEntryNode extends NodeMapEntry {
  /** Reference to the original cell entry corresponding to this node */
  cell: CellEntry;
}
