import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('ActiveFtu');

/** Loads the Iri */
export class Load extends Action('Load') {
  /**
   * Creates an instance of set iri.
   * @param iri
   */
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Action to set the illustration url of the active FTU */
export class SetIllustrationUrl extends Action('Set Illustration Url') {
  /**
   * Creates an instance of set iri.
   * @param iri
   */
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Clears the Iri */
export class Clear extends Action('Clear') {}

/** Resets state */
export class Reset extends Action('Reset') {}
