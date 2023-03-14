import { UnionMember } from '@hra-ui/utils/types';
import { Selector } from '@ngxs/store';
import { ResourceEntry, ResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

/** Query function for resource entry optionally with type specified */
export type ResourceRegistryQuery = <T extends ResourceType | string = string>(
  id: ResourceId,
  type?: T
) => UnionMember<ResourceEntry, 'type', T> | undefined;

/** Query function for resource data */
export type ResourceRegistryDataQuery<T> = (id: ResourceId) => T | undefined;

/** Selectors for ResourceRegistry */
export class ResourceRegistrySelectors {
  /**
   * Queries for a resource entry
   * @param state Current state
   * @returns Resource query function
   */
  @Selector([ResourceRegistryState])
  static query(state: ResourceRegistryModel): ResourceRegistryQuery {
    return (id, type) => ResourceRegistrySelectors.getEntry(state, id, type);
  }

  /**
   * Query for an url
   * @param state Current state
   * @returns Url query function
   */
  @Selector([ResourceRegistryState])
  static url(state: ResourceRegistryModel): ResourceRegistryDataQuery<string> {
    return (id) => ResourceRegistrySelectors.getEntry(state, id, ResourceType.Url)?.url;
  }

  /**
   * Query for a markdown data
   * @param state Current state
   * @returns Markdown data query function
   */
  @Selector([ResourceRegistryState])
  static markdown(state: ResourceRegistryModel): ResourceRegistryDataQuery<string> {
    return (id) => this.getEntry(state, id, ResourceType.Markdown)?.markdown;
  }

  /**
   * Gets a resource entry by id and optionally type
   * @param state Resource registry state
   * @param id Entry id
   * @param type Optional entry type
   * @returns The entry if found, undefined otherwise
   */
  private static getEntry<T extends ResourceType | string>(
    state: ResourceRegistryModel,
    id: ResourceId,
    type?: T
  ): UnionMember<ResourceEntry, 'type', T> | undefined {
    const entry = state[id] as UnionMember<ResourceEntry, 'type', T>;
    const typeMatches = type === undefined || entry?.type === type;
    return typeMatches ? entry : undefined;
  }
}
