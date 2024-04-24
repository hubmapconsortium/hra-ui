/** An interface representing the details of tissue */
export interface TissueData {
  /** Name of the tissue */
  name: string;
  /** Path of the tissue image */
  image?: string;
  /** Path of the image to be displayed inside a modal */
  expandedImage?: string;
  /** Path of the 3D object */
  threeDimImage?: string;
  /** Alternate text for the tissue image */
  alt?: string;
  /** URL of the metadata of the tissue */
  url: string;
  /** URL of the SVG file of the tissue */
  svg?: string;
  /** URL of the AI file of the tissue */
  ai?: string;
  /** URL of the PNG file of the tissue */
  png?: string;
}

/** An interface representing the details of organ */
export interface OrganData {
  /** Name of the organ */
  name: string;
  /** Path of the image of an organ */
  image: string;
  /** Alternate text for the image of an organ */
  alt: string;
  /** Details of the tissue(s) of the organ */
  tissueData?: TissueData[];
}

/** An interface representing version and organdata for an organ */
export interface VersionOrgans {
  /** Version of the organ data */
  version: string;
  /** Details of the organs for specific version */
  organData: OrganData[];
}
