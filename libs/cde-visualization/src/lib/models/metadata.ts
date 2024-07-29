/**
 * Interface for Metadata
 */
export interface Metadata {
  /** Name of the source file */
  sourceData?: string;
  /** Name of the colormap file */
  colorMap?: string;
  /** Title of the visualization */
  title?: string;
  /** Name of the organ */
  organ?: string;
  /** Technology */
  technology?: string;
  /** Sex */
  sex?: string;
  /** Age */
  age?: number;
  /** Thickness */
  thickness?: number;
  /** Pixel size */
  pixelSize?: number;
  /** Creation timestamp (ms since 1/1/1970 UTC) */
  creationTimestamp?: number;
  /** Extra metadata for example datasets */
  sampleExtra?: SampleMetadataExtra;
}

/**
 * Interface for Extra Metadata fields
 */
export interface SampleMetadataExtra {
  /** Sample type, generally '2D' or '3D' */
  type: string;
  /** Organ name */
  organ: string;
  /** Data file url*/
  sampleUrl: string;
  /** Source Data Sheet url */
  sourceDataUrl: string;
}
