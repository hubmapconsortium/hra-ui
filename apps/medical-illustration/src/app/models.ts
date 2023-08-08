export interface JsonLd {
  '@context': unknown;
  '@graph': OrganData[];
}

export interface OrganData {
  [key: string]: unknown;
  illustration_files: IllustrationFileData[];
  mapping: CellEntry[];
}

export interface IllustrationFileData {
  [key: string]: unknown;
  file: string;
}

export interface CellEntry {
  [key: string]: unknown;
  label: string;
  svg_id: string;
}
