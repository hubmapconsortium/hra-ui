import { __decorate, __metadata } from 'tslib';
import * as i1 from '@ngxs/store';
import { Action as Action$5, State, Selector, NgxsModule } from '@ngxs/store';
import * as i0 from '@angular/core';
import { Injectable, inject, NgZone, NgModule } from '@angular/core';
import * as z from 'zod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createExternalUrl } from '@hra-ui/utils';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { produce } from 'immer';

/** Registry of action types */
const actionTypeRegistry = new Set();
/**
 * Asserts that an action type is unique
 * @param type Action type string
 * @throws If the action type is not unique
 */
function assertUniqueActionType(type) {
    if (actionTypeRegistry.has(type)) {
        throw new Error(`Action type '${type}' is not unique`);
    }
}
/**
 * Registers an action type
 * @param type Action type string
 * @throws If the action type is not unique
 */
function registerActionType(type) {
    assertUniqueActionType(type);
    actionTypeRegistry.add(type);
}

/**
 * Creates an action factory that adds a common group string to each action type
 * @param group Common action type group
 * @returns An action factory
 */
function ActionGroup(group) {
    return (type) => Action$4(`[${group}] ${type}`);
}
/**
 * Creates a new base action with a specified type
 * @param type Action type
 * @returns A base action class
 */
function Action$4(type) {
    registerActionType(type);
    return class BaseAction {
        constructor() {
            this.type = type;
        }
        static { this.type = type; }
    };
}

/** Base action factory */
const Action$3 = ActionGroup('BaseHref');
/** Sets the base href */
let Set$2 = class Set extends Action$3('Set') {
    /**
     * Sets the base href
     * @param baseHref New href
     */
    constructor(baseHref) {
        super();
        this.baseHref = baseHref;
    }
};

var baseHref_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Set: Set$2
});

/**
 * State holding the base href
 */
let BaseHrefState = class BaseHrefState {
    /**
     * Sets base href value
     * @param ctx state context
     * @param { baseHref } href value
     */
    setBaseHref(ctx, { baseHref }) {
        if (baseHref !== '' && !baseHref.endsWith('/')) {
            baseHref = baseHref + '/';
        }
        ctx.setState(baseHref);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BaseHrefState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BaseHrefState }); }
};
__decorate([
    Action$5(Set$2),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Set$2]),
    __metadata("design:returntype", void 0)
], BaseHrefState.prototype, "setBaseHref", null);
BaseHrefState = __decorate([
    State({
        name: 'baseHref',
        defaults: '',
    })
], BaseHrefState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BaseHrefState, decorators: [{
            type: Injectable
        }], propDecorators: { setBaseHref: [] } });

/** Selectors for BaseHrefState */
class BaseHrefSelectors {
    /**
     * Returns base href value
     * @param value href value
     * @returns href value
     */
    static baseHref(value) {
        return value;
    }
}
__decorate([
    Selector([BaseHrefState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], BaseHrefSelectors, "baseHref", null);

/** Base action factory */
const Action$2 = ActionGroup('LinkRegistry');
/** Add a single link */
let Add$1 = class Add extends Action$2('Add') {
    /**
     * Add or overwrite a single link
     * @param id link identifier
     * @param entry link entry
     */
    constructor(id, entry) {
        super();
        this.id = id;
        this.entry = entry;
    }
};
/** Add multiple links at once */
let AddMany$1 = class AddMany extends Action$2('Add Many') {
    /**
     * Add or overwrite multiple links
     * @param entries New links
     */
    constructor(entries) {
        super();
        this.entries = entries;
    }
};
/** Add entries from yaml file */
let AddFromYaml$1 = class AddFromYaml extends Action$2('Add from Yaml') {
    /**
     * Add links from unparsed yaml
     * @param yaml Unparsed yaml data
     */
    constructor(yaml) {
        super();
        this.yaml = yaml;
    }
};
/** Add links from a remote yaml file */
let LoadFromYaml$1 = class LoadFromYaml extends Action$2('Load from Yaml') {
    /**
     * Loads a remote yaml file and add links
     * @param url Remote yaml file url
     */
    constructor(url) {
        super();
        this.url = url;
    }
};
/** Navigate to an Internal or external url from Link id */
class Navigate extends Action$2('Navigate') {
    /**
     * navigate to a link
     * @param id unqiue identifier of link
     * @param extras Options when building the navigation url
     */
    constructor(id, extras = {}) {
        super();
        this.id = id;
        this.extras = extras;
    }
}

var linkRegistry_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Add: Add$1,
    AddFromYaml: AddFromYaml$1,
    AddMany: AddMany$1,
    LoadFromYaml: LoadFromYaml$1,
    Navigate: Navigate
});

/** Types for Link */
var LinkType;
(function (LinkType) {
    LinkType["Internal"] = "internal";
    LinkType["External"] = "external";
})(LinkType || (LinkType = {}));
/** Schema for link ID */
const LINK_ID_SCHEMA = z
    .string()
    .transform((id) => `LinkId:'${id}'`)
    .brand('LinkId');
/** Type for external link entry */
const EXTERNAL_LINK_SCHEMA = z
    .object({
    type: z.literal(LinkType.External),
    url: z.string(),
    rel: z.string().default('noopener'),
    target: z.string(),
})
    .partial({ rel: true, target: true });
/** Type for internal link entry */
const INTERNAL_LINK_SCHEMA = z
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
const LINK_ENTRY_SCHEMA = z.discriminatedUnion('type', [EXTERNAL_LINK_SCHEMA, INTERNAL_LINK_SCHEMA]);
/** Schema for link registry */
const LINK_REGISTRY_SCHEMA = z.record(LINK_ID_SCHEMA, LINK_ENTRY_SCHEMA);
/** function to createa unique link ids */
function createLinkId(id) {
    return LINK_ID_SCHEMA.parse(id);
}
/** Empty link id */
const EMPTY_LINK = createLinkId('@@__EMPTY__');

/** State for keeping track of links globally */
let LinkRegistryState = class LinkRegistryState {
    constructor() {
        /** Http service for link loading */
        this.http = inject(HttpClient);
        /** Injects angular router */
        this.router = inject(Router, { optional: true });
        /** Injects ngZone for routing */
        this.zone = inject(NgZone);
    }
    /**
     * Add a single entry
     * @param ctx State context
     * @param action Action with id and entry to add
     */
    addOne(ctx, { id, entry }) {
        this.addMany(ctx, new AddMany$1({ [id]: entry }));
    }
    /**
     * Add multiple entries
     * @param ctx State context
     * @param action Action with entries to add
     */
    addMany(ctx, { entries }) {
        ctx.patchState(entries);
    }
    /**
     * Parse and add entries from yaml
     * @param ctx State context
     * @param action Action with raw yaml data
     * @param filename Optional url/filename from which the data was loaded (for improved error messages)
     */
    addYaml(ctx, { yaml }, filename) {
        const data = load(yaml, { filename });
        const entries = LINK_REGISTRY_SCHEMA.parse(data);
        this.addMany(ctx, new AddMany$1(entries));
    }
    /**
     * Load and add entries from an external yaml file
     * @param ctx State context
     * @param action Action with the external file url
     * @returns An observable that completes when the entries has been added
     */
    loadYaml(ctx, { url }) {
        return this.http
            .get(url, { responseType: 'text' })
            .pipe(map((data) => this.addYaml(ctx, new AddFromYaml$1(data), url)));
    }
    /**
     * Navigate to Internal or External urls from id
     * @param ctx State context
     * @param param1 Navigate action with link id
     * @returns A promise
     */
    async navigate(ctx, { id, extras }) {
        const entry = ctx.getState()[id];
        switch (entry?.type) {
            case LinkType.Internal:
                await this.navigateToInternal(entry, extras);
                break;
            case LinkType.External:
                this.navigateToExternal(entry, extras);
                break;
            default:
                throw new Error(`Cannot navigate to non-existing link '${id}'`);
        }
    }
    /**
     * Method to navigate to an internal link using Angular router
     * @param entry Internal Link Entry with commands and extras
     */
    async navigateToInternal(entry, extras) {
        await this.zone.run(() => this.router?.navigate(entry.commands, { ...entry.extras, ...extras }));
    }
    /**
     * Method to navigate to an external link using window
     * @param entry External link entry with url, target, and rel
     */
    navigateToExternal(entry, extras) {
        const url = createExternalUrl(entry.url, extras);
        window.open(url, entry.target, entry.rel);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkRegistryState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkRegistryState }); }
};
__decorate([
    Action$5(Add$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Add$1]),
    __metadata("design:returntype", void 0)
], LinkRegistryState.prototype, "addOne", null);
__decorate([
    Action$5(AddMany$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddMany$1]),
    __metadata("design:returntype", void 0)
], LinkRegistryState.prototype, "addMany", null);
__decorate([
    Action$5(AddFromYaml$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddFromYaml$1, String]),
    __metadata("design:returntype", void 0)
], LinkRegistryState.prototype, "addYaml", null);
__decorate([
    Action$5(LoadFromYaml$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LoadFromYaml$1]),
    __metadata("design:returntype", Observable)
], LinkRegistryState.prototype, "loadYaml", null);
__decorate([
    Action$5(Navigate),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Navigate]),
    __metadata("design:returntype", Promise)
], LinkRegistryState.prototype, "navigate", null);
LinkRegistryState = __decorate([
    State({
        name: 'linkRegistry',
        defaults: {},
    })
], LinkRegistryState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkRegistryState, decorators: [{
            type: Injectable
        }], propDecorators: { addOne: [], addMany: [], addYaml: [], loadYaml: [], navigate: [] } });

/**
 * Selectors for Link Registry
 */
class LinkRegistrySelectors {
    /**
     * Queries for a link entry
     * @param state Current state
     * @returns link query function
     */
    static query(state) {
        return (id, type) => this.getEntry(state, id, type);
    }
    /**
     * Gets a link entry by id and optionally type
     * @param state link registry state
     * @param id Entry id
     * @param type Optional entry type
     * @returns The entry if found, undefined otherwise
     */
    static getEntry(state, id, type) {
        const entry = state[id];
        const typeMatches = type === undefined || entry?.type === type;
        return typeMatches ? entry : undefined;
    }
}
__decorate([
    Selector([LinkRegistryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], LinkRegistrySelectors, "query", null);

/** Base action factory */
const Action$1 = ActionGroup('ResourceRegistry');
/** Add a single resource */
class Add extends Action$1('Add') {
    /**
     * Add or overwrite a single resource
     * @param id Resource identifier
     * @param entry Resource entry
     */
    constructor(id, entry) {
        super();
        this.id = id;
        this.entry = entry;
    }
}
/** Add multiple resources at once */
class AddMany extends Action$1('Add Many') {
    /**
     * Add or overwrite multiple resources
     * @param entries New resources
     */
    constructor(entries) {
        super();
        this.entries = entries;
    }
}
/** Add resources from raw yaml data */
class AddFromYaml extends Action$1('Add from Yaml') {
    /**
     * Add resources from unparsed yaml
     * @param yaml Unparsed yaml data
     */
    constructor(yaml) {
        super();
        this.yaml = yaml;
    }
}
/** Add resources from a remote yaml file */
class LoadFromYaml extends Action$1('Load from Yaml') {
    /**
     * Loads a remote yaml file and add resources
     * @param url Remote yaml file url
     */
    constructor(url) {
        super();
        this.url = url;
    }
}
/** Add a markdown resource with data loaded from a remote file */
class LoadMarkdown extends Action$1('Load Markdown') {
    /**
     * Loads a remote markdown file and add a resource
     * @param id Resource id
     * @param url Remote markdown file url
     */
    constructor(id, url) {
        super();
        this.id = id;
        this.url = url;
    }
}

var resourceRegistry_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Add: Add,
    AddFromYaml: AddFromYaml,
    AddMany: AddMany,
    LoadFromYaml: LoadFromYaml,
    LoadMarkdown: LoadMarkdown
});

// ------------------------------------
// Identifier
// ------------------------------------
/** Resource identifier validator with transformation */
const RESOURCE_ID = z
    .string()
    .transform((id) => `ResourceId:'${id}'`)
    .brand('ResourceId');
/** Raw builtin type strings */
var RawBuiltinResourceType;
(function (RawBuiltinResourceType) {
    RawBuiltinResourceType["Markdown"] = "markdown";
    RawBuiltinResourceType["Text"] = "text";
    RawBuiltinResourceType["Url"] = "url";
})(RawBuiltinResourceType || (RawBuiltinResourceType = {}));
/** Builtin resource types */
const BuiltinResourceType = RawBuiltinResourceType;
/** Markdown data */
const MARKDOWN_ENTRY = z.object({
    type: z.literal(RawBuiltinResourceType.Markdown),
    markdown: z.string(),
});
/** Text data */
const TEXT_ENTRY = z.object({
    type: z.literal(RawBuiltinResourceType.Text),
    text: z.string(),
});
/** External url */
const URL_ENTRY = z.object({
    type: z.literal(RawBuiltinResourceType.Url),
    url: z.string(),
});
/** Union of all builtin entries */
const BUILTIN_ENTRY = z.discriminatedUnion('type', [MARKDOWN_ENTRY, TEXT_ENTRY, URL_ENTRY]);
// ------------------------------------
// Custom entry
// ------------------------------------
/** Custom entry type validator with transformation */
const CUSTOM_ENTRY_TYPE = z
    .string()
    .refine((val) => !isBuiltinType(val), 'Invalid builtin resource format')
    .transform(createCustomType);
/** Custom entry */
const CUSTOM_ENTRY = z.object({ type: CUSTOM_ENTRY_TYPE }).passthrough();
// ------------------------------------
// Other schemas
// ------------------------------------
/** Builtin or custom entries */
const RESOURCE_ENTRY = z.union([BUILTIN_ENTRY, CUSTOM_ENTRY]);
/** State schema */
const RESOURCE_REGISTRY_SCHEMA = z.record(RESOURCE_ID, RESOURCE_ENTRY);
// ------------------------------------
// Utilities
// ------------------------------------
/** Prefix of all custom types */
const CUSTOM_TYPE_PREFIX = 'custom:';
/** Builtin type strings as an array */
const BUILTIN_TYPE_VALUES = Object.values(RawBuiltinResourceType);
/**
 * Determines whether a type string has builtin support
 * @param type The type string
 * @returns True if type is one of the builtin types, otherwise false
 */
function isBuiltinType(type) {
    return BUILTIN_TYPE_VALUES.includes(type);
}
/**
 * Determines whether a type is a custom resource type
 * @param type The type string
 * @returns True if type is a custom type, otherwise false
 */
function isCustomType(type) {
    const unwrappedType = type.slice(CUSTOM_TYPE_PREFIX.length);
    return type.startsWith(CUSTOM_TYPE_PREFIX) && !isBuiltinType(unwrappedType);
}
/**
 * Creates a new resource identifier
 * @param id Raw identifier
 * @returns A resource id
 */
function createResourceId(id) {
    return RESOURCE_ID.parse(id);
}
/**
 * Helper function used to specify the payload format when creating custom types
 * @returns A custom payload type
 * @see {@link createCustomType} for usage
 */
function payload() {
    return null;
}
/** Implementation of createCustomType overloads */
function createCustomType(type) {
    return `${CUSTOM_TYPE_PREFIX}${type}`;
}
/**
 * Internal helper function for getting an entry from the state
 * @param state Current state snapshot
 * @param id Resource id
 * @param type Optional entry type
 * @returns The entry object it exists and has the correct type, otherwise undefined
 */
function getEntry(state, id, type) {
    const entry = state[id];
    const typeMatches = type === undefined || entry?.type === type;
    return typeMatches ? entry : undefined;
}

/** State keeping track of global resources */
let ResourceRegistryState = class ResourceRegistryState {
    constructor() {
        /** Http service for resource loading */
        this.http = inject(HttpClient);
    }
    /**
     * Add a single entry
     * @param ctx State context
     * @param action Action with id and entry to add
     */
    addOne(ctx, { id, entry }) {
        this.addMany(ctx, new AddMany({ [id]: entry }));
    }
    /**
     * Add multiple entries
     * @param ctx State context
     * @param action Action with entries to add
     */
    addMany(ctx, { entries }) {
        ctx.patchState(entries);
    }
    /**
     * Parse and add entries from yaml
     * @param ctx State context
     * @param action Action with raw yaml data
     * @param filename Optional url/filename from which the data was loaded (for improved error messages)
     */
    addYaml(ctx, { yaml }, filename) {
        const data = load(yaml, { filename });
        const entries = RESOURCE_REGISTRY_SCHEMA.parse(data);
        this.addMany(ctx, new AddMany(entries));
    }
    /**
     * Load and add entries from an external yaml file
     * @param ctx State context
     * @param action Action with the external file url
     * @returns An observable that completes when the entries has been added
     */
    loadYaml(ctx, { url }) {
        return this.http
            .get(url, { responseType: 'text' })
            .pipe(map((data) => this.addYaml(ctx, new AddFromYaml(data), url)));
    }
    /**
     * Adds a markdown entry with content loaded from an external file
     * @param ctx State context
     * @param action Action with id and url to the external markdown
     * @returns An observable that completes when the entry has been added
     */
    loadMarkdown(ctx, { id, url }) {
        return this.http.get(url, { responseType: 'text' }).pipe(map((markdown) => new Add(id, { type: BuiltinResourceType.Markdown, markdown })), map((action) => this.addOne(ctx, action)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ResourceRegistryState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ResourceRegistryState }); }
};
__decorate([
    Action$5(Add),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Add]),
    __metadata("design:returntype", void 0)
], ResourceRegistryState.prototype, "addOne", null);
__decorate([
    Action$5(AddMany),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddMany]),
    __metadata("design:returntype", void 0)
], ResourceRegistryState.prototype, "addMany", null);
__decorate([
    Action$5(AddFromYaml),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddFromYaml, String]),
    __metadata("design:returntype", void 0)
], ResourceRegistryState.prototype, "addYaml", null);
__decorate([
    Action$5(LoadFromYaml),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LoadFromYaml]),
    __metadata("design:returntype", Observable)
], ResourceRegistryState.prototype, "loadYaml", null);
__decorate([
    Action$5(LoadMarkdown),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LoadMarkdown]),
    __metadata("design:returntype", Observable)
], ResourceRegistryState.prototype, "loadMarkdown", null);
ResourceRegistryState = __decorate([
    State({
        name: 'resourceRegistry',
        defaults: {},
    })
], ResourceRegistryState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ResourceRegistryState, decorators: [{
            type: Injectable
        }], propDecorators: { addOne: [], addMany: [], addYaml: [], loadYaml: [], loadMarkdown: [] } });

/** Selectors for ResourceRegistry */
class ResourceRegistrySelectors {
    /**
     * Queries an entry by id and type
     * @param state Current state
     * @returns Entry query function
     */
    static entry(state) {
        return (id, type) => getEntry(state, id, type);
    }
    /**
     * Queries an entry by id
     * @param state Current state
     * @returns Any entry query function
     */
    static anyEntry(state) {
        return (id) => getEntry(state, id);
    }
    /**
     * Queries a field of an entry
     * @param state Current state
     * @returns A field query function
     */
    static field(state) {
        return (id, type, field, defaultValue) => {
            const entry = getEntry(state, id, type);
            return entry?.[field] ?? defaultValue;
        };
    }
    /**
     * Query for any text data
     * @param state Current state
     * @returns Text data query function
     */
    static anyText(state) {
        return (id) => {
            const entry = getEntry(state, id);
            switch (entry?.type) {
                case BuiltinResourceType.Markdown:
                    return entry.markdown;
                case BuiltinResourceType.Text:
                    return entry.text;
                default:
                    return '';
            }
        };
    }
    /**
     * Query for markdown data
     * @param state Current state
     * @returns Markdown data query function
     */
    static markdown(getField) {
        return (id) => getField(id, BuiltinResourceType.Markdown, 'markdown', '');
    }
    /**
     * Query for text data
     * @param state Current state
     * @returns Text data query function
     */
    static text(getField) {
        return (id) => getField(id, BuiltinResourceType.Text, 'text', '');
    }
    /**
     * Query for an url
     * @param state Current state
     * @returns Url query function
     */
    static url(getField, baseHref = '') {
        return (id) => {
            const relUrl = getField(id, BuiltinResourceType.Url, 'url', '');
            return relUrl !== '' ? baseHref + relUrl : '';
        };
    }
}
__decorate([
    Selector([ResourceRegistryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "entry", null);
__decorate([
    Selector([ResourceRegistryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "anyEntry", null);
__decorate([
    Selector([ResourceRegistryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "field", null);
__decorate([
    Selector([ResourceRegistryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "anyText", null);
__decorate([
    Selector([ResourceRegistrySelectors.field]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "markdown", null);
__decorate([
    Selector([ResourceRegistrySelectors.field]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "text", null);
__decorate([
    Selector([ResourceRegistrySelectors.field, BaseHrefSelectors.baseHref]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Function)
], ResourceRegistrySelectors, "url", null);

/** Base action factory */
const Action = ActionGroup('Storage');
/**
 * Class Set Action for set method
 */
let Set$1 = class Set extends Action('Set') {
    /**
     * constructor class for Set action object
     * @param id - type: StorageId - Storage identifier
     * @param key - type: string - Key to be stored in the storage identifier
     * @param value - type: string - value to be stored with the key
     */
    constructor(id, key, value) {
        super();
        this.id = id;
        this.key = key;
        this.value = value;
    }
};
/**
 *  Class Delete Action for delete method
 */
class Delete extends Action('Delete') {
    /**
     * constructor class for Delete action object
     * @param id - type: StorageId - Storage identifier
     * @param key - type: string - Key to be stored in the storage identifier
     */
    constructor(id, key) {
        super();
        this.id = id;
        this.key = key;
    }
}
/**
 * Clear the values stored in the specified StorageId
 */
class Clear extends Action('Clear') {
    /**
     * constructor class for clear action object
     * @param id - type: StorageId - Storage identifier
     */
    constructor(id) {
        super();
        this.id = id;
    }
}

var storage_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Clear: Clear,
    Delete: Delete,
    Set: Set$1
});

/**
 * StorageId - enum with values as Local, Session - identifier for storage types
 */
var StorageId;
(function (StorageId) {
    StorageId["Local"] = "local";
    StorageId["Session"] = "session";
})(StorageId || (StorageId = {}));

var StorageState_1;
/**
 * State holding Storage types
 */
let StorageState = class StorageState {
    static { StorageState_1 = this; }
    /**
     * StorageState class to manage storage objects
     * @param id-Storage Identifier
     * @returns - Storage objects - session and local
     */
    static getStorage(id) {
        switch (id) {
            case StorageId.Local:
                return localStorage;
            case StorageId.Session:
                return sessionStorage;
            default:
                throw new Error(`No such storage '${id}'`);
        }
    }
    /**
     * sets the key,value pair in the given storageId
     * @param ctx - StorageContext object
     * @param param1- {id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    set(ctx, { id, key, value }) {
        StorageState_1.getStorage(id).setItem(key, value);
        this.increaseChangeCount(ctx, id);
    }
    /**
     * deletes the value pointed by key in the list of values stored in the specified storage id
     * @param ctx - StorageContext object
     * @param param1- id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    delete(ctx, { id, key }) {
        StorageState_1.getStorage(id).removeItem(key);
        this.increaseChangeCount(ctx, id);
    }
    /**
     * clears the values of the specified storage id
     * @param ctx - StorageContext object
     * @param param1 - id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
     */
    clear(ctx, { id }) {
        StorageState_1.getStorage(id).clear();
        this.increaseChangeCount(ctx, id);
    }
    /**
     * increases count after each operation is performed on the specified storage id
     * @param ctx  - StorageContext obje
     * @param id - StorageId - Storage identifier for which the change count has to be updated
     */
    increaseChangeCount(ctx, id) {
        ctx.setState(produce((draft) => {
            draft[id] += 1;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: StorageState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: StorageState }); }
};
__decorate([
    Action$5(Set$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Set$1]),
    __metadata("design:returntype", void 0)
], StorageState.prototype, "set", null);
__decorate([
    Action$5(Delete),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Delete]),
    __metadata("design:returntype", void 0)
], StorageState.prototype, "delete", null);
__decorate([
    Action$5(Clear),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Clear]),
    __metadata("design:returntype", void 0)
], StorageState.prototype, "clear", null);
StorageState = StorageState_1 = __decorate([
    State({
        name: 'storage',
        defaults: {
            [StorageId.Local]: 0,
            [StorageId.Session]: 0,
        },
    })
], StorageState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: StorageState, decorators: [{
            type: Injectable
        }], propDecorators: { set: [], delete: [], clear: [] } });

/**
 * Storage selectors - class for retrieving storage types
 */
class StorageSelectors {
    /**
     * returns the value stored in the key,value pair in the storageId given
     * @returns (id,key) of the given storage id else undefined
     */
    static get(_state) {
        return (id, key) => StorageState.getStorage(id).getItem(key) ?? undefined;
    }
    /**
     * returns the number of items in the given storage id stored
     * @returns length of the given StorageId supplied
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Allow selector name
    static length(_state) {
        return (id) => StorageState.getStorage(id).length;
    }
}
__decorate([
    Selector([StorageState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], StorageSelectors, "get", null);
__decorate([
    Selector([StorageState])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Allow selector name
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], StorageSelectors, "length", null);

class CdkStateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CdkStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: CdkStateModule, imports: [i1.ɵNgxsFeatureModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CdkStateModule, imports: [NgxsModule.forFeature([BaseHrefState, LinkRegistryState, ResourceRegistryState, StorageState])] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CdkStateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgxsModule.forFeature([BaseHrefState, LinkRegistryState, ResourceRegistryState, StorageState])],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Action$4 as Action, ActionGroup, baseHref_actions as BaseHrefActions, BaseHrefSelectors, BaseHrefState, BuiltinResourceType, CdkStateModule, EMPTY_LINK, linkRegistry_actions as LinkRegistryActions, LinkRegistrySelectors, LinkRegistryState, LinkType, resourceRegistry_actions as ResourceRegistryActions, ResourceRegistrySelectors, ResourceRegistryState, storage_actions as StorageActions, StorageId, StorageSelectors, StorageState, assertUniqueActionType, createCustomType, createLinkId, createResourceId, isBuiltinType, isCustomType, payload, registerActionType };
//# sourceMappingURL=hra-ui-cdk-state.mjs.map
