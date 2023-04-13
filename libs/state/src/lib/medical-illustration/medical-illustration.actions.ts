import { Action } from '@hra-ui/cdk/state';
import { MapEntry } from './medical-illustration.model';

export class SetUri extends Action('[Medical Illustration] Set URI') {
  constructor(readonly url?: string) {
    super();
  }
}

export class SetActiveNode extends Action('[Medical Illustration] Set Active Node') {
  constructor(readonly node?: MapEntry) {
    super();
  }
}

export class SetMapping extends Action('[Medical Illustration] Set Mapping') {
  constructor(readonly url: string) {
    super();
  }
}
