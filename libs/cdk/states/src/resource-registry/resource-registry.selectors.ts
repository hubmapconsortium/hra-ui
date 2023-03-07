import { ResourceId, ResourceRegistryModel } from './resource-registry.state';

export class ResourceRegistrySelectors {
  static query(state: ResourceRegistryModel): (id: ResourceId, type: unknown) => unknown {
    return (id, type) => {
      return state[id];
    };
  }

  static url(state: ResourceRegistryModel, id: ResourceId) {
    return this.query(state)(id, 'url');
  }

  static markdown(state: ResourceRegistryModel, id: ResourceId) {
    return this.query(state)(id, 'markdown');
  }
}
