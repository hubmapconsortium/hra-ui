import { Action } from '@hra-ui/cdk/state';

/**
 * Download file Action
 */
export class Download extends Action('[Download] Download') {
  /**
   * Creates an instance of download.
   * @param selectedFormat
   */
  constructor(public selectedFormat: string) {
    super();
  }
}
