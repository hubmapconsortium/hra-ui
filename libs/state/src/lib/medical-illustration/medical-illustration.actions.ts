import { Action } from '@hra-ui/cdk/state';

export class SaveUrl extends Action('[Medical Illustration] Save Url') {
  constructor(readonly url?: string) {
    super();
  }
}

export class NodeHover extends Action('[Medical Illustration] Node Hover') {
  constructor(readonly node?: string) {
    super();
  }
}
