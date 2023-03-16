import { z } from 'zod';
import { StateContext } from '@ngxs/store';
export enum LinkType {
  Internal = 'internal',
  External = 'external',
}
// export interface ComponentType<T> {
//   new (...args: any): T;
// }

export type LinkId = z.infer<(typeof LINK_REGISTRY_SCHEMA)['keySchema']>;

export type LinkEntry = z.infer<(typeof LINK_REGISTRY_SCHEMA)['valueSchema']>;

export type LinkRegistryContext = StateContext<LinkRegistryModel>;

export type LinkRegistryModel = z.infer<typeof LINK_REGISTRY_SCHEMA>;

export const LINK_REGISTRY_SCHEMA = z.record(
  z
    .string()
    .transform((id) => `LinkId:${id}`)
    .brand('LinkId'),
  z.discriminatedUnion('type', [
    z.object({ type: z.literal(LinkType.External), url: z.string() }),
    z.object({ type: z.literal(LinkType.Internal), component: z.string() }),
  ])
);

export function createLinkId(id: string): LinkId {
  return LINK_REGISTRY_SCHEMA.keySchema.parse(id);
}
