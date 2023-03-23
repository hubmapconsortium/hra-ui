import { Action } from '@hra-ui/cdk/state';

export class SaveUrl extends Action('[Medical Illustration] SaveUrl') {
  constructor(readonly url?: string) {
    super();
  }
}
