import { Action } from '@hra-ui/cdk/state';
import { DownloadEntry, DownloadFormat, DownloadFormatId } from './download.model';
import { Iri } from '@hra-ui/services';

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
