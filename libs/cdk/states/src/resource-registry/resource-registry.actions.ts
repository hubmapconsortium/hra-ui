import { ResourceId } from './resource-registry.state';

/** Action for Loading Markdown resource */
export class LoadMarkdown {
  /** Action type */
  static readonly type = '[ResourceRegistry] LoadMarkdown';

  /**
   * Creates an instance of LoadMarkdown
   * @param id Id of resource
   * @param url url of the resource to load
   */
  constructor(readonly id: ResourceId, readonly url: string) {}
}

/** Action for Adding Resource */
export class AddResource {
  /** Action type */
  static readonly type = '[ResourceRegistry] AddResource';

  /**
   * Creates an instance of AddResource
   * @param id Id of resource
   * @param entry resource to be added
   */
  constructor(readonly id: ResourceId, readonly entry: unknown) {}
}
