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

/** type for internal link entry */
export type InternalLinkEntry = z.infer<typeof INTERNAL_LINK_SCHEMA>;

/** type for external link entry */
export type ExternalLinkEntry = z.infer<typeof EXTERNAL_LINK_SCHEMA>;

/** Model for LinkRegistry State */
export type LinkRegistryModel = z.infer<typeof LINK_REGISTRY_SCHEMA>;

/** type for State Context of LinkRegistry */
export type LinkRegistryContext = StateContext<LinkRegistryModel>;

/** Type for external link entry */
export const EXTERNAL_LINK_SCHEMA = z
  .object({
    type: z.literal(LinkType.External),
    url: z.string(),
    rel: z.string().default('noopener'),
    target: z.string(),
  })
  .partial({ rel: true, target: true });

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

/** Empty link id */
export const EMPTY_LINK = createLinkId('@@__EMPTY__');
