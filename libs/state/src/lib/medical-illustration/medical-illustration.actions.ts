import { Action } from '@hra-ui/cdk/state';

export class SetUri extends Action('[Medical Illustration] Set URI') {
  constructor(readonly url?: string) {
    super();
  }
}

export class SetActiveNode extends Action('[Medical Illustration] Set Active Node') {
  constructor(readonly node?: Record<string, unknown>) {
    super();
  }
}
