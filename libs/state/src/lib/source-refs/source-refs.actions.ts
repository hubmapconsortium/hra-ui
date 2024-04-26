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

/**
 * Action to set selected source references
 */
export class SetSelectedSources extends Action('Set Selected Sources') {
  /** Intializes the set iri */
  constructor(readonly sources: SourceReference[]) {
    super();
  }
}

/**
 * Action to reset selected source references
 */
export class ResetSelectedSources extends Action('Reset Selected Sources') {}

/**
 * Action to reset the state
 */
export class Reset extends Action('Reset') {}
