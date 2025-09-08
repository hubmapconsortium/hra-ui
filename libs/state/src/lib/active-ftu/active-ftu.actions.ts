import { Action } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';

/** Loads the Iri */
export class Load extends Action('[ActiveFtu] Load') {
  /**
   * Creates an instance of set iri.
   * @param iri
   */
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Action to set the illustration url of the active FTU */
export class SetIllustrationUrl extends Action('[ActiveFtu] Set Illustration Url') {
  /**
   * Creates an instance of set iri.
   * @param iri
   */
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Clears the Iri */
export class Clear extends Action('[ActiveFtu] Clear') {}

/** Resets state */
export class Reset extends Action('[ActiveFtu] Reset') {}
