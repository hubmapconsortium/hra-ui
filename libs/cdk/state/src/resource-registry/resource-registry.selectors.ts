import { UnionMember } from '@hra-ui/utils/types';
import { Selector } from '@ngxs/store';
import {
  BuiltinResourceEntry,
  CustomResourceEntry,
  ResourceEntry,
  ResourceId,
  ResourceRegistryModel,
  ResourceType,
} from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

/** Query function for resource entry optionally with type specified */
export interface ResourceRegistryQuery {
  /** Get a resource entry with builtin type */
  <T extends ResourceType>(id: ResourceId, type: T): UnionMember<BuiltinResourceEntry, 'type', T> | undefined;
  /** Get a resource entry of any type */
  (id: ResourceId, type?: string): CustomResourceEntry | undefined;
}

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
    return (id: ResourceId, type?: ResourceType | string) => {
      const entry = ResourceRegistrySelectors.getEntry(state, id, type);
      return entry as BuiltinResourceEntry;
    };
  }

  /**
   * Query for any text data
   * @param state Current state
   * @returns Text data query function
   */
  @Selector([ResourceRegistryState])
  static anyText(state: ResourceRegistryModel): ResourceRegistryDataQuery<string> {
    return (id) => {
      const entry = ResourceRegistrySelectors.getEntry(state, id);
      switch (entry?.type) {
        case ResourceType.Markdown:
          return entry.markdown as string;

        case ResourceType.Text:
          return entry.text as string;

        default:
          return undefined;
      }
    };
  }

  /**
   * Query for markdown data
   * @param state Current state
   * @returns Markdown data query function
   */
  @Selector([ResourceRegistryState])
  static markdown(state: ResourceRegistryModel): ResourceRegistryDataQuery<string> {
    return (id) => ResourceRegistrySelectors.getEntry(state, id, ResourceType.Markdown)?.markdown;
  }

  /**
   * Query for text data
   * @param state Current state
   * @returns Text data query function
   */
  @Selector([ResourceRegistryState])
  static text(state: ResourceRegistryModel): ResourceRegistryDataQuery<string> {
    return (id) => ResourceRegistrySelectors.getEntry(state, id, ResourceType.Text)?.text;
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
