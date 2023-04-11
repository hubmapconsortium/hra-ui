export * as ResourceRegistryActions from './resource-registry.actions';
export {
  createCustomResourceType,
  createResourceId,
  isBuiltinType,
  isCustomType,
  ResourceEntry,
  ResourceId,
  ResourceType,
} from './resource-registry.model';
export {
  ResourceRegistryAnyEntryQuery,
  ResourceRegistryDataQuery,
  ResourceRegistryEntryQuery,
  ResourceRegistryFieldQuery,
  ResourceRegistryQuery,
  ResourceRegistrySelectors,
} from './resource-registry.selectors';
export { ResourceRegistryState } from './resource-registry.state';
