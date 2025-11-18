import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/** Types for Link */
export enum LinkType {
  Internal = 'internal',
  External = 'external',
}

/** Schema for link ID */
export const LINK_ID_SCHEMA = z
  .string()
  .transform((id) => `LinkId:'${id}'`)
  .brand('LinkId');

/** Type for unique identifier for link */
export type LinkId = z.infer<typeof LINK_ID_SCHEMA>;

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
        queryParams: z.record(z.string(), z.any()).nullable(),
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

/** Schema for link entry */
export const LINK_ENTRY_SCHEMA = z.discriminatedUnion('type', [EXTERNAL_LINK_SCHEMA, INTERNAL_LINK_SCHEMA]);

/** entry for link registry */
export type LinkEntry = z.infer<typeof LINK_ENTRY_SCHEMA>;

/** type for internal link entry */
export type InternalLinkEntry = z.infer<typeof INTERNAL_LINK_SCHEMA>;

/** type for external link entry */
export type ExternalLinkEntry = z.infer<typeof EXTERNAL_LINK_SCHEMA>;

/** Schema for link registry */
export const LINK_REGISTRY_SCHEMA = z.record(LINK_ID_SCHEMA, LINK_ENTRY_SCHEMA);

/** Model for LinkRegistry State */
export type LinkRegistryModel = z.infer<typeof LINK_REGISTRY_SCHEMA>;

/** type for State Context of LinkRegistry */
export type LinkRegistryContext = StateContext<LinkRegistryModel>;

/** function to createa unique link ids */
export function createLinkId(id: string): LinkId {
  return LINK_ID_SCHEMA.parse(id);
}

/** Empty link id */
export const EMPTY_LINK = createLinkId('@@__EMPTY__');
