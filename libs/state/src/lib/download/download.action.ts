import { ActionGroup } from '@hra-ui/cdk/state';
import { DownloadDataConverter, DownloadFormat, DownloadFormatId } from './download.model';

const Action = ActionGroup('Download');

export class RegisterFormat extends Action('Register Format') {
  constructor(readonly format: DownloadFormat, readonly converter?: DownloadDataConverter) {
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
