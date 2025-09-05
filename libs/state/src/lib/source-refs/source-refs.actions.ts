import { Action } from '@hra-ui/cdk/state';
import { Iri, SourceReference } from '@hra-ui/services';

/**
 * Action to load the state with the current Iri
 */
export class Load extends Action('[SourceRefs] Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

/**
 * Action to set selected source references
 */
export class SetSelectedSources extends Action('[SourceRefs] Set Selected Sources') {
  /** Intializes the set iri */
  constructor(readonly sources: SourceReference[]) {
    super();
  }
}

/**
 * Action to reset selected source references
 */
export class ResetSelectedSources extends Action('[SourceRefs] Reset Selected Sources') {}

/**
 * Action to reset the state
 */
export class Reset extends Action('[SourceRefs] Reset') {}
