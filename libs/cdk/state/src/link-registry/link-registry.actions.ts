import { UrlCreationOptions } from '@angular/router';
import { ActionGroup } from '../actions/actions';
import { LinkEntry, LinkId } from './link-registry.model';

/** Base action factory */
const Action = ActionGroup('LinkRegistry');

/** Add a single link */
export class Add extends Action('Add') {
  /**
   * Add or overwrite a single link
   * @param id link identifier
   * @param entry link entry
   */
  constructor(readonly id: LinkId, readonly entry: LinkEntry) {
    super();
  }
}

/** Add multiple links at once */
export class AddMany extends Action('Add Many') {
  /**
   * Add or overwrite multiple links
   * @param entries New links
   */
  constructor(readonly entries: Partial<Record<LinkId, LinkEntry>>) {
    super();
  }
}

/** Add entries from yaml file */
export class AddFromYaml extends Action('Add from Yaml') {
  /**
   * Add links from unparsed yaml
   * @param yaml Unparsed yaml data
   */
  constructor(readonly yaml: string) {
    super();
  }
}

/** Add links from a remote yaml file */
export class LoadFromYaml extends Action('Load from Yaml') {
  /**
   * Loads a remote yaml file and add links
   * @param url Remote yaml file url
   */
  constructor(readonly url: string) {
    super();
  }
}
/** Navigate to an Internal or external url from Link id */
export class Navigate extends Action('Navigate') {
  /**
   * navigate to a link
   * @param id unqiue identifier of link
   * @param extras Options when building the navigation url
   */
  constructor(readonly id: LinkId, readonly extras: UrlCreationOptions = {}) {
    super();
  }
}
