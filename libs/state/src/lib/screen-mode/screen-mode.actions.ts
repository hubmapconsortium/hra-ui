import { Action } from '@hra-ui/cdk/state';

/** Update the screen mode */
export class Set extends Action('[Screenmode] Set Screenmode') {
  /**
   * Creates an instance of Set
   * @param isFullScreen Whether the mode is fullscreen
   */
  constructor(readonly isFullScreen: boolean) {
    super();
  }
}
