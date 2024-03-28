import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri, SourceReference } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('SourceRefs');

/**
 * Action to load the state with the current Iri
 */
export class Load extends Action('Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

export class SetSelectedSources extends Action('Set Sources') {
  /** Intializes the set iri */
  constructor(readonly sources: SourceReference[]) {
    super();
  }
}

/**
 * Action to reset the state
 */
export class Reset extends Action('Reset') {}
