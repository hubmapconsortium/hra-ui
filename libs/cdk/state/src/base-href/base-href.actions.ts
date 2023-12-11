import { ActionGroup } from '../actions/actions';

/** Base action factory */
const Action = ActionGroup('BaseHref');

/** Sets the base href */
export class Set extends Action('Set') {
  /**
   * Sets the base href
   * @param baseHref New href
   */
  constructor(readonly baseHref: string) {
    super();
  }
}
