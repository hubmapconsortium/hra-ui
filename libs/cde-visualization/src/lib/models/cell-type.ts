import { Rgb } from './color';

export interface CellTypeEntry {
  name: string;
  count: number;
  color: Rgb;
}

export function cellTypeToLookup(entries: CellType[]): Map<string, Rgb> {
  const lookup = new Map<string, Rgb>();
  for (const entry of entries) {
    lookup.set(entry.name, entry.color);
  }

  return lookup;
}
