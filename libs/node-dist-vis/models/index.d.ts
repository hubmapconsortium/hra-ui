import * as _hra_ui_node_dist_vis_models from '@hra-ui/node-dist-vis/models';
import { Signal, Type } from '@angular/core';
import { Color, AccessorContext } from '@deck.gl/core/typed';
import { NextObserver, Observable } from 'rxjs';
import { FileLoader } from '@hra-ui/common/fs';

/** Accepted data input types */
type DataInput<T> = T | File | URL | string | null | undefined;
/**
 * Loads data from either an url, file, json encoded string, or passed directly.
 * The resulting signal value is undefined until data has has been sucessfully loaded.
 *
 * @param input Raw input
 * @param loaderService Service to load urls and files
 * @param options File loader options
 * @param loading Observer notified when data is loading
 * @returns Loaded data
 */
declare function loadData<T, Opts>(input: Signal<DataInput<T>>, loaderService: Type<FileLoader<T, Opts>>, options: Opts, loading?: NextObserver<boolean>): Signal<unknown>;

/** Removes all whitespaces in a string */
type RemoveWhiteSpace<S extends string> = S extends `${infer Pre} ${infer Post}` ? RemoveWhiteSpace<`${Pre}${Post}`> : S;
/** 'At' accessors take an index argument while 'For' accessors takes the data object */
type AccessorPostfixes = 'At' | 'For';
/** Creates an accessor name from a property name */
type AccessorName<Entry, P extends keyof Entry, Postfix extends AccessorPostfixes> = `get${Capitalize<RemoveWhiteSpace<P & string>>}${Postfix}`;
/** Accessor function type */
type Accessor<Entry, P extends keyof Entry, Arg> = (arg: Arg) => Entry[P];
/** View data entry */
type AnyDataEntry = AnyData[number];
/** View data */
type AnyData = unknown[][] | object[];
/** Any data view (primarly used as a generic constraint) */
type AnyDataView = DataView<any>;
/** Data view input */
type DataViewInput<V extends DataView<any>> = DataInput<V | AnyData>;
/** Filter function */
type DataViewEntryFilter = (obj: AnyDataEntry, index: number) => boolean;
/** Computed value function */
type DataViewEntryComputedValueFn = (obj: AnyDataEntry, key: string, index: number) => unknown;
/** Transform function */
type DataViewEntryValueTransform = (value: unknown, key: string, obj: AnyDataEntry, index: number) => unknown;
/** Mapping for each entry key to the actual data's properties */
type KeyMapping<Entry> = {
    [P in keyof Entry]: PropertyKey;
};
/** Any key mapping */
type AnyKeyMapping = Record<string, PropertyKey>;
/**
 * Additional key mapping entries mixed into the mapping.
 * Used to merge backwards compatibility inputs into the key mapping.
 */
type KeyMappingMixins<Entry> = {
    [P in keyof Entry]?: Signal<PropertyKey | undefined>;
};
/** Key mapping input */
type KeyMappingInput<Entry> = DataInput<Partial<KeyMapping<Entry>>>;
/** Accessors automatically created by a data view */
type DataViewAccessors<Entry> = {
    [P in keyof Entry as AccessorName<Entry, P, 'At'>]-?: Accessor<Entry, P, number>;
} & {
    [P in keyof Entry as AccessorName<Entry, P, 'For'>]-?: Accessor<Entry, P, AnyDataEntry>;
};
/** Options for serialization */
interface DataViewSerializationOptions {
    /** Key mapping */
    keyMapping?: AnyKeyMapping;
    /** Data filter */
    filter?: DataViewEntryFilter;
    /** Computed properties */
    computedColumns?: Record<string, DataViewEntryComputedValueFn>;
    /** Value transformation */
    transform?: DataViewEntryValueTransform;
}
/** Data view */
interface DataView<Entry> {
    /** Property names of the entry type */
    readonly keys: (keyof Entry)[];
    /** Raw underlying data for the view */
    readonly data: AnyData;
    /** Mapping from entry property names to properties in the raw data */
    readonly keyMapping: KeyMapping<Entry>;
    /** Start offset of the first item in the data array */
    readonly offset: number;
    /** Number of items in the data (raw data length minus the offset) */
    readonly length: number;
    /**
     * Gets the raw item at a specific index. Does **not** accept negative indices
     *
     * @param index Index of the item
     * @returns The raw data object
     */
    readonly at: (index: number) => AnyDataEntry;
    /**
     * Gets a property for the item at the specified index
     *
     * @param index Index of the item
     * @param property Property to read
     * @returns The property's value
     */
    readonly getPropertyAt: <P extends keyof Entry>(index: number, property: P) => Entry[P];
    /**
     * Gets a property for a raw data object
     *
     * @param obj Raw data object
     * @param property Property to read
     * @returns The property's value
     */
    readonly getPropertyFor: <P extends keyof Entry>(obj: AnyDataEntry, property: P) => Entry[P];
    /**
     * Converts a data row into an object
     *
     * @param index Item index
     * @param keyMapping Key mapping to use during materialization
     * @returns An object
     */
    readonly materializeAt: (index: number, keyMapping?: AnyKeyMapping) => object;
    /**
     * Converts a data item into an object
     *
     * @param obj Item
     * @param keyMapping Key mapping to use during materialization
     * @returns An object
     */
    readonly materializeFor: (obj: AnyDataEntry, keyMapping?: AnyKeyMapping) => object;
    /** Raw data iterator */
    [Symbol.iterator](): IterableIterator<AnyDataEntry>;
}
/** Data view constructor */
type DataViewConstructor<Entry> = new (data: AnyData, keyMapping: KeyMapping<Entry>, offset?: number) => DataView<Entry> & DataViewAccessors<Entry>;
/**
 * Create a new data view base class
 *
 * @param keys Entry property keys
 * @returns A data view base class
 */
declare function createDataViewClass<Entry>(keys: (keyof Entry)[]): DataViewConstructor<Entry>;
/**
 * Loads view data from either json encoded input, a file or url,
 * an existing data view instance, or an array of raw data
 *
 * @param input Raw data view input
 * @param viewCls Data view class
 * @param loading Observer notified when data is loading
 * @returns Either a data view of the specified type or an array of raw data
 */
declare function loadViewData<T extends AnyDataView>(input: Signal<DataViewInput<T>>, viewCls: Type<T>, loading?: NextObserver<boolean>): Signal<T | AnyData>;
/**
 * Loads a key mapping from either json encoded input, a file or url,
 * or an existing key mapping object
 *
 * @param input Raw key mapping input
 * @param mixins Additional mappings for backwards compatability
 * @param loading Observer notified when data is loading
 * @returns A partial key mapping
 */
declare function loadViewKeyMapping<T>(input: Signal<KeyMappingInput<T>>, mixins?: KeyMappingMixins<T>, loading?: NextObserver<boolean>): Signal<Partial<KeyMapping<T>>>;
/**
 * Attempts to infer key mapping properties from raw data
 * @private
 *
 * @param entry The first raw data entry in the data array
 * @param mapping Mapping to update with inferred keys
 * @param keys Expected entry property keys
 */
declare function inferViewKeyMappingImpl<T>(entry: AnyDataEntry, mapping: Partial<KeyMapping<T>>, keys: (keyof T)[]): void;
/**
 * Validates an inferred key mapping
 * @private
 *
 * @param mapping Inferred key mapping
 * @param requiredKeys Required entry property keys
 * @returns undefined if valid, otherwise an error describing the issue
 */
declare function validateViewKeyMapping<T>(mapping: Partial<KeyMapping<T>>, requiredKeys: (keyof T)[]): Error | void;
/**
 * Infers a complete key mapping from the data and a partial key mapping
 *
 * @param data View data
 * @param mapping Partial existing key mapping
 * @param requiredKeys Required property keys
 * @param optionalKeys Optional property keys
 * @returns A complete key mapping on success, otherwise undefined
 */
declare function inferViewKeyMapping<T>(data: Signal<DataView<T> | AnyData>, mapping: Signal<Partial<KeyMapping<T>>>, requiredKeys: (keyof T)[], optionalKeys: (keyof T)[]): Signal<KeyMapping<T> | undefined>;
/**
 * Create a data view from data and key mapping
 *
 * @param viewCls Data view class
 * @param data Already existing data view or array of raw data
 * @param keyMapping Inferred key mapping for the raw data
 * @param defaultView Default data view returned missing a data or key mapping
 * @returns A data view of the specified class
 */
declare function createDataView<T, V extends AnyDataView>(viewCls: new (data: AnyData, keyMapping: KeyMapping<T>, offset?: number) => V, data: Signal<V | AnyData>, keyMapping: Signal<KeyMapping<T> | undefined>, defaultView: V): Signal<V>;
declare function withDataViewDefaultGenerator<V extends AnyDataView>(view: Signal<V>, generator: () => Observable<V> | V, initialValue: V, generateWhenEmpty?: boolean): Signal<V>;
/**
 * Serialize a data view to csv
 *
 * @param view View to serialize
 * @param options Serialization options
 * @returns A csv blob
 */
declare function toCsv<Entry>(view: DataView<Entry>, options?: DataViewSerializationOptions): Promise<Blob>;

/** Node filter data entry */
type NodeFilterEntry = string | number;
/** Node filter input */
type NodeFilterInput = DataInput<NodeFilter>;
/** Node filter predicate signature */
type NodeFilterPredFn = (type: string, index: number) => boolean;
/** Node filter */
interface NodeFilter {
    /** Node types and indices to include */
    include?: NodeFilterEntry[];
    /** Node types and indices to exclude */
    exclude?: NodeFilterEntry[];
}
/** Node filter view */
declare class NodeFilterView {
    /** Included entries */
    readonly include: NodeFilterEntry[] | undefined;
    /** Excluded entries */
    readonly exclude: NodeFilterEntry[] | undefined;
    /** Predicate that tests whether a node is included in the filter */
    readonly includes: NodeFilterPredFn;
    /**
     * Get whether the filter is empty
     *
     * @returns Whether the filter is empty, i.e. all nodes are included
     */
    readonly isEmpty: () => boolean;
    readonly addEntries: (include?: NodeFilterEntry[] | undefined, exclude?: NodeFilterEntry[] | undefined) => NodeFilterView;
    readonly clear: (clearInclude?: boolean, clearExclude?: boolean) => NodeFilterView;
    /** Initialize the filter */
    constructor(include: NodeFilterEntry[] | undefined, exclude: NodeFilterEntry[] | undefined);
    /**
     * Selects a node filter predicate function based on whether
     * parts of the filter is empty
     *
     * @returns A node filter predicate function
     */
    private selectFilterFn;
    /**
     * Create a filter predicate for some entries
     *
     * @param entries Filter entries
     * @returns A filter predicate that returns true for value in the entries
     */
    private createFilterFn;
}
/**
 * Load a node filter
 *
 * @param input Node filter raw input
 * @param selection Backwards compatable node filter include array
 * @param loading Observer notified when data is loading
 * @returns A node filter view
 */
declare function loadNodeFilter(input: Signal<NodeFilterInput>, selection: Signal<DataInput<string[]>>, loading?: NextObserver<boolean>): Signal<NodeFilterView>;

/** Color map input */
type ColorMapInput = DataViewInput<ColorMapView>;
/** Color map key mapping input */
type ColorMapKeysInput = KeyMappingInput<ColorMapEntry>;
/** Color map entry */
interface ColorMapEntry {
    /** Cell type */
    'Cell Type': string;
    /** Cell color */
    'Cell Color': unknown;
}
/** Color map */
interface ColorMap {
    /** Unique cell types */
    domain: string[];
    /** Associated cell type colors */
    range: Color[];
}
/** Required color map keys */
declare const REQUIRED_KEYS$2: (keyof ColorMapEntry)[];
/** Optional color map keys */
declare const OPTIONAL_KEYS$2: (keyof ColorMapEntry)[];
/** Base data view class for color map */
declare const BaseColorMapView: _hra_ui_node_dist_vis_models.DataViewConstructor<ColorMapEntry>;
/** Color map view */
declare class ColorMapView extends BaseColorMapView {
    static from(domain: string[], range: unknown[], defaultColor?: Color): ColorMapView;
    readonly getParsedCellColorAt: (index: number, defaultColor?: Color) => Color;
    readonly getParsedCellColorFor: (obj: AnyDataEntry, defaultColor?: Color) => Color;
    /**
     * Get the `ColorMap` for this view
     *
     * @returns A `ColorMap`
     */
    readonly getColorMap: () => ColorMap;
    /**
     * Get the domain of the color map
     *
     * @returns An array of unique domain values
     */
    readonly getDomain: () => string[];
    /**
     * Get the range of the color map
     *
     * @returns An array of colors associated with the domain values
     */
    readonly getRange: () => Color[];
    /**
     * Get a mapping from type to color
     *
     * @returns A `Map`
     */
    readonly getColorLookup: () => Map<string, Color>;
    readonly createFilter: (filterView: NodeFilterView) => DataViewEntryFilter;
}
/** Empty color map view */
declare const EMPTY_COLOR_MAP_VIEW: ColorMapView;
/**
 * Load a color map
 *
 * @param input Raw color map input
 * @param keys Raw color mak key mapping input
 * @param colorMapKey Backwards compatable 'Cell Type' key mapping
 * @param colorMapValue Backwards compatable 'Cell Color' key mapping
 * @param loading Observer notified when data is loading
 * @returns A color map view
 */
declare function loadColorMap(input: Signal<ColorMapInput>, keys: Signal<ColorMapKeysInput>, colorMapKey?: Signal<string | undefined>, colorMapValue?: Signal<string | undefined>, loading?: NextObserver<boolean>): Signal<ColorMapView>;

/** Node view input */
type NodesInput = DataViewInput<NodesView>;
/** Node view key mapping input */
type NodeKeysInput = KeyMappingInput<NodeEntry>;
/** Node entry */
interface NodeEntry {
    /** Cell type */
    'Cell Type': string;
    /** Optional cell ontology id */
    'Cell Ontology ID'?: string;
    /** X coordinate */
    X: number;
    /** Y coordinate */
    Y: number;
    /** Optional Z coordinate */
    Z?: number;
}
/** Required node keys */
declare const REQUIRED_KEYS$1: (keyof NodeEntry)[];
/** Optional node keys */
declare const OPTIONAL_KEYS$1: (keyof NodeEntry)[];
/** Base nodes view class */
declare const BaseNodesView: _hra_ui_node_dist_vis_models.DataViewConstructor<NodeEntry>;
/** Nodes view */
declare class NodesView extends BaseNodesView {
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    readonly getPositionAt: (index: number, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw node data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    readonly getPositionFor: (obj: AnyDataEntry, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the dimensions (sometimes called 'extent') of all nodes
     * across the X, Y, and Z axes
     *
     * @returns An array of [minimum, maximum] values
     */
    readonly getDimensions: () => [number, number];
    readonly getCounts: () => Map<string, number>;
    readonly createFilter: (filterView: NodeFilterView) => DataViewEntryFilter;
    readonly createReindexer: (filterView: NodeFilterView) => Promise<number[]>;
}
/** Empty nodes view */
declare const EMPTY_NODES_VIEW: NodesView;
/**
 * Load nodes
 *
 * @param input Raw nodes input
 * @param keys Raw nodes key mapping input
 * @param nodeTargetKey Backwards compatable 'Cell Type' key mapping
 * @param loading Observer notified when data is loading
 * @returns A nodes view
 */
declare function loadNodes(input: Signal<NodesInput>, keys: Signal<NodeKeysInput>, nodeTargetKey?: Signal<string | undefined>, loading?: NextObserver<boolean>): Signal<NodesView>;

declare function createColorMapGenerator(nodes: Signal<NodesView>, colorMap: Signal<ColorMapInput>): () => ColorMapView;

/** Edges input */
type EdgesInput = DataViewInput<EdgesView>;
/** Edges key mapping input */
type EdgeKeysInput = KeyMappingInput<EdgeEntry>;
/** Edge entry */
interface EdgeEntry {
    /** Source node index */
    'Cell ID': number;
    /** Target node index */
    'Target ID': number;
    /** Source X coordinate */
    X1: number;
    /** Source Y coordinate */
    Y1: number;
    /** Source Z coordinate */
    Z1: number;
    /** Target X coordinate */
    X2: number;
    /** Target Y coordinate */
    Y2: number;
    /** Target Z coordinate */
    Z2: number;
}
/** Required edge keys */
declare const REQUIRED_KEYS: (keyof EdgeEntry)[];
/** Optional edge keys */
declare const OPTIONAL_KEYS: (keyof EdgeEntry)[];
/** Base data view class for edges */
declare const BaseEdgesView: _hra_ui_node_dist_vis_models.DataViewConstructor<EdgeEntry>;
/** Edges view */
declare class EdgesView extends BaseEdgesView {
    /**
     * Get the source position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The source position in format [x, y, z]
     */
    readonly getSourcePositionAt: (index: number, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the source position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw edge data entry
     * @param info Optional accessor context
     * @returns The source position in format [x, y, z]
     */
    readonly getSourcePositionFor: (obj: AnyDataEntry, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the target position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The target position in format [x, y, z]
     */
    readonly getTargetPositionAt: (index: number, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the target position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw edge data entry
     * @param info Optional accessor context
     * @returns The target position in format [x, y, z]
     */
    readonly getTargetPositionFor: (obj: AnyDataEntry, info?: AccessorContext<AnyDataEntry>) => [number, number, number];
    /**
     * Get the distance/length of an edge
     *
     * @param index Index of data entry
     * @returns The length of the edge
     */
    readonly getDistanceAt: (index: number) => number;
    /**
     * Get the distance/length of an edge
     *
     * @param obj Raw edge data entry
     * @returns The length of the edge
     */
    readonly getDistanceFor: (obj: AnyDataEntry) => number;
    readonly getCounts: (getType: (obj: AnyDataEntry) => string) => Map<string, number>;
    readonly createFilter: (nodesView: NodesView, filterView: NodeFilterView) => DataViewEntryFilter;
}
/** Empty edges view */
declare const EMPTY_EDGES_VIEW: EdgesView;
/**
 * Load edges
 *
 * @param input Raw edges input
 * @param keys Raw edges key mapping input
 * @param loading Observer notified when data is loading
 * @returns A edges view
 */
declare function loadEdges(input: Signal<EdgesInput>, keys: Signal<EdgeKeysInput>, loading?: NextObserver<boolean>): Signal<EdgesView>;

declare function generateEdges(nodes: NodesView, targetSelector: string, maxDistance: number): Generator<EdgeEntry, undefined, undefined>;
declare function createEdgeGenerator(nodes: Signal<NodesView>, edges: Signal<EdgesInput>, nodeTargetSelector: Signal<string>, maxEdgeDistance: Signal<number>, loading?: NextObserver<boolean>): () => Observable<EdgesView> | EdgesView;

type ViewMode = 'explore' | 'inspect' | 'select';

export { ColorMapView, EMPTY_COLOR_MAP_VIEW, EMPTY_EDGES_VIEW, EMPTY_NODES_VIEW, EdgesView, NodeFilterView, NodesView, OPTIONAL_KEYS$2 as OPTIONAL_COLOR_MAP_KEYS, OPTIONAL_KEYS as OPTIONAL_EDGE_KEYS, OPTIONAL_KEYS$1 as OPTIONAL_NODE_KEYS, REQUIRED_KEYS$2 as REQUIRED_COLOR_MAP_KEYS, REQUIRED_KEYS as REQUIRED_EDGE_KEYS, REQUIRED_KEYS$1 as REQUIRED_NODE_KEYS, createColorMapGenerator, createDataView, createDataViewClass, createEdgeGenerator, generateEdges, inferViewKeyMapping, inferViewKeyMappingImpl, loadColorMap, loadData, loadEdges, loadNodeFilter, loadNodes, loadViewData, loadViewKeyMapping, toCsv, validateViewKeyMapping, withDataViewDefaultGenerator };
export type { AnyData, AnyDataEntry, AnyDataView, AnyKeyMapping, ColorMap, ColorMapEntry, ColorMapInput, ColorMapKeysInput, DataInput, DataView, DataViewAccessors, DataViewConstructor, DataViewEntryComputedValueFn, DataViewEntryFilter, DataViewEntryValueTransform, DataViewInput, DataViewSerializationOptions, EdgeEntry, EdgeKeysInput, EdgesInput, KeyMapping, KeyMappingInput, KeyMappingMixins, NodeEntry, NodeFilter, NodeFilterEntry, NodeFilterInput, NodeFilterPredFn, NodeKeysInput, NodesInput, ViewMode };
