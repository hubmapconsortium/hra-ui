import { ActionGroup } from '@hra-ui/cdk/state';
import { IllustrationMappingItem, Iri } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('Illustrator');

/**
 * Loads the state with the current Iri
 */
export class Load extends Action('Load') {
  constructor(readonly iri: Iri) {
    super();
  }
}

/**
 * Sets the selection for the Item in the current state
 */
export class SetSelection extends Action('Set Selection') {
  constructor(readonly selected: IllustrationMappingItem) {
    super();
  }
}

/**
 * Clears the selection for the current state
 */
export class ClearSelection extends Action('Clear Selection') {}

/**
 * Resets the state
 */
export class Reset extends Action('Reset') {}
