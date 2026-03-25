import { Action } from '@hra-ui/cdk/state';
import { CellSummary, Iri, SourceReference } from '@hra-ui/services';
import { DownloadEntry, DownloadFormat, DownloadFormatId } from './download.model';

/**
 * Register format into state
 */
export class RegisterFormat extends Action('[Download] Register Format') {
  /**
   * Creates an instance of register format.
   * @param format
   */
  constructor(readonly format: DownloadFormat) {
    super();
  }
}

/**
 * Action to load entries from data service
 */
export class Load extends Action('[Download] Load') {
  /**
   * Creates a action to load from the enteries from the data service
   * @param iri Organ Iri for which the entries are loaded
   */
  constructor(readonly iri: Iri) {
    super();
  }
}

/**
 * Add entry into download state
 */
export class AddEntry extends Action('[Download] Add') {
  /** Constructor for Addd Entry */
  constructor(
    readonly id: DownloadFormatId,
    readonly entry: DownloadEntry,
  ) {
    super();
  }
}

/**
 * Clear all entries from download state
 */
export class ClearEntries extends Action('[Download] Clear') {}

/**
 * Download file Action
 */
export class Download extends Action('[Download] Download') {
  /**
   * Creates an instance of download.
   * @param selectedFormat
   */
  constructor(readonly format: DownloadFormatId) {
    super();
  }
}

/**
 * Action to download cell summaries file
 */
export class DownloadSummaries extends Action('[Download] Download Summaries') {
  /**
   * Creates an instance of download summaries.
   * @param summaries Summaries to be downloaded
   */
  constructor(readonly summaries: CellSummary[]) {
    super();
  }
}

/**
 * Action to download CSV file of source references
 */
export class DownloadCsv extends Action('[Download] Download CSV') {
  /**
   * Creates an instance of download csv.
   * @param sourceRefs Source references to be downloaded
   * @param [id] Optional Iri identifier for the download
   */
  constructor(
    readonly sourceRefs: SourceReference[],
    readonly id?: Iri,
  ) {
    super();
  }
}
