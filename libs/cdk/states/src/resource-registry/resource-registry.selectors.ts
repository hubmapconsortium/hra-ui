import { Selector } from '@ngxs/store';
import { ResourceEntry, ResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

export class ResourceRegistrySelectors {
  @Selector([ResourceRegistryState])
  static query(state: ResourceRegistryModel): (id: ResourceId, type: ResourceType) => unknown {
    return (id, type) => this.getEntryByType(state, id, type);
  }

  @Selector([ResourceRegistryState])
  static url(state: ResourceRegistryModel, id: ResourceId) {
    return this.query(state)(id, ResourceType.Url);
  }

  @Selector([ResourceRegistryState])
  static markdown(state: ResourceRegistryModel, id: ResourceId) {
    return this.getEntryByType(state, id, ResourceType.Markdown)?.markdown;
  }

  private static getEntryByType<T extends ResourceType>(
    state: ResourceRegistryModel,
    id: ResourceId,
    type: T
  ): Extract<ResourceEntry, { type: T }> | undefined;
  private static getEntryByType(state: ResourceRegistryModel, id: ResourceId, type: string): ResourceEntry | undefined;
  private static getEntryByType(
    state: ResourceRegistryModel,
    id: ResourceId,
    type: ResourceEntry | string
  ): ResourceEntry | undefined {
    const entry = state[id];
    return entry?.type === type ? entry : undefined;
  }
}
