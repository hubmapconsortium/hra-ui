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

/** Update the screen mode */
export class SetSize extends Action('[Screenmode] Set Size') {
  /**
   * Creates an instance of Set
   * @param size Whether the mode is small/large to toggle the footer behaviour
   */
  constructor(readonly size: 'small' | 'large') {
    super();
  }
}
