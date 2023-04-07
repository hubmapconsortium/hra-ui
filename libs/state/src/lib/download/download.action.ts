import { ActionGroup } from '@hra-ui/cdk/state';
import { DownloadEntry, DownloadFormat, DownloadFormatId } from './download.model';

/**Action Group for Download Action */
const Action = ActionGroup('Download');

/**
 * Register format into state
 */
export class RegisterFormat extends Action('Register Format') {
  /**
   * Creates an instance of register format.
   * @param format
   */
  constructor(readonly format: DownloadFormat) {
    super();
  }
}

/**
 * Add entry into download state
 */
export class AddEntry extends Action('Add') {
  /** Constructor for Addd Entry */
  constructor(readonly id: DownloadFormatId, readonly entry: DownloadEntry) {
    super();
  }
}

/**
 * Clear all entries from download state
 */
export class ClearEntries extends Action('Clear') {}

/**
 * Download file Action
 */
export class Download extends Action('Download') {
  /**
   * Creates an instance of download.
   * @param selectedFormat
   */
  constructor(readonly format: DownloadFormatId) {
    super();
  }
}
