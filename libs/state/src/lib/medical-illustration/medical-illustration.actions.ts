import { Action } from '@hra-ui/cdk/state';
import { MapEntry } from './medical-illustration.model';

/**
 * Action for setting the current illustration URI
 */
export class SetUri extends Action('[Medical Illustration] Set URI') {
  /**
   * Creates an instance of set uri.
   * @param [url]
   */
  constructor(readonly url?: string) {
    super();
  }
}

export class SetUriFromIRI extends Action('[Medical Illustration] Set URI From IRI') {
  constructor(readonly iri?: string) {
    super();
  }
}

/**
 * Action for setting the current active node
 */
export class SetActiveNode extends Action('[Medical Illustration] Set Active Node') {
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
export class SetMapping extends Action('[Medical Illustration] Set Mapping') {
  /**
   * Creates an instance of set mapping.
   * @param url
   */
  constructor(readonly url: string) {
    super();
  }
}
