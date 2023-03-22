import { Action } from '@hra-ui/cdk/state';

/**
 * Download file Action
 */
export class Download extends Action('[Download] Download') {
  constructor(public selectedFormat: string) {
    super();
  }
}
