/** An interface representing the details of version and FTU data */
export interface FtuVersionData {
  /** Version number of FTU*/
  version: string;
  /** Data of the FTU table */
  rows: FtuData[];
}

/** An interface representing the details of FTU data */
export interface FtuData {
  /** Label of the FTU type */
  label: string;
  /** URL for the label of the FTU type */
  url: string;
  /** Details of URL and Label of FTU Data */
  links: Download[];
  /** Release version of the FTU */
  releaseVersion: string;
  /** Digital Object Type of the FTU */
  dot: string;
}

/** An interface representing the label and URL of the links */
export interface Download {
  /** Label of the FTU download file */
  label: string;
  /** URL of the FTU download file */
  link: string;
}
