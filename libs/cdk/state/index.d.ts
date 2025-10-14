import * as _hra_ui_cdk_state from '@hra-ui/cdk/state';
import * as i1 from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import * as i0 from '@angular/core';
import { UrlCreationOptions } from '@angular/router';
import { z } from 'zod';
import { UnionMember } from '@hra-ui/utils/types';
import { Observable } from 'rxjs';

/**
 * Asserts that an action type is unique
 * @param type Action type string
 * @throws If the action type is not unique
 */
declare function assertUniqueActionType(type: string): void;
/**
 * Registers an action type
 * @param type Action type string
 * @throws If the action type is not unique
 */
declare function registerActionType(type: string): void;

/** Base action constructor */
interface ActionConstructor {
    /** Action type */
    readonly type: string;
    /** Create a new action */
    new (): Action;
}
/**
 * Creates an action factory that adds a common group string to each action type
 * @param group Common action type group
 * @returns An action factory
 */
declare function ActionGroup(group: string): (type: string) => ActionConstructor;
/** Base action type */
interface Action {
    /** Action type */
    readonly type: string;
}
/**
 * Creates a new base action with a specified type
 * @param type Action type
 * @returns A base action class
 */
declare function Action(type: string): ActionConstructor;

declare const Set_base$1: _hra_ui_cdk_state.ActionConstructor;
/** Sets the base href */
declare class Set$1 extends Set_base$1 {
    readonly baseHref: string;
    /**
     * Sets the base href
     * @param baseHref New href
     */
    constructor(baseHref: string);
}

declare namespace baseHref_actions_d {
  export {
    Set$1 as Set,
  };
}

/** Selectors for BaseHrefState */
declare class BaseHrefSelectors {
    /**
     * Returns base href value
     * @param value href value
     * @returns href value
     */
    static baseHref(value: string): string;
}

/**
 * State holding the base href
 */
declare class BaseHrefState {
    /**
     * Sets base href value
     * @param ctx state context
     * @param { baseHref } href value
     */
    setBaseHref(ctx: StateContext<string>, { baseHref }: Set$1): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseHrefState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseHrefState>;
}

/** Types for Link */
declare enum LinkType {
    Internal = "internal",
    External = "external"
}
/** Schema for link ID */
declare const LINK_ID_SCHEMA: z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "LinkId">;
/** Type for unique identifier for link */
type LinkId = z.infer<typeof LINK_ID_SCHEMA>;
/** Type for external link entry */
declare const EXTERNAL_LINK_SCHEMA: z.ZodObject<{
    type: z.ZodLiteral<LinkType.External>;
    url: z.ZodString;
    rel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    target: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Type for internal link entry */
declare const INTERNAL_LINK_SCHEMA: z.ZodObject<{
    type: z.ZodLiteral<LinkType.Internal>;
    commands: z.ZodArray<z.ZodAny>;
    extras: z.ZodOptional<z.ZodObject<{
        queryParams: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        fragment: z.ZodOptional<z.ZodString>;
        queryParamsHandling: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            "": "";
            merge: "merge";
            preserve: "preserve";
        }>>>;
        preserveFragment: z.ZodOptional<z.ZodBoolean>;
        onSameUrlNavigation: z.ZodOptional<z.ZodLiteral<"reload">>;
        skipLocationChange: z.ZodOptional<z.ZodBoolean>;
        replaceUrl: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Schema for link entry */
declare const LINK_ENTRY_SCHEMA: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<LinkType.External>;
    url: z.ZodString;
    rel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    target: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<LinkType.Internal>;
    commands: z.ZodArray<z.ZodAny>;
    extras: z.ZodOptional<z.ZodObject<{
        queryParams: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        fragment: z.ZodOptional<z.ZodString>;
        queryParamsHandling: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            "": "";
            merge: "merge";
            preserve: "preserve";
        }>>>;
        preserveFragment: z.ZodOptional<z.ZodBoolean>;
        onSameUrlNavigation: z.ZodOptional<z.ZodLiteral<"reload">>;
        skipLocationChange: z.ZodOptional<z.ZodBoolean>;
        replaceUrl: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>], "type">;
/** entry for link registry */
type LinkEntry = z.infer<typeof LINK_ENTRY_SCHEMA>;
/** type for internal link entry */
type InternalLinkEntry = z.infer<typeof INTERNAL_LINK_SCHEMA>;
/** type for external link entry */
type ExternalLinkEntry = z.infer<typeof EXTERNAL_LINK_SCHEMA>;
/** Schema for link registry */
declare const LINK_REGISTRY_SCHEMA: z.ZodRecord<z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "LinkId">, z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<LinkType.External>;
    url: z.ZodString;
    rel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    target: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<LinkType.Internal>;
    commands: z.ZodArray<z.ZodAny>;
    extras: z.ZodOptional<z.ZodObject<{
        queryParams: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        fragment: z.ZodOptional<z.ZodString>;
        queryParamsHandling: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            "": "";
            merge: "merge";
            preserve: "preserve";
        }>>>;
        preserveFragment: z.ZodOptional<z.ZodBoolean>;
        onSameUrlNavigation: z.ZodOptional<z.ZodLiteral<"reload">>;
        skipLocationChange: z.ZodOptional<z.ZodBoolean>;
        replaceUrl: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>], "type">>;
/** Model for LinkRegistry State */
type LinkRegistryModel = z.infer<typeof LINK_REGISTRY_SCHEMA>;
/** type for State Context of LinkRegistry */
type LinkRegistryContext = StateContext<LinkRegistryModel>;
/** function to createa unique link ids */
declare function createLinkId(id: string): LinkId;
/** Empty link id */
declare const EMPTY_LINK: string & z.core.$brand<"LinkId">;

declare const Add_base$1: _hra_ui_cdk_state.ActionConstructor;
/** Add a single link */
declare class Add$1 extends Add_base$1 {
    readonly id: LinkId;
    readonly entry: LinkEntry;
    /**
     * Add or overwrite a single link
     * @param id link identifier
     * @param entry link entry
     */
    constructor(id: LinkId, entry: LinkEntry);
}
declare const AddMany_base$1: _hra_ui_cdk_state.ActionConstructor;
/** Add multiple links at once */
declare class AddMany$1 extends AddMany_base$1 {
    readonly entries: Partial<Record<LinkId, LinkEntry>>;
    /**
     * Add or overwrite multiple links
     * @param entries New links
     */
    constructor(entries: Partial<Record<LinkId, LinkEntry>>);
}
declare const AddFromYaml_base$1: _hra_ui_cdk_state.ActionConstructor;
/** Add entries from yaml file */
declare class AddFromYaml$1 extends AddFromYaml_base$1 {
    readonly yaml: string;
    /**
     * Add links from unparsed yaml
     * @param yaml Unparsed yaml data
     */
    constructor(yaml: string);
}
declare const LoadFromYaml_base$1: _hra_ui_cdk_state.ActionConstructor;
/** Add links from a remote yaml file */
declare class LoadFromYaml$1 extends LoadFromYaml_base$1 {
    readonly url: string;
    /**
     * Loads a remote yaml file and add links
     * @param url Remote yaml file url
     */
    constructor(url: string);
}
declare const Navigate_base: _hra_ui_cdk_state.ActionConstructor;
/** Navigate to an Internal or external url from Link id */
declare class Navigate extends Navigate_base {
    readonly id: LinkId;
    readonly extras: UrlCreationOptions;
    /**
     * navigate to a link
     * @param id unqiue identifier of link
     * @param extras Options when building the navigation url
     */
    constructor(id: LinkId, extras?: UrlCreationOptions);
}

type linkRegistry_actions_d_Navigate = Navigate;
declare const linkRegistry_actions_d_Navigate: typeof Navigate;
declare namespace linkRegistry_actions_d {
  export {
    Add$1 as Add,
    AddFromYaml$1 as AddFromYaml,
    AddMany$1 as AddMany,
    LoadFromYaml$1 as LoadFromYaml,
    linkRegistry_actions_d_Navigate as Navigate,
  };
}

/** Query function for link entry optionally with type specified */
type LinkRegistryQuery = <T extends LinkType | string = string>(id: LinkId, type?: T) => UnionMember<LinkEntry, 'type', T> | undefined;
/** State for keeping track of links globally */
declare class LinkRegistryState {
    /** Http service for link loading */
    private readonly http;
    /** Injects angular router */
    private readonly router;
    /** Injects ngZone for routing */
    private readonly zone;
    /**
     * Add a single entry
     * @param ctx State context
     * @param action Action with id and entry to add
     */
    addOne(ctx: LinkRegistryContext, { id, entry }: Add$1): void;
    /**
     * Add multiple entries
     * @param ctx State context
     * @param action Action with entries to add
     */
    addMany(ctx: LinkRegistryContext, { entries }: AddMany$1): void;
    /**
     * Parse and add entries from yaml
     * @param ctx State context
     * @param action Action with raw yaml data
     * @param filename Optional url/filename from which the data was loaded (for improved error messages)
     */
    addYaml(ctx: LinkRegistryContext, { yaml }: AddFromYaml$1, filename?: string): void;
    /**
     * Load and add entries from an external yaml file
     * @param ctx State context
     * @param action Action with the external file url
     * @returns An observable that completes when the entries has been added
     */
    loadYaml(ctx: LinkRegistryContext, { url }: LoadFromYaml$1): Observable<void>;
    /**
     * Navigate to Internal or External urls from id
     * @param ctx State context
     * @param param1 Navigate action with link id
     * @returns A promise
     */
    navigate(ctx: LinkRegistryContext, { id, extras }: Navigate): Promise<void>;
    /**
     * Method to navigate to an internal link using Angular router
     * @param entry Internal Link Entry with commands and extras
     */
    private navigateToInternal;
    /**
     * Method to navigate to an external link using window
     * @param entry External link entry with url, target, and rel
     */
    private navigateToExternal;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkRegistryState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LinkRegistryState>;
}

/**
 * Selectors for Link Registry
 */
declare class LinkRegistrySelectors {
    /**
     * Queries for a link entry
     * @param state Current state
     * @returns link query function
     */
    static query(state: LinkRegistryModel): LinkRegistryQuery;
    /**
     * Gets a link entry by id and optionally type
     * @param state link registry state
     * @param id Entry id
     * @param type Optional entry type
     * @returns The entry if found, undefined otherwise
     */
    private static getEntry;
}

/** Resource identifier */
type ResourceId = z.infer<typeof RESOURCE_ID>;
/** Resource type string with entry typings */
type ResourceType<T extends ResourceEntry> = T['type'] & {
    _typings: T;
} & z.BRAND<'ResourceType'>;
/** Custom entry types */
type CustomResourceType<T extends string> = `custom:${T}`;
/** Any resource entry */
type ResourceEntry = z.infer<typeof RESOURCE_ENTRY>;
/** Typed custom resource entry */
type CustomResourceEntry<T extends string, Props extends object> = {
    type: CustomResourceType<T>;
} & Props;
/** Payload type used when creating custom types */
type ResourceEntryPayload<Props extends object> = Props & z.BRAND<'ResourceEntryPayload'>;
/** State data model */
type ResourceRegistryModel = z.infer<typeof RESOURCE_REGISTRY_SCHEMA>;
/** Context type for action handlers */
type ResourceRegistryContext = StateContext<ResourceRegistryModel>;
/** Resource identifier validator with transformation */
declare const RESOURCE_ID: z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "ResourceId">;
/** Extracts the builtin entry with type T */
type ExtractBuiltinEntryType<T> = UnionMember<z.infer<typeof BUILTIN_ENTRY>, 'type', T>;
/** Maps raw builtin type strings to ResourceType */
type BuiltinTypes<T = typeof RawBuiltinResourceType> = {
    [K in keyof T]: ResourceType<ExtractBuiltinEntryType<T[K]>>;
};
/** Raw builtin type strings */
declare enum RawBuiltinResourceType {
    Markdown = "markdown",
    Text = "text",
    Url = "url"
}
/** Builtin resource types */
declare const BuiltinResourceType: BuiltinTypes;
/** Union of all builtin entries */
declare const BUILTIN_ENTRY: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Markdown>;
    markdown: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Text>;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Url>;
    url: z.ZodString;
}, z.core.$strip>], "type">;
/** Custom entry */
declare const CUSTOM_ENTRY: z.ZodObject<{
    type: z.ZodPipe<z.ZodString, z.ZodTransform<`custom:${string}`, string>>;
}, z.core.$loose>;
/** Builtin or custom entries */
declare const RESOURCE_ENTRY: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Markdown>;
    markdown: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Text>;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Url>;
    url: z.ZodString;
}, z.core.$strip>], "type">, z.ZodObject<{
    type: z.ZodPipe<z.ZodString, z.ZodTransform<`custom:${string}`, string>>;
}, z.core.$loose>]>;
/** State schema */
declare const RESOURCE_REGISTRY_SCHEMA: z.ZodRecord<z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "ResourceId">, z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Markdown>;
    markdown: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Text>;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<RawBuiltinResourceType.Url>;
    url: z.ZodString;
}, z.core.$strip>], "type">, z.ZodObject<{
    type: z.ZodPipe<z.ZodString, z.ZodTransform<`custom:${string}`, string>>;
}, z.core.$loose>]>>;
/**
 * Determines whether a type string has builtin support
 * @param type The type string
 * @returns True if type is one of the builtin types, otherwise false
 */
declare function isBuiltinType(type: string): type is BuiltinTypes[keyof BuiltinTypes];
/**
 * Determines whether a type is a custom resource type
 * @param type The type string
 * @returns True if type is a custom type, otherwise false
 */
declare function isCustomType(type: string): type is ResourceType<z.infer<typeof CUSTOM_ENTRY>>;
/**
 * Creates a new resource identifier
 * @param id Raw identifier
 * @returns A resource id
 */
declare function createResourceId(id: string): string & z.core.$brand<"ResourceId">;
/**
 * Helper function used to specify the payload format when creating custom types
 * @returns A custom payload type
 * @see {@link createCustomType} for usage
 */
declare function payload<Props extends object>(): ResourceEntryPayload<Props>;
/**
 * Creates a custom resource type
 * @param type Raw resource type
 * @returns A new resource type
 */
declare function createCustomType<T extends string>(type: T): ResourceType<CustomResourceEntry<T, Partial<Record<string, unknown>>>>;
/**
 * Creates a custom resource type with a payload. The payload should be
 * specified using the {@link payload} function
 * @example
 * const MyResourceType = createCustomType('my-type', payload<{ value: number }>());
 *
 * @param type Raw resource type
 * @param payload Payload type
 * @returns A new resource type
 */
declare function createCustomType<T extends string, Props extends object>(type: T, payload: (() => ResourceEntryPayload<Props>) | ResourceEntryPayload<Props>): ResourceType<CustomResourceEntry<T, Props>>;

declare const Add_base: _hra_ui_cdk_state.ActionConstructor;
/** Add a single resource */
declare class Add extends Add_base {
    readonly id: ResourceId;
    readonly entry: ResourceEntry;
    /**
     * Add or overwrite a single resource
     * @param id Resource identifier
     * @param entry Resource entry
     */
    constructor(id: ResourceId, entry: ResourceEntry);
}
declare const AddMany_base: _hra_ui_cdk_state.ActionConstructor;
/** Add multiple resources at once */
declare class AddMany extends AddMany_base {
    readonly entries: Partial<Record<ResourceId, ResourceEntry>>;
    /**
     * Add or overwrite multiple resources
     * @param entries New resources
     */
    constructor(entries: Partial<Record<ResourceId, ResourceEntry>>);
}
declare const AddFromYaml_base: _hra_ui_cdk_state.ActionConstructor;
/** Add resources from raw yaml data */
declare class AddFromYaml extends AddFromYaml_base {
    readonly yaml: string;
    /**
     * Add resources from unparsed yaml
     * @param yaml Unparsed yaml data
     */
    constructor(yaml: string);
}
declare const LoadFromYaml_base: _hra_ui_cdk_state.ActionConstructor;
/** Add resources from a remote yaml file */
declare class LoadFromYaml extends LoadFromYaml_base {
    readonly url: string;
    /**
     * Loads a remote yaml file and add resources
     * @param url Remote yaml file url
     */
    constructor(url: string);
}
declare const LoadMarkdown_base: _hra_ui_cdk_state.ActionConstructor;
/** Add a markdown resource with data loaded from a remote file */
declare class LoadMarkdown extends LoadMarkdown_base {
    readonly id: ResourceId;
    readonly url: string;
    /**
     * Loads a remote markdown file and add a resource
     * @param id Resource id
     * @param url Remote markdown file url
     */
    constructor(id: ResourceId, url: string);
}

type resourceRegistry_actions_d_Add = Add;
declare const resourceRegistry_actions_d_Add: typeof Add;
type resourceRegistry_actions_d_AddFromYaml = AddFromYaml;
declare const resourceRegistry_actions_d_AddFromYaml: typeof AddFromYaml;
type resourceRegistry_actions_d_AddMany = AddMany;
declare const resourceRegistry_actions_d_AddMany: typeof AddMany;
type resourceRegistry_actions_d_LoadFromYaml = LoadFromYaml;
declare const resourceRegistry_actions_d_LoadFromYaml: typeof LoadFromYaml;
type resourceRegistry_actions_d_LoadMarkdown = LoadMarkdown;
declare const resourceRegistry_actions_d_LoadMarkdown: typeof LoadMarkdown;
declare namespace resourceRegistry_actions_d {
  export {
    resourceRegistry_actions_d_Add as Add,
    resourceRegistry_actions_d_AddFromYaml as AddFromYaml,
    resourceRegistry_actions_d_AddMany as AddMany,
    resourceRegistry_actions_d_LoadFromYaml as LoadFromYaml,
    resourceRegistry_actions_d_LoadMarkdown as LoadMarkdown,
  };
}

/** Query function returned by {@link ResourceRegistrySelectors.entry} */
type EntryQuery = <T extends ResourceEntry>(id: ResourceId, type: ResourceType<T>) => T | undefined;
/** Query function returned by {@link ResourceRegistrySelectors.anyEntry} */
type AnyEntryQuery = (id: ResourceId) => ResourceEntry | undefined;
/** Query function returned by {@link ResourceRegistrySelectors.field} */
type FieldQuery = <T extends ResourceEntry, K extends keyof T>(id: ResourceId, type: ResourceType<T>, field: K, defaultValue?: T[K]) => T[K];
/** Query function for resource data */
type DataQuery<T> = (id: ResourceId) => T;
/** Selectors for ResourceRegistry */
declare class ResourceRegistrySelectors {
    /**
     * Queries an entry by id and type
     * @param state Current state
     * @returns Entry query function
     */
    static entry(state: ResourceRegistryModel): EntryQuery;
    /**
     * Queries an entry by id
     * @param state Current state
     * @returns Any entry query function
     */
    static anyEntry(state: ResourceRegistryModel): AnyEntryQuery;
    /**
     * Queries a field of an entry
     * @param state Current state
     * @returns A field query function
     */
    static field(state: ResourceRegistryModel): FieldQuery;
    /**
     * Query for any text data
     * @param state Current state
     * @returns Text data query function
     */
    static anyText(state: ResourceRegistryModel): DataQuery<string>;
    /**
     * Query for markdown data
     * @param state Current state
     * @returns Markdown data query function
     */
    static markdown(getField: FieldQuery): DataQuery<string>;
    /**
     * Query for text data
     * @param state Current state
     * @returns Text data query function
     */
    static text(getField: FieldQuery): DataQuery<string>;
    /**
     * Query for an url
     * @param state Current state
     * @returns Url query function
     */
    static url(getField: FieldQuery, baseHref?: string): DataQuery<string>;
}

/** State keeping track of global resources */
declare class ResourceRegistryState {
    /** Http service for resource loading */
    private readonly http;
    /**
     * Add a single entry
     * @param ctx State context
     * @param action Action with id and entry to add
     */
    addOne(ctx: ResourceRegistryContext, { id, entry }: Add): void;
    /**
     * Add multiple entries
     * @param ctx State context
     * @param action Action with entries to add
     */
    addMany(ctx: ResourceRegistryContext, { entries }: AddMany): void;
    /**
     * Parse and add entries from yaml
     * @param ctx State context
     * @param action Action with raw yaml data
     * @param filename Optional url/filename from which the data was loaded (for improved error messages)
     */
    addYaml(ctx: ResourceRegistryContext, { yaml }: AddFromYaml, filename?: string): void;
    /**
     * Load and add entries from an external yaml file
     * @param ctx State context
     * @param action Action with the external file url
     * @returns An observable that completes when the entries has been added
     */
    loadYaml(ctx: ResourceRegistryContext, { url }: LoadFromYaml): Observable<void>;
    /**
     * Adds a markdown entry with content loaded from an external file
     * @param ctx State context
     * @param action Action with id and url to the external markdown
     * @returns An observable that completes when the entry has been added
     */
    loadMarkdown(ctx: ResourceRegistryContext, { id, url }: LoadMarkdown): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResourceRegistryState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResourceRegistryState>;
}

declare class CdkStateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkStateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CdkStateModule, never, [typeof i1.ɵNgxsFeatureModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CdkStateModule>;
}

/**
 * StorageId - enum with values as Local, Session - identifier for storage types
 */
declare enum StorageId {
    Local = "local",
    Session = "session"
}
/** Type alias for the array of Storage objects */
type StorageModel = Record<StorageId, number>;
/** Helper alias for action handler's ctx argument */
type StorageContext = StateContext<StorageModel>;

declare const Set_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Class Set Action for set method
 */
declare class Set extends Set_base {
    readonly id: StorageId;
    readonly key: string;
    readonly value: string;
    /**
     * constructor class for Set action object
     * @param id - type: StorageId - Storage identifier
     * @param key - type: string - Key to be stored in the storage identifier
     * @param value - type: string - value to be stored with the key
     */
    constructor(id: StorageId, key: string, value: string);
}
declare const Delete_base: _hra_ui_cdk_state.ActionConstructor;
/**
 *  Class Delete Action for delete method
 */
declare class Delete extends Delete_base {
    readonly id: StorageId;
    readonly key: string;
    /**
     * constructor class for Delete action object
     * @param id - type: StorageId - Storage identifier
     * @param key - type: string - Key to be stored in the storage identifier
     */
    constructor(id: StorageId, key: string);
}
declare const Clear_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Clear the values stored in the specified StorageId
 */
declare class Clear extends Clear_base {
    readonly id: StorageId;
    /**
     * constructor class for clear action object
     * @param id - type: StorageId - Storage identifier
     */
    constructor(id: StorageId);
}

type storage_actions_d_Clear = Clear;
declare const storage_actions_d_Clear: typeof Clear;
type storage_actions_d_Delete = Delete;
declare const storage_actions_d_Delete: typeof Delete;
type storage_actions_d_Set = Set;
declare const storage_actions_d_Set: typeof Set;
declare namespace storage_actions_d {
  export {
    storage_actions_d_Clear as Clear,
    storage_actions_d_Delete as Delete,
    storage_actions_d_Set as Set,
  };
}

/**
 * Storage selectors - class for retrieving storage types
 */
declare class StorageSelectors {
    /**
     * returns the value stored in the key,value pair in the storageId given
     * @returns (id,key) of the given storage id else undefined
     */
    static get(_state: unknown): (id: StorageId, key: string) => string | undefined;
    /**
     * returns the number of items in the given storage id stored
     * @returns length of the given StorageId supplied
     */
    static length(_state: unknown): (id: StorageId) => number | undefined;
}

/**
 * State holding Storage types
 */
declare class StorageState {
    /**
     * StorageState class to manage storage objects
     * @param id-Storage Identifier
     * @returns - Storage objects - session and local
     */
    static getStorage(id: StorageId): Storage;
    /**
     * sets the key,value pair in the given storageId
     * @param ctx - StorageContext object
     * @param param1- {id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    set(ctx: StorageContext, { id, key, value }: Set): void;
    /**
     * deletes the value pointed by key in the list of values stored in the specified storage id
     * @param ctx - StorageContext object
     * @param param1- id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    delete(ctx: StorageContext, { id, key }: Delete): void;
    /**
     * clears the values of the specified storage id
     * @param ctx - StorageContext object
     * @param param1 - id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    clear(ctx: StorageContext, { id }: Clear): void;
    /**
     * increases count after each operation is performed on the specified storage id
     * @param ctx  - StorageContext obje
     * @param id - StorageId - Storage identifier for which the change count has to be updated
     */
    private increaseChangeCount;
    static ɵfac: i0.ɵɵFactoryDeclaration<StorageState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StorageState>;
}

export { Action, ActionGroup, baseHref_actions_d as BaseHrefActions, BaseHrefSelectors, BaseHrefState, BuiltinResourceType, CdkStateModule, EMPTY_LINK, linkRegistry_actions_d as LinkRegistryActions, LinkRegistrySelectors, LinkRegistryState, LinkType, resourceRegistry_actions_d as ResourceRegistryActions, ResourceRegistrySelectors, ResourceRegistryState, storage_actions_d as StorageActions, StorageId, StorageSelectors, StorageState, assertUniqueActionType, createCustomType, createLinkId, createResourceId, isBuiltinType, isCustomType, payload, registerActionType };
export type { ActionConstructor, AnyEntryQuery, DataQuery, EntryQuery, ExternalLinkEntry, FieldQuery, InternalLinkEntry, LinkEntry, LinkId, ResourceEntry, ResourceId, ResourceType };
