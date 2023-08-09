/** JsonLd format */
export interface JsonLd {
  /** JsonLd context */
  '@context': [string, unknown];
  /** List of illustration data */
  '@graph': IllustrationData[];
}

/** Information containing all data for an illustration */
export interface IllustrationData {
  /** IllustrationData property */
  [key: string]: unknown;
  /** List of illustration file data */
  illustration_files: IllustrationFileData[];
  /** Mapping data */
  mapping: CellEntry[];
}

/** Http client */
export interface IllustrationFileData {
  /** IllustrationFileData property */
  [key: string]: unknown;
  /** File url */
  file: string;
}

/** Data for each cell entry */
export interface CellEntry {
  /** CellEntry property */
  [key: string]: unknown;
  /** Cell label */
  label: string;
  /** Cell id */
  svg_id: string;
}
