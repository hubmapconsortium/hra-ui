export interface Metadata {
  /** Title of the visualization */
  title?: string;
  /** Name of the source file */
  sourceData?: string;
  /** Name of the colormap file */
  colorMap?: string;
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
  /** Creation date */
  creationDate?: string;
  /** Creation time */
  creationTime?: string;
}
