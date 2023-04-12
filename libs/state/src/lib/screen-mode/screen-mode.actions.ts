import { Action } from '@hra-ui/cdk/state';

export class Set extends Action('[Screenmode] Set Screenmode') {
  constructor(readonly isFullScreen: boolean) {
    super();
  }
}
