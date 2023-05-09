import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('Illustrator');

export class Load extends Action('Load') {
  constructor(readonly iri: Iri) {
    super();
  }
}

export class SetSelection extends Action('Set Selection') {
  constructor(readonly selected: unknown) {
    super();
  }
}

export class ClearSelection extends Action('Clear Selection') {}

export class Reset extends Action('Reset') {}
