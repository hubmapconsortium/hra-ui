import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/** Types for Link */
export enum LinkType {
  Internal = 'internal',
  External = 'external',
}

/** Type for unique identifier for link */
export type LinkId = z.infer<(typeof LINK_REGISTRY_SCHEMA)['keySchema']>;

/** entry for link registry */
export type LinkEntry = z.infer<(typeof LINK_REGISTRY_SCHEMA)['valueSchema']>;

/** Model for LinkRegistry State */
export type LinkRegistryModel = z.infer<typeof LINK_REGISTRY_SCHEMA>;

/** type for State Context of LinkRegistry */
export type LinkRegistryContext = StateContext<LinkRegistryModel>;

/** Type for external link entry */
export const EXTERNAL_LINK_SCHEMA = z.object({ type: z.literal(LinkType.External), url: z.string() });

/** Type for internal link entry */
export const INTERNAL_LINK_SCHEMA = z
  .object({
    type: z.literal(LinkType.Internal),
    commands: z.any().array(),
    extras: z
      .object({
        queryParams: z.record(z.any()).nullable(),
        fragment: z.string(),
        queryParamsHandling: z.enum(['merge', 'preserve', '']).nullable(),
        preserveFragment: z.boolean(),
        onSameUrlNavigation: z.literal('reload'),
        skipLocationChange: z.boolean(),
        replaceUrl: z.boolean(),
      })
      .partial(),
  })
  .partial({ extras: true });

/** Schema for link registry */
export const LINK_REGISTRY_SCHEMA = z.record(
  z
    .string()
    .transform((id) => `LinkId:'${id}'`)
    .brand('LinkId'),
  z.discriminatedUnion('type', [EXTERNAL_LINK_SCHEMA, INTERNAL_LINK_SCHEMA])
);

/** function to createa unique link ids */
export function createLinkId(id: string): LinkId {
  return LINK_REGISTRY_SCHEMA.keySchema.parse(id);
}
