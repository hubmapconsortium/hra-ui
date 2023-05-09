import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('SourceRefs');

export class Load extends Action('Load') {
  constructor(readonly iri: Iri) {
    super();
  }
}

export class Reset extends Action('Reset') {}
