import { ActionGroup } from '@hra-ui/cdk/state';
import { DownloadEntry, DownloadFormat, DownloadFormatId } from './download.model';

const Action = ActionGroup('Download');

/**
 * Register format into state
 */
export class RegisterFormat extends Action('Register Format') {
  constructor(readonly format: DownloadFormat) {
    super();
  }
}

/**
 * Add entry into download state
 */
export class AddEntry extends Action('Add') {
  constructor(readonly id: DownloadFormatId, readonly entry: DownloadEntry) {
    super();
  }
}

/**
 * Clear entry from download state
 */
export class ClearEntry extends Action('Clear') {
  constructor(readonly id: DownloadFormatId) {
    super();
  }
}

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
