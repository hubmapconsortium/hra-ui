import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/** Unique identifier for a resource */
export type ResourceId = z.infer<(typeof RESOURCE_REGISTRY_SCHEMA)['keySchema']>;

/** Built in resource types with additional support */
export enum ResourceType {
  Markdown = 'markdown',
  Text = 'text',
  Url = 'url',
}

/** Entry types with built in support */
export type BuiltinResourceEntry = z.infer<(typeof RESOURCE_REGISTRY_SCHEMA)['valueSchema']['options'][0]>;

/** Entry for custom user types without built in support */
export type CustomResourceEntry = z.infer<(typeof RESOURCE_REGISTRY_SCHEMA)['valueSchema']['options'][1]>;

/** Discriminated union of all resource interfaces */
export type ResourceEntry = z.infer<(typeof RESOURCE_REGISTRY_SCHEMA)['valueSchema']>;

/** State data model */
export type ResourceRegistryModel = z.infer<typeof RESOURCE_REGISTRY_SCHEMA>;

/** Context type for action handlers */
export type ResourceRegistryContext = StateContext<ResourceRegistryModel>;

/** Resource registry schema validator */
export const RESOURCE_REGISTRY_SCHEMA = z.record(
  z
    .string()
    .transform((id) => `ResourceId:'${id}'`)
    .brand('ResourceId'),
  z
    .discriminatedUnion('type', [
      z.object({ type: z.literal(ResourceType.Markdown), markdown: z.string() }),
      z.object({ type: z.literal(ResourceType.Text), text: z.string() }),
      z.object({ type: z.literal(ResourceType.Url), url: z.string() }),
    ])
    .or(z.object({ type: z.string() }).passthrough())
);

/**
 * Creates a new resource identifier
 * @param id Unique resource identifier
 * @returns A new identifier
 */
export function createResourceId(id: string): ResourceId {
  return RESOURCE_REGISTRY_SCHEMA.keySchema.parse(id);
}
