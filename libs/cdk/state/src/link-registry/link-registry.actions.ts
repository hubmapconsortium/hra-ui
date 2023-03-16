import { NavigationExtras, Params } from '@angular/router';
import { ActionGroup } from '../actions/actions';
import { LinkEntry, LinkId } from './link-registry.model';

/** Base action factory */
const Action = ActionGroup('LinkRegistry');

/** Add a single resource */
export class Add extends Action('Add') {
  /**
   * Add or overwrite a single resource
   * @param id Resource identifier
   * @param entry Resource entry
   */
  constructor(readonly id: LinkId, readonly entry: LinkEntry) {
    super();
  }
}

/** Add multiple resources at once */
export class AddMany extends Action('Add Many') {
  /**
   * Add or overwrite multiple resources
   * @param entries New resources
   */
  constructor(readonly entries: Partial<Record<LinkId, LinkEntry>>) {
    super();
  }
}

export class NavigateToInternalLink {
  /**
   * Creates an instance of NavigateToInternalLink
   *
   * @param commands URL fragments
   * @param queryParams Query parameters
   * @param extras Additional navigation configuration
   */
  constructor(
    readonly commands: string | unknown[],
    readonly queryParams?: Params,
    readonly extras?: NavigationExtras
  ) {}
}
