import { ActionGroup } from '../actions/actions';
import { ResourceEntry, ResourceId } from './resource-registry.model';

/** Base action factory */
const Action = ActionGroup('ResourceRegistry');

/** Add a single resource */
export class Add extends Action('Add') {
  /**
   * Add or overwrite a single resource
   * @param id Resource identifier
   * @param entry Resource entry
   */
  constructor(readonly id: ResourceId, readonly entry: ResourceEntry) {
    super();
  }
}

/** Add multiple resources at once */
export class AddMany extends Action('Add Many') {
  /**
   * Add or overwrite multiple resources
   * @param entries New resources
   */
  constructor(readonly entries: Partial<Record<ResourceId, ResourceEntry>>) {
    super();
  }
}

/** Add resources from raw yaml data */
export class AddFromYaml extends Action('Add from Yaml') {
  /**
   * Add resources from unparsed yaml
   * @param yaml Unparsed yaml data
   */
  constructor(readonly yaml: string) {
    super();
  }
}

/** Add resources from a remote yaml file */
export class LoadFromYaml extends Action('Load from Yaml') {
  /**
   * Loads a remote yaml file and add resources
   * @param url Remote yaml file url
   */
  constructor(readonly url: string) {
    super();
  }
}

/** Add a markdown resource with data loaded from a remote file */
export class LoadMarkdown extends Action('Load Markdown') {
  /**
   * Loads a remote markdown file and add a resource
   * @param id Resource id
   * @param url Remote markdown file url
   */
  constructor(readonly id: ResourceId, readonly url: string) {
    super();
  }
}
