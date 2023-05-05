import { ActionGroup } from '@hra-ui/cdk/state';
import { MapEntry } from './medical-illustration.model';

/** Action base */
const Action = ActionGroup('Medical Illustration');

/**
 * Action for setting the current illustration URI
 */
export class SetUri extends Action('Set URI') {
  /**
   * Creates an instance of set uri.
   * @param [url]
   */
  constructor(readonly url?: string) {
    super();
  }
}

/**
 * Action for setting the current illustration URI from IRI
 */
export class SetUriFromIRI extends Action('Set URI From IRI') {
  /**
   * Creates an instance of set uri from iri.
   * @param [url]
   */
  constructor(readonly iri: string) {
    super();
  }
}

/**
 * Action for setting the current active node
 */
export class SetActiveNode extends Action('Set Active Node') {
  /**
   * Creates an instance of set active node.
   * @param [node]
   */
  constructor(readonly node?: MapEntry) {
    super();
  }
}

/**
 * Action for setting the mapping file
 */
export class SetMapping extends Action('Set Mapping') {
  /**
   * Creates an instance of set mapping.
   * @param url
   */
  constructor(readonly url: string) {
    super();
  }
}

/** Loads reference organ data */
export class LoadReferenceOrgans extends Action('Load Reference Organs') {}
