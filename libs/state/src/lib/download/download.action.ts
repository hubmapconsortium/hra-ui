import { Action } from '@hra-ui/cdk/state';
import { DownloadFormat, FileFormat } from './download.model';

/**
 * Download file Action
 */
export class Download extends Action('[Download] Download') {
  /**
   * Creates an instance of download.
   * @param selectedFormat
   */
  constructor(readonly format: FileFormat | DownloadFormat) {
    super();
  }
}
