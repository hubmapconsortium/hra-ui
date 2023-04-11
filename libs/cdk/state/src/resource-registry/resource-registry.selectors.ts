import { Selector } from '@ngxs/store';
import {
  BuiltinResourceType,
  createCustomResourceType,
  getEntry,
  isBuiltinType,
  isCustomType,
  ResourceEntry,
  ResourceId,
  ResourceRegistryModel,
  ResourceType,
} from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

/**
 * Query function returned by {@link ResourceRegistrySelectors.query}
 * @deprecated Use selectors with improved type inference instead
 */
export type ResourceRegistryQuery = (id: ResourceId, type?: string) => ResourceEntry | undefined;

/** Query function returned by {@link ResourceRegistrySelectors.entry} */
export type ResourceRegistryEntryQuery = <T extends ResourceEntry>(
  id: ResourceId,
  type: ResourceType<T>
) => T | undefined;

/** Query function returned by {@link ResourceRegistrySelectors.anyEntry} */
export type ResourceRegistryAnyEntryQuery = (id: ResourceId) => ResourceEntry | undefined;

/** Query function returned by {@link ResourceRegistrySelectors.field} */
export type ResourceRegistryFieldQuery = <T extends ResourceEntry, K extends keyof T, D = undefined>(
  id: ResourceId,
  type: ResourceType<T>,
  field: K,
  defaultValue?: D
) => T[K] | D;

/** Query function for resource data */
export type ResourceRegistryDataQuery<T> = (id: ResourceId) => T | undefined;

/** Selectors for ResourceRegistry */
export class ResourceRegistrySelectors {
  /**
   * Queries for a resource entry
   * @deprecated Replaced by selectors with better type inference,
   * see {@link ResourceRegistrySelectors.entry} and {@link ResourceRegistrySelectors.anyEntry}
   * @param state Current state
   * @returns Resource query function
   */
  @Selector([ResourceRegistryState])
  static query(state: ResourceRegistryModel): ResourceRegistryQuery {
    return (id, type?) => {
      const isWrappedType = type === undefined || isBuiltinType(type) || isCustomType(type);
      const wrappedType = isWrappedType ? type : createCustomResourceType(type);
      return getEntry(state, id, wrappedType as never);
    };
  }

  @Selector([ResourceRegistryState])
  static entry(state: ResourceRegistryModel): ResourceRegistryEntryQuery {
    return (id, type) => getEntry(state, id, type);
  }

  @Selector([ResourceRegistryState])
  static anyEntry(state: ResourceRegistryModel): ResourceRegistryAnyEntryQuery {
    return (id) => getEntry(state, id);
  }

  @Selector([ResourceRegistryState])
  static field(state: ResourceRegistryModel): ResourceRegistryFieldQuery {
    return (id, type, field, defaultValue?) => {
      const entry = getEntry(state, id, type);
      return entry?.[field] ?? (defaultValue as never);
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
      const entry = getEntry(state, id);
      switch (entry?.type) {
        case BuiltinResourceType.Markdown:
          return entry.markdown;

        case BuiltinResourceType.Text:
          return entry.text;

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
  @Selector([ResourceRegistrySelectors.field])
  static markdown(getField: ResourceRegistryFieldQuery): ResourceRegistryDataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Markdown, 'markdown');
  }

  /**
   * Query for text data
   * @param state Current state
   * @returns Text data query function
   */
  @Selector([ResourceRegistrySelectors.field])
  static text(getField: ResourceRegistryFieldQuery): ResourceRegistryDataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Text, 'text');
  }

  /**
   * Query for an url
   * @param state Current state
   * @returns Url query function
   */
  @Selector([ResourceRegistrySelectors.field])
  static url(getField: ResourceRegistryFieldQuery): ResourceRegistryDataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Url, 'url');
  }
}
