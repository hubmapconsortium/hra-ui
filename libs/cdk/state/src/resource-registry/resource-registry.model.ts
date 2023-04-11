import { UnionMember } from '@hra-ui/utils/types';
import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/** Resource identifier */
export type ResourceId = z.infer<typeof RESOURCE_ID>;

/** Resource type string with entry typings */
export type ResourceType<T extends ResourceEntry> = T['type'] & { _typings: T };

/** Any resource entry */
export type ResourceEntry = z.infer<typeof RESOURCE_ENTRY>;

/** State data model */
export type ResourceRegistryModel = z.infer<typeof RESOURCE_REGISTRY_SCHEMA>;

/** Context type for action handlers */
export type ResourceRegistryContext = StateContext<ResourceRegistryModel>;

// ------------------------------------
// Identifier
// ------------------------------------

/** Resource identifier validator with transformation */
export const RESOURCE_ID = z
  .string()
  .transform((id) => `ResourceId:'${id}'`)
  .brand('ResourceId');

// ------------------------------------
// Builtin entries
// ------------------------------------

/** Extracts the builtin entry with type T */
type ExtractBuiltinEntryType<T> = UnionMember<z.infer<typeof BUILTIN_ENTRY>, 'type', T>;

/** Maps raw builtin type strings to ResourceType */
type BuiltinTypes<T = typeof BuiltinResourceEntryType> = {
  [K in keyof T]: ResourceType<ExtractBuiltinEntryType<T[K]>>;
};

/** Raw builtin type strings */
export enum BuiltinResourceEntryType {
  Markdown = 'markdown',
  Text = 'text',
  Url = 'url',
}

/** Builtin resource types */
export const BuiltinResourceType = BuiltinResourceEntryType as BuiltinTypes;

/** Markdown data */
export const MARKDOWN_ENTRY = z.object({
  type: z.literal(BuiltinResourceEntryType.Markdown),
  markdown: z.string(),
});

/** Text data */
export const TEXT_ENTRY = z.object({
  type: z.literal(BuiltinResourceEntryType.Text),
  text: z.string(),
});

/** External url */
export const URL_ENTRY = z.object({
  type: z.literal(BuiltinResourceEntryType.Url),
  url: z.string().url(),
});

/** Union of all builtin entries */
export const BUILTIN_ENTRY = z.discriminatedUnion('type', [MARKDOWN_ENTRY, TEXT_ENTRY, URL_ENTRY]);

// ------------------------------------
// Custom entry
// ------------------------------------

/** Custom entry types */
type CustomType<T extends string> = `custom:${T}`;

/** Custom entry type validator with transformation */
export const CUSTOM_ENTRY_TYPE = z
  .string()
  .refine((val) => !isBuiltinType(val), 'Invalid builtin resource format')
  .transform<CustomType<string>>(createCustomResourceType);

/** Custom entry */
export const CUSTOM_ENTRY = z.object({ type: CUSTOM_ENTRY_TYPE }).passthrough();

// ------------------------------------
// Other schemas
// ------------------------------------

/** Builtin or custom entries */
export const RESOURCE_ENTRY = z.union([BUILTIN_ENTRY, CUSTOM_ENTRY]);

/** State schema */
export const RESOURCE_REGISTRY_SCHEMA = z.record(RESOURCE_ID, RESOURCE_ENTRY);

// ------------------------------------
// Utilities
// ------------------------------------

/** Prefix of all custom types */
const CUSTOM_TYPE_PREFIX = 'custom:';

/** Builtin type strings as an array */
const BUILTIN_TYPE_VALUES = Object.values(BuiltinResourceEntryType);

/**
 * Determines whether a type string has builtin support
 * @param type The type string
 * @returns True if type is one of the builtin types, otherwise false
 */
export function isBuiltinType(type: string): type is BuiltinTypes[keyof BuiltinTypes] {
  return BUILTIN_TYPE_VALUES.includes(type as never);
}

/**
 * Determines whether a type is a custom resource type
 * @param type The type string
 * @returns True if type is a custom type, otherwise false
 */
export function isCustomType(type: string): type is ResourceType<z.infer<typeof CUSTOM_ENTRY>> {
  const unwrappedType = type.slice(CUSTOM_TYPE_PREFIX.length);
  return type.startsWith(CUSTOM_TYPE_PREFIX) && !isBuiltinType(unwrappedType);
}

/**
 * Creates a new resource identifier
 * @param id Raw identifier
 * @returns A resource id
 */
export function createResourceId(id: string) {
  return RESOURCE_ID.parse(id);
}

/**
 * Creates a custom resource type with specified properties
 * @param type Raw resource type
 * @returns A new resource type with typings
 */
export function createCustomResourceType<Props extends object, T extends string = string>(
  type: T
): ResourceType<{ type: CustomType<T> } & Props> {
  return `${CUSTOM_TYPE_PREFIX}${type}` as ResourceType<{ type: CustomType<T> } & Props>;
}

/**
 * Internal helper function for getting an entry from the state
 * @param state Current state snapshot
 * @param id Resource id
 * @param type Optional entry type
 * @returns The entry object it exists and has the correct type, otherwise undefined
 */
export function getEntry<T extends ResourceEntry>(
  state: ResourceRegistryModel,
  id: ResourceId,
  type?: ResourceType<T>
): T | undefined {
  const entry = state[id];
  const typeMatches = type === undefined || entry?.type === type;
  return typeMatches ? (entry as never) : undefined;
}
