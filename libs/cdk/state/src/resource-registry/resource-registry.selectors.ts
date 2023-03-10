import { Selector } from '@ngxs/store';
import { ResourceEntry, ResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

/** Selectors for Resource registry */
export class ResourceRegistrySelectors {
  /**
   * queries the resource registry for data and returns a function
   * @param state resource registry state
   * @returns value of the resource
   */
  @Selector([ResourceRegistryState])
  static query(state: ResourceRegistryModel): (id: ResourceId, type: ResourceType) => ResourceEntry | undefined {
    return (id, type) => this.getEntryByType(state, id, type);
  }

  /**
   * Selector for getting url from the resource registry
   * @param state resource registry state
   * @param id id of the resource
   * @returns resource data
   */
  @Selector([ResourceRegistryState])
  static url(state: ResourceRegistryModel): (id: ResourceId) => string | undefined {
    return (id) => this.getEntryByType(state, id, ResourceType.Url)?.url;
  }

  /**
   * Selector for markdown content
   * @param state resource registry state
   * @param id id of the resource
   * @returns markdown of the resource
   */
  @Selector([ResourceRegistryState])
  static markdown(state: ResourceRegistryModel): (id: ResourceId) => string | undefined {
    return (id) => this.getEntryByType(state, id, ResourceType.Markdown)?.markdown;
  }

  /**
   * get resource entry based on type
   * @param state resource registry state
   * @param id id of the resource
   * @param type type of the resource
   */
  private static getEntryByType<T extends ResourceType>(
    state: ResourceRegistryModel,
    id: ResourceId,
    type: T
  ): Extract<ResourceEntry, { type: T }> | undefined;
  /** get resource entry by type if type is a string */
  private static getEntryByType(state: ResourceRegistryModel, id: ResourceId, type: string): ResourceEntry | undefined;
  /** get resource entry by type if type is of ResourceType */
  private static getEntryByType(
    state: ResourceRegistryModel,
    id: ResourceId,
    type: ResourceType | string
  ): ResourceEntry | undefined {
    const entry = state[id];
    return entry?.type === type ? entry : undefined;
  }
}
