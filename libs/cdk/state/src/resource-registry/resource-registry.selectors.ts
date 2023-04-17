import { Selector } from '@ngxs/store';
import {
  BuiltinResourceType,
  getEntry,
  ResourceEntry,
  ResourceId,
  ResourceRegistryModel,
  ResourceType,
} from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

/** Query function returned by {@link ResourceRegistrySelectors.entry} */
export type EntryQuery = <T extends ResourceEntry>(id: ResourceId, type: ResourceType<T>) => T | undefined;

/** Query function returned by {@link ResourceRegistrySelectors.anyEntry} */
export type AnyEntryQuery = (id: ResourceId) => ResourceEntry | undefined;

/** Query function returned by {@link ResourceRegistrySelectors.field} */
export type FieldQuery = <T extends ResourceEntry, K extends keyof T>(
  id: ResourceId,
  type: ResourceType<T>,
  field: K,
  defaultValue?: T[K]
) => T[K];

/** Query function for resource data */
export type DataQuery<T> = (id: ResourceId) => T;

/** Selectors for ResourceRegistry */
export class ResourceRegistrySelectors {
  /**
   * Queries an entry by id and type
   * @param state Current state
   * @returns Entry query function
   */
  @Selector([ResourceRegistryState])
  static entry(state: ResourceRegistryModel): EntryQuery {
    return (id, type) => getEntry(state, id, type);
  }

  /**
   * Queries an entry by id
   * @param state Current state
   * @returns Any entry query function
   */
  @Selector([ResourceRegistryState])
  static anyEntry(state: ResourceRegistryModel): AnyEntryQuery {
    return (id) => getEntry(state, id);
  }

  /**
   * Queries a field of an entry
   * @param state Current state
   * @returns A field query function
   */
  @Selector([ResourceRegistryState])
  static field(state: ResourceRegistryModel): FieldQuery {
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
  static anyText(state: ResourceRegistryModel): DataQuery<string> {
    return (id) => {
      const entry = getEntry(state, id);
      switch (entry?.type) {
        case BuiltinResourceType.Markdown:
          return entry.markdown ?? '';

        case BuiltinResourceType.Text:
          return entry.text ?? '';

        default:
          return '';
      }
    };
  }

  /**
   * Query for markdown data
   * @param state Current state
   * @returns Markdown data query function
   */
  @Selector([ResourceRegistrySelectors.field])
  static markdown(getField: FieldQuery): DataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Markdown, 'markdown', '');
  }

  /**
   * Query for text data
   * @param state Current state
   * @returns Text data query function
   */
  @Selector([ResourceRegistrySelectors.field])
  static text(getField: FieldQuery): DataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Text, 'text', '');
  }

  /**
   * Query for an url
   * @param state Current state
   * @returns Url query function
   */
  @Selector([ResourceRegistrySelectors.field])
  static url(getField: FieldQuery): DataQuery<string> {
    return (id) => getField(id, BuiltinResourceType.Url, 'url', '');
  }
}
