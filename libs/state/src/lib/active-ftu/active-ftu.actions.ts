import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('ActiveFtu');

export class Load extends Action('Load') {
  constructor(readonly iri: Iri) {
    super();
  }
}

export class Clear extends Action('Clear') {}

export class Reset extends Action('Reset') {}
