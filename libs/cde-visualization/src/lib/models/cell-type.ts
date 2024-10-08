import { Rgb } from '@hra-ui/design-system/color-picker';

/** Interface representing a cell type entry */
export interface CellTypeEntry {
  /** Name of the cell type */
  name: string;
  /** Count of instances for this cell type */
  count: number;
  /** Count of number of outgoing edges */
  outgoingEdgeCount: number;
  /** RGB color associated with this cell type */
  color: Rgb;
}

/** Converts an array of CellTypeEntry objects to a lookup map */
export function cellTypeToLookup(entries: CellTypeEntry[]): Map<string, Rgb> {
  const lookup = new Map<string, Rgb>();
  for (const entry of entries) {
    lookup.set(entry.name, entry.color);
  }

  return lookup;
}
