/** An interface representing the details of version and release in the input select */
export interface ChooseVersion {
  /** Release label of the release */
  release: string;
  /** Version number of the release */
  version: string;
  /** Url to the source (CSV) file for the release */
  file?: string;
}
