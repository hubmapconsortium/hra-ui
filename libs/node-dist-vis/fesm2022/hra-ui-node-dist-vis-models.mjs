import { inject, ErrorHandler, computed } from '@angular/core';
import { CsvFileLoaderService, JsonFileLoaderService } from '@hra-ui/common/fs';
import { derivedAsync } from 'ngxtension/derived-async';
import { unparse } from 'papaparse';
import { filter, map, catchError, of, finalize, fromEvent, using, tap, take } from 'rxjs';

/**
 * Tests whether a value is a plain object
 *
 * @param obj Object to test
 * @returns True if `obj` is a plain object, otherwise false
 */
function isRecordObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}
/**
 * Test whether an object is a deckgl compatable color value
 *
 * @param obj Object to test
 * @returns True if the object is a color
 */
function isColor(obj) {
    return ((Array.isArray(obj) || obj instanceof Uint8Array || obj instanceof Uint8ClampedArray) &&
        (obj.length === 3 || obj.length === 4));
}
/**
 * Caches the result of a no-argument accessor method returning the cached value on future calls.
 *
 * @param instance Instance to cache the result on
 * @param accessor Original accessor method
 * @returns A caching accessor method
 */
function cachedAccessor(instance, accessor) {
    const cacheKey = Symbol();
    const obj = instance;
    return () => {
        obj[cacheKey] ??= accessor();
        return obj[cacheKey];
    };
}
/**
 * Tries to parse a value as json
 *
 * @param value Value to parse
 * @returns Parsed json value if possible, otherwise the original value
 */
function tryParseJson(value) {
    try {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
    }
    catch {
        // Ignore errors
    }
    return value;
}
/**
 * Batch an operation allowing for other code to also run in between each batch.
 * Useful to prevent the main thread from being blocked by a large operation.
 *
 * @param iterable Iterable to batch
 * @param batchSize Number of items in each batch
 * @param itemCb Callback applied on each item
 * @param batchCb Callback applied after each batch
 */
async function batch(iterable, batchSize, itemCb, batchCb) {
    const iter = iterable[Symbol.iterator]();
    let index = 0;
    let done = false;
    while (!done) {
        for (let counter = 0; counter < batchSize; counter++) {
            const item = iter.next();
            if (item.done) {
                done = true;
                break;
            }
            itemCb(item.value, index);
            index++;
        }
        batchCb?.();
        await new Promise((res) => setTimeout(res, 0));
    }
}
/** Cached parsed color strings */
const cachedColors = new Map();
/** Cached canvas context used to parse colors */
let cachedCtx = null;
/**
 * Get or initialize a canvas rendering context
 *
 * @returns A rendering context if available
 */
function getParseColorContext() {
    if (cachedCtx === null) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        cachedCtx = canvas.getContext('2d', { willReadFrequently: true });
    }
    return cachedCtx;
}
/**
 * Tries to parse a value as a color.
 * Adapted from https://stackoverflow.com/a/19366389
 *
 * @param value Value to parse
 * @returns A color if parsing was successful, otherwise undefined
 */
function tryParseColor(value) {
    const parsed = tryParseJson(value);
    if (isColor(parsed)) {
        return parsed;
    }
    else if (typeof parsed !== 'string') {
        return undefined;
    }
    const trimmed = parsed.trim();
    if (cachedColors.has(trimmed)) {
        return cachedColors.get(trimmed);
    }
    const ctx = getParseColorContext();
    if (ctx === null) {
        return undefined;
    }
    ctx.fillStyle = '#000';
    ctx.fillStyle = trimmed;
    const computed1 = ctx.fillStyle;
    ctx.fillStyle = '#fff';
    ctx.fillStyle = trimmed;
    const computed2 = ctx.fillStyle;
    if (computed1 !== computed2) {
        return undefined;
    }
    ctx.fillRect(0, 0, 1, 1);
    const color = [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    cachedColors.set(trimmed, color);
    return color;
}
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
function loadData(input, loaderService, options, loading) {
    const loader = inject(loaderService);
    const errorHandler = inject(ErrorHandler);
    return derivedAsync(() => {
        const data = tryParseJson(input());
        if (typeof data === 'string' || data instanceof File || data instanceof URL) {
            const source = data instanceof URL ? data.toString() : data;
            loading?.next(true);
            return loader.load(source, options).pipe(filter((event) => event.type === 'data'), map((event) => event.data), catchError((error) => {
                errorHandler.handleError(error);
                return of(undefined);
            }), finalize(() => loading?.next(false)));
        }
        loading?.next(false);
        return data;
    });
}

/** Data used when the input is nullish or invalid */
const NULL_DATA_ARRAY = Object.freeze([]);
/** Private storage for original header */
const DATA_VIEW_HEADER = Symbol('DataView header');
/** Private storage for data offset */
const DATA_VIEW_DATA_OFFSET = Symbol('DataView data offset');
/** Cast a mapping to include extra data */
function getKeyMappingExtra(mapping) {
    return mapping;
}
/**
 * Create an accessor name for a property
 *
 * @param property Property name
 * @param postfix Accessor postfix
 * @returns An accessor name
 */
function createAccessorName(property, postfix) {
    const trimmedProperty = String(property).replace(/\s+/g, '');
    const capitalizedProperty = trimmedProperty.slice(0, 1).toUpperCase() + trimmedProperty.slice(1);
    return `get${capitalizedProperty}${postfix}`;
}
/**
 * Creates a new accessor bound to a data view
 *
 * @param instance Instance to bind the accessor to
 * @param property Property to access
 * @param postfix Accessor prostfix
 * @returns A bound accessor function
 */
function createAccessor(instance, property, postfix) {
    const key = instance.keyMapping[property];
    if (key === undefined) {
        return () => undefined;
    }
    if (postfix === 'At') {
        const { data, offset } = instance;
        return (index) => (data[index + offset] ?? {})[key];
    }
    return (obj) => obj[key];
}
/**
 * Creates and attaches accessors for each entry property on a data view
 *
 * @param instance Data view instance
 * @param keys Entry property keys
 */
function attachAccessors(instance, keys) {
    const postfixes = ['At', 'For'];
    for (const key of keys) {
        for (const postfix of postfixes) {
            const name = createAccessorName(key, postfix);
            const accessor = createAccessor(instance, key, postfix);
            instance[name] = accessor;
        }
    }
}
/**
 * Selects a key mapping for a data view
 *
 * @param view Data view
 * @param candidates Key mapping candidates
 * @returns The selected key mapping
 */
function selectMaterializationKeyMapping(view, ...candidates) {
    const [mapping] = candidates.filter((candidate) => candidate !== undefined);
    const header = getKeyMappingExtra(mapping)[DATA_VIEW_HEADER];
    if (header === undefined) {
        return Object.entries(mapping);
    }
    else if (Array.isArray(view.at(0))) {
        return header.map((key, index) => [key, index]);
    }
    return header.map((key) => [key, key]);
}
/**
 * Create a new data view base class
 *
 * @param keys Entry property keys
 * @returns A data view base class
 */
function createDataViewClass(keys) {
    class DataViewImpl {
        data;
        keyMapping;
        offset;
        keys = keys;
        length;
        at = (index) => this.data[this.offset + index];
        getPropertyAt = (index, property) => {
            return this.getPropertyFor(this.data[this.offset + index] ?? {}, property);
        };
        getPropertyFor = (obj, property) => {
            const key = this.keyMapping[property];
            if (key === undefined) {
                return undefined;
            }
            return obj[key];
        };
        materializeAt = (index, keyMapping) => {
            return this.materializeFor(this.at(index), keyMapping);
        };
        materializeFor = (obj, keyMapping) => {
            const mapping = selectMaterializationKeyMapping(this, keyMapping, this.keyMapping);
            const result = {};
            for (const [key, prop] of mapping) {
                result[key] = obj[prop];
            }
            return result;
        };
        constructor(data, keyMapping, offset = 0) {
            this.data = data;
            this.keyMapping = keyMapping;
            this.offset = offset;
            this.length = data.length - offset;
            attachAccessors(this, this.keys);
        }
        [Symbol.iterator]() {
            const iter = this.data[Symbol.iterator]();
            for (let index = 0; index < this.offset; index++) {
                iter.next();
            }
            return iter;
        }
    }
    return DataViewImpl;
}
/**
 * Loads view data from either json encoded input, a file or url,
 * an existing data view instance, or an array of raw data
 *
 * @param input Raw data view input
 * @param viewCls Data view class
 * @param loading Observer notified when data is loading
 * @returns Either a data view of the specified type or an array of raw data
 */
function loadViewData(input, viewCls, loading) {
    const data = loadData(input, CsvFileLoaderService, {
        papaparse: {
            dynamicTyping: true,
            header: false,
            skipEmptyLines: 'greedy',
        },
    }, loading);
    return computed(() => {
        const result = data();
        return result instanceof viewCls || Array.isArray(result) ? result : NULL_DATA_ARRAY;
    });
}
/**
 * Loads a key mapping from either json encoded input, a file or url,
 * or an existing key mapping object
 *
 * @param input Raw key mapping input
 * @param mixins Additional mappings for backwards compatability
 * @param loading Observer notified when data is loading
 * @returns A partial key mapping
 */
function loadViewKeyMapping(input, mixins = {}, loading) {
    const data = loadData(input, JsonFileLoaderService, {}, loading);
    return computed(() => {
        const result = data();
        const mapping = isRecordObject(result) ? { ...result } : {};
        for (const key in mixins) {
            if (mapping[key] === undefined && mixins[key] !== undefined) {
                mapping[key] = mixins[key]();
            }
        }
        for (const key in mapping) {
            if (mapping[key] === undefined) {
                delete mapping[key];
            }
        }
        return mapping;
    });
}
/**
 * Attempts to infer key mapping properties from raw data
 * @private
 *
 * @param entry The first raw data entry in the data array
 * @param mapping Mapping to update with inferred keys
 * @param keys Expected entry property keys
 */
function inferViewKeyMappingImpl(entry, mapping, keys) {
    const icase = (value) => String(value).toLowerCase();
    const isArrayEntry = Array.isArray(entry);
    let header = [];
    if (isArrayEntry) {
        const isAllNumeric = entry.every((value) => typeof value === 'number');
        const isBackwardsIncompatibleEdges = entry.length === 7 && keys.length >= 7 && isAllNumeric;
        if (isBackwardsIncompatibleEdges) {
            // eslint-disable-next-line no-console
            console.warn('Legacy edge format detected! Edges csv now require a header.');
        }
        else {
            header = entry;
            getKeyMappingExtra(mapping)[DATA_VIEW_DATA_OFFSET] = 1;
        }
    }
    else {
        header = Object.keys(entry);
    }
    for (const key of keys) {
        const prop = mapping[key] ?? key;
        const propICase = icase(prop);
        const index = header.findIndex((candidate) => icase(candidate) === propICase);
        if (index >= 0) {
            mapping[key] = (isArrayEntry ? index : header[index]);
        }
        else if (key in mapping) {
            // eslint-disable-next-line no-console
            console.warn(`Could not find a matching column for '${String(mapping[key])}', key: ${String(key)}`);
            delete mapping[key];
        }
    }
    getKeyMappingExtra(mapping)[DATA_VIEW_HEADER] = header;
}
/**
 * Validates an inferred key mapping
 * @private
 *
 * @param mapping Inferred key mapping
 * @param requiredKeys Required entry property keys
 * @returns undefined if valid, otherwise an error describing the issue
 */
function validateViewKeyMapping(mapping, requiredKeys) {
    const missingKeys = [];
    for (const key of requiredKeys) {
        if (mapping[key] === undefined) {
            missingKeys.push(key);
        }
    }
    if (missingKeys.length > 0) {
        return new Error(`Missing required keys: ${missingKeys.join(', ')}`);
    }
}
/**
 * Infers a complete key mapping from the data and a partial key mapping
 *
 * @param data View data
 * @param mapping Partial existing key mapping
 * @param requiredKeys Required property keys
 * @param optionalKeys Optional property keys
 * @returns A complete key mapping on success, otherwise undefined
 */
function inferViewKeyMapping(data, mapping, requiredKeys, optionalKeys) {
    const errorHandler = inject(ErrorHandler);
    const keys = [...requiredKeys, ...optionalKeys];
    const defaultArrayKeyMapping = {};
    keys.forEach((key, index) => (defaultArrayKeyMapping[key] = index));
    return computed(() => {
        const viewData = data();
        if (!Array.isArray(viewData)) {
            return viewData.keyMapping;
        }
        else if (viewData.length === 0) {
            return defaultArrayKeyMapping;
        }
        const viewMapping = { ...mapping() };
        inferViewKeyMappingImpl(viewData[0], viewMapping, keys);
        const error = validateViewKeyMapping(viewMapping, requiredKeys);
        if (error !== undefined) {
            errorHandler.handleError(error);
            return undefined;
        }
        return viewMapping;
    });
}
/**
 * Create a data view from data and key mapping
 *
 * @param viewCls Data view class
 * @param data Already existing data view or array of raw data
 * @param keyMapping Inferred key mapping for the raw data
 * @param defaultView Default data view returned missing a data or key mapping
 * @returns A data view of the specified class
 */
function createDataView(viewCls, data, keyMapping, defaultView) {
    return computed(() => {
        const viewData = data();
        if (viewData instanceof viewCls) {
            return viewData;
        }
        const viewMapping = keyMapping();
        if (viewMapping !== undefined) {
            return new viewCls(viewData, viewMapping, getKeyMappingExtra(viewMapping)[DATA_VIEW_DATA_OFFSET]);
        }
        return defaultView;
    });
}
function withDataViewDefaultGenerator(view, generator, initialValue, generateWhenEmpty = true) {
    return derivedAsync(() => {
        const result = view();
        const shouldGenerate = result.length === 0 && (generateWhenEmpty || result.data === NULL_DATA_ARRAY);
        return shouldGenerate ? generator() : result;
    }, { initialValue });
}
/**
 * Deduplicate csv column names by adding an `_{index}` suffix to duplicates
 *
 * @param header Column names
 * @returns Deduped column names
 */
function dedupCsvHeader(header) {
    const seen = new Set();
    const result = [];
    for (const column of header) {
        let newColumn = column;
        let index = 1;
        while (seen.has(newColumn)) {
            newColumn = `${column}_${index}`;
            index++;
        }
        seen.add(newColumn);
        result.push(newColumn);
    }
    return result;
}
/**
 * Convert an view data item into a csv row
 *
 * @param obj Object to serialize
 * @param index Index of item
 * @param keyMapping Key mapping
 * @param computedMapping Computed mapping
 * @param transform Value transformation
 * @returns A csv row
 */
function toCsvRow(obj, index, keyMapping, computedMapping, transform) {
    const row = [];
    for (const [key, prop] of keyMapping) {
        const value = transform(obj[prop], key, obj, index);
        const serialized = typeof value === 'object' ? JSON.stringify(value) : value;
        row.push(serialized);
    }
    for (const [key, fn] of computedMapping) {
        const value = transform(fn(obj, key, index), key, obj, index);
        const serialized = typeof value === 'object' ? JSON.stringify(value) : value;
        row.push(serialized);
    }
    return row;
}
/**
 * Serialize a data view to csv
 *
 * @param view View to serialize
 * @param options Serialization options
 * @returns A csv blob
 */
async function toCsv(view, options = {}) {
    const BATCH_SIZE = 10000;
    const { filter = () => true, computedColumns = {}, transform = (value) => value } = options;
    const keyMapping = selectMaterializationKeyMapping(view, options.keyMapping, view.keyMapping);
    const computedMapping = Object.entries(computedColumns);
    const headerKeys = [...keyMapping, ...computedMapping].map(([key]) => key);
    const header = unparse([dedupCsvHeader(headerKeys)]);
    const chunks = [header, '\r\n'];
    let rows = [];
    await batch(view, BATCH_SIZE, (obj, index) => {
        if (filter(obj, index)) {
            rows.push(toCsvRow(obj, index, keyMapping, computedMapping, transform));
        }
    }, () => {
        if (rows.length > 0) {
            chunks.push(unparse(rows), '\r\n');
            rows = [];
        }
    });
    // Remove trailing new line
    chunks.pop();
    return new Blob(chunks);
}

/** Default color (Surface N-98, Hra Blue 5) */
const DEFAULT_CELL_COLOR = [239, 242, 245];
/** Required color map keys */
const REQUIRED_KEYS$2 = ['Cell Type', 'Cell Color'];
/** Optional color map keys */
const OPTIONAL_KEYS$2 = [];
/** Base data view class for color map */
const BaseColorMapView = createDataViewClass([...REQUIRED_KEYS$2, ...OPTIONAL_KEYS$2]);
/** Color map view */
class ColorMapView extends BaseColorMapView {
    static from(domain, range, defaultColor = DEFAULT_CELL_COLOR) {
        const data = domain.map((value, index) => [value, range[index] ?? defaultColor]);
        return new ColorMapView(data, EMPTY_COLOR_MAP_VIEW.keyMapping);
    }
    getParsedCellColorAt = (index, defaultColor = DEFAULT_CELL_COLOR) => this.getParsedCellColorFor(this.at(index), defaultColor);
    getParsedCellColorFor = (obj, defaultColor = DEFAULT_CELL_COLOR) => tryParseColor(this.getCellColorFor(obj)) ?? defaultColor;
    /**
     * Get the `ColorMap` for this view
     *
     * @returns A `ColorMap`
     */
    getColorMap = cachedAccessor(this, () => {
        const domain = [];
        const range = [];
        for (const obj of this) {
            domain.push(this.getCellTypeFor(obj));
            range.push(this.getParsedCellColorFor(obj));
        }
        return { domain, range };
    });
    /**
     * Get the domain of the color map
     *
     * @returns An array of unique domain values
     */
    getDomain = () => this.getColorMap().domain;
    /**
     * Get the range of the color map
     *
     * @returns An array of colors associated with the domain values
     */
    getRange = () => this.getColorMap().range;
    /**
     * Get a mapping from type to color
     *
     * @returns A `Map`
     */
    getColorLookup = cachedAccessor(this, () => {
        const { domain, range } = this.getColorMap();
        const lookup = new Map();
        for (let index = 0; index < domain.length; index++) {
            lookup.set(domain[index], range[index]);
        }
        return lookup;
    });
    createFilter = (filterView) => {
        return (obj) => filterView.includes(this.getCellTypeFor(obj), -1);
    };
}
/** Empty color map view */
const EMPTY_COLOR_MAP_VIEW = new ColorMapView([], {
    'Cell Type': 0,
    'Cell Color': 1,
});
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
function loadColorMap(input, keys, colorMapKey, colorMapValue, loading) {
    const data = loadViewData(input, ColorMapView, loading);
    const mapping = loadViewKeyMapping(keys, {
        'Cell Type': colorMapKey,
        'Cell Color': colorMapValue,
    }, loading);
    const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS$2, OPTIONAL_KEYS$2);
    return createDataView(ColorMapView, data, inferred, EMPTY_COLOR_MAP_VIEW);
}

// From https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=3702-15529&t=FkgliptLx3YTnSY7-4
const DEFAULT_PALETTE = [
    '#ff0043',
    '#70a5a8',
    '#cd8490',
    '#7495ae',
    '#aadcdf',
    '#e9e4f3',
    '#d6b6d7',
    '#e97b74',
    '#bad2e7',
    '#8dc599',
    '#f9ce8d',
    '#edb8ac',
    '#a295c9',
    '#a1acd2',
    '#637597',
];

function createColorMapGenerator(nodes, colorMap) {
    return () => {
        const view = nodes();
        const input = colorMap();
        if (input instanceof ColorMapView || view.length === 0) {
            return EMPTY_COLOR_MAP_VIEW;
        }
        const counts = view.getCounts();
        const byCount = (d1, d2) => counts.get(d2) - counts.get(d1);
        const domain = Array.from(counts.keys()).sort(byCount);
        return ColorMapView.from(domain, DEFAULT_PALETTE);
    };
}

/** Required edge keys */
const REQUIRED_KEYS$1 = ['Cell ID', 'Target ID', 'X1', 'Y1', 'Z1', 'X2', 'Y2', 'Z2'];
/** Optional edge keys */
const OPTIONAL_KEYS$1 = [];
/** Base data view class for edges */
const BaseEdgesView = createDataViewClass([...REQUIRED_KEYS$1, ...OPTIONAL_KEYS$1]);
/** Edges view */
class EdgesView extends BaseEdgesView {
    /**
     * Get the source position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The source position in format [x, y, z]
     */
    getSourcePositionAt = (index, info) => this.getSourcePositionFor(this.at(index), info);
    /**
     * Get the source position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw edge data entry
     * @param info Optional accessor context
     * @returns The source position in format [x, y, z]
     */
    getSourcePositionFor = (obj, info) => {
        const position = (info?.target ?? []);
        position[0] = this.getX1For(obj);
        position[1] = this.getY1For(obj);
        position[2] = this.getZ1For(obj);
        return position;
    };
    /**
     * Get the target position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The target position in format [x, y, z]
     */
    getTargetPositionAt = (index, info) => this.getTargetPositionFor(this.at(index), info);
    /**
     * Get the target position of an edge.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw edge data entry
     * @param info Optional accessor context
     * @returns The target position in format [x, y, z]
     */
    getTargetPositionFor = (obj, info) => {
        const position = (info?.target ?? []);
        position[0] = this.getX2For(obj);
        position[1] = this.getY2For(obj);
        position[2] = this.getZ2For(obj);
        return position;
    };
    /**
     * Get the distance/length of an edge
     *
     * @param index Index of data entry
     * @returns The length of the edge
     */
    getDistanceAt = (index) => this.getDistanceFor(this.at(index));
    /**
     * Get the distance/length of an edge
     *
     * @param obj Raw edge data entry
     * @returns The length of the edge
     */
    getDistanceFor = (obj) => {
        const xDiff = this.getX1For(obj) - this.getX2For(obj);
        const yDiff = this.getY1For(obj) - this.getY2For(obj);
        const zDiff = this.getZ1For(obj) - this.getZ2For(obj);
        return Math.hypot(xDiff, yDiff, zDiff);
    };
    getCounts = (getType) => {
        const counts = {};
        for (const edge of this) {
            const type = getType(edge);
            counts[type] ??= 0;
            counts[type] += 1;
        }
        return new Map(Object.entries(counts));
    };
    createFilter = (nodesView, filterView) => {
        return (obj) => {
            const index1 = this.getCellIDFor(obj);
            const index2 = this.getTargetIDFor(obj);
            return (filterView.includes(nodesView.getCellTypeAt(index1), index1) &&
                filterView.includes(nodesView.getCellTypeAt(index2), index2));
        };
    };
}
/** Empty edges view */
const EMPTY_EDGES_VIEW = new EdgesView([], {
    'Cell ID': 0,
    'Target ID': 1,
    X1: 2,
    Y1: 3,
    Z1: 4,
    X2: 5,
    Y2: 6,
    Z2: 7,
});
/**
 * Load edges
 *
 * @param input Raw edges input
 * @param keys Raw edges key mapping input
 * @param loading Observer notified when data is loading
 * @returns A edges view
 */
function loadEdges(input, keys, loading) {
    const data = loadViewData(input, EdgesView, loading);
    const mapping = loadViewKeyMapping(keys, undefined, loading);
    const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS$1, OPTIONAL_KEYS$1);
    return createDataView(EdgesView, data, inferred, EMPTY_EDGES_VIEW);
}

const CELL_NEIGHBORHOOD_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
];
class CellGrid {
    grid = {};
    addCellAt(x, y, cell) {
        this.ensureCellsExistsAt(x, y).push(cell);
    }
    getCellsAt(x, y) {
        return this.grid[x]?.[y];
    }
    *getNonEmptyIndices() {
        for (const x in this.grid) {
            for (const y in this.grid[x]) {
                yield [+x, +y];
            }
        }
    }
    *getNeighborhood(x, y) {
        for (const [xOffset, yOffset] of CELL_NEIGHBORHOOD_OFFSETS) {
            const cells = this.getCellsAt(x + xOffset, y + yOffset);
            if (cells !== undefined) {
                yield* cells;
            }
        }
    }
    ensureCellsExistsAt(x, y) {
        this.grid[x] ??= {};
        this.grid[x][y] ??= [];
        return this.grid[x][y];
    }
}
function partitionNodes(nodes, targetSelector, maxDistance) {
    const sourceCells = new CellGrid();
    const targetCells = new CellGrid();
    let index = 0;
    for (const node of nodes) {
        const type = nodes.getCellTypeFor(node);
        const cell = {
            index,
            type,
            x: nodes.getXFor(node),
            y: nodes.getYFor(node),
            z: nodes.getZFor(node) ?? 0,
            object: node,
        };
        const grid = type === targetSelector ? targetCells : sourceCells;
        const gridX = Math.floor(cell.x / maxDistance);
        const gridY = Math.floor(cell.y / maxDistance);
        grid.addCellAt(gridX, gridY, cell);
        index++;
    }
    return { sourceCells, targetCells };
}
function cellDistanceSquared(cell1, cell2) {
    const x = cell1.x - cell2.x;
    const y = cell1.y - cell2.y;
    const z = cell1.z - cell2.z;
    return x * x + y * y + z * z;
}
function findClosestCell(cell, candidates, maxDistance) {
    let distance = maxDistance * maxDistance;
    let closest = undefined;
    for (const candidate of candidates) {
        const value = cellDistanceSquared(cell, candidate);
        if (value < distance) {
            distance = value;
            closest = candidate;
        }
    }
    return closest;
}
function* generateEdges(nodes, targetSelector, maxDistance) {
    const { sourceCells, targetCells } = partitionNodes(nodes, targetSelector, maxDistance);
    if (Object.keys(targetCells).length === 0) {
        // eslint-disable-next-line no-console
        console.warn(`No target cells found using selector '${targetSelector}'`);
        return;
    }
    for (const [x, y] of sourceCells.getNonEmptyIndices()) {
        const candidates = Array.from(targetCells.getNeighborhood(x, y));
        for (const cell of sourceCells.getCellsAt(x, y) ?? []) {
            const closest = findClosestCell(cell, candidates, maxDistance);
            if (closest !== undefined) {
                yield {
                    'Cell ID': cell.index,
                    'Target ID': closest.index,
                    X1: cell.x,
                    Y1: cell.y,
                    Z1: cell.z,
                    X2: closest.x,
                    Y2: closest.y,
                    Z2: closest.z,
                };
            }
        }
    }
}
const progressTimeFormat = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
});
function formatProgressMessage(msg) {
    const { processed, total, timestamp } = msg;
    const percentage = Math.round((100 * processed) / total);
    const time = progressTimeFormat.format(timestamp);
    return `Computing edges: ${percentage}% (${processed}/${total}) complete at ${time}`;
}
function createEdgeGeneratorWorker(nodes, targetSelector, maxDistance) {
    const createWorker = () => {
        const worker = new Worker(new URL('generator.worker.ts', import.meta.url));
        worker.postMessage({
            type: 'initialize',
            nodes: {
                data: nodes.data,
                keyMapping: nodes.keyMapping,
                offset: nodes.offset,
            },
            targetSelector,
            maxDistance,
        });
        return {
            worker,
            unsubscribe: () => worker.terminate(),
        };
    };
    const toEvents = (resource) => {
        const { worker } = resource;
        return fromEvent(worker, 'message');
    };
    return using(createWorker, toEvents);
}
function createEdgeGenerator(nodes, edges, nodeTargetSelector, maxEdgeDistance, loading) {
    const errorHandler = inject(ErrorHandler);
    return () => {
        const view = nodes();
        const input = edges();
        const selector = nodeTargetSelector();
        const distance = maxEdgeDistance();
        if (input instanceof EdgesView ||
            view.length === 0 ||
            selector === '' ||
            !Number.isFinite(distance) ||
            distance <= 0) {
            loading?.next(false);
            return EMPTY_EDGES_VIEW;
        }
        loading?.next(true);
        return createEdgeGeneratorWorker(view, selector, distance).pipe(tap((event) => {
            if (event.data.type === 'progress') {
                // eslint-disable-next-line no-console
                console.log(formatProgressMessage(event.data));
            }
        }), filter((event) => event.data.type === 'result'), take(1), map((event) => {
            const { data, keyMapping, offset } = event.data.edges;
            return new EdgesView(data, keyMapping, offset);
        }), catchError((error) => {
            errorHandler.handleError(error);
            return of(EMPTY_EDGES_VIEW);
        }), finalize(() => loading?.next(false)));
    };
}

/** Function that always return true */
function truthy() {
    return true;
}
/** Function that always return false */
function falsy() {
    return false;
}
function concatEntries(array1, array2) {
    if (array1 !== undefined) {
        if (array2 !== undefined) {
            return [...array1, ...array2];
        }
        return array1;
    }
    return array2;
}
/** Node filter view */
class NodeFilterView {
    /** Included entries */
    include;
    /** Excluded entries */
    exclude;
    /** Predicate that tests whether a node is included in the filter */
    includes;
    /**
     * Get whether the filter is empty
     *
     * @returns Whether the filter is empty, i.e. all nodes are included
     */
    isEmpty = () => {
        const { include, exclude = [] } = this;
        return include === undefined && exclude.length === 0;
    };
    addEntries = (include, exclude) => {
        const newInclude = concatEntries(this.include, include);
        const newExclude = concatEntries(this.exclude, exclude);
        return new NodeFilterView(newInclude, newExclude);
    };
    clear = (clearInclude = true, clearExclude = true) => {
        const include = clearInclude ? undefined : this.include;
        const exclude = clearExclude ? undefined : this.exclude;
        return new NodeFilterView(include, exclude);
    };
    /** Initialize the filter */
    constructor(include, exclude) {
        this.include = include;
        this.exclude = exclude;
        this.includes = this.selectFilterFn();
    }
    /**
     * Selects a node filter predicate function based on whether
     * parts of the filter is empty
     *
     * @returns A node filter predicate function
     */
    selectFilterFn() {
        const { include, exclude = [] } = this;
        const includeFn = this.createFilterFn(include);
        const excludeFn = this.createFilterFn(exclude);
        if (include === undefined) {
            return exclude.length === 0 ? truthy : (type, index) => !excludeFn(type, index);
        }
        else if (include.length === 0) {
            return falsy;
        }
        else if (exclude.length === 0) {
            return includeFn;
        }
        return (type, index) => includeFn(type, index) && !excludeFn(type, index);
    }
    /**
     * Create a filter predicate for some entries
     *
     * @param entries Filter entries
     * @returns A filter predicate that returns true for value in the entries
     */
    createFilterFn(entries) {
        const entriesSet = new Set(entries);
        return (type, index) => entriesSet.has(type) || entriesSet.has(index);
    }
}
/**
 * Load a node filter
 *
 * @param input Node filter raw input
 * @param selection Backwards compatable node filter include array
 * @param loading Observer notified when data is loading
 * @returns A node filter view
 */
function loadNodeFilter(input, selection, loading) {
    const data = loadData(input, JsonFileLoaderService, {}, loading);
    const selectionData = loadData(selection, JsonFileLoaderService, {}, loading);
    return computed(() => {
        const result = data();
        if (result instanceof NodeFilterView) {
            return result;
        }
        else if (isRecordObject(result)) {
            const { include, exclude } = result;
            return new NodeFilterView(include, exclude);
        }
        const includeSelection = selectionData();
        const include = Array.isArray(includeSelection) ? includeSelection : undefined;
        return new NodeFilterView(include, undefined);
    });
}

/** Required node keys */
const REQUIRED_KEYS = ['Cell Type', 'X', 'Y'];
/** Optional node keys */
const OPTIONAL_KEYS = ['Cell Ontology ID', 'Z'];
/** Base nodes view class */
const BaseNodesView = createDataViewClass([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);
/** Nodes view */
class NodesView extends BaseNodesView {
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    getPositionAt = (index, info) => this.getPositionFor(this.at(index), info);
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw node data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    getPositionFor = (obj, info) => {
        const position = (info?.target ?? new Array(3));
        position[0] = this.getXFor(obj);
        position[1] = this.getYFor(obj);
        position[2] = this.getZFor(obj) ?? 0;
        return position;
    };
    /**
     * Get the dimensions (sometimes called 'extent') of all nodes
     * across the X, Y, and Z axes
     *
     * @returns An array of [minimum, maximum] values
     */
    getDimensions = cachedAccessor(this, () => {
        let min = Number.MAX_VALUE;
        let max = -Number.MAX_VALUE;
        for (const obj of this) {
            const x = this.getXFor(obj);
            const y = this.getYFor(obj);
            const z = this.getZFor(obj) ?? 0;
            min = Math.min(min, x, y, z);
            max = Math.max(max, x, y, z);
        }
        return [min, max];
    });
    getCounts = cachedAccessor(this, () => {
        const counts = {};
        for (const obj of this) {
            const type = this.getCellTypeFor(obj);
            counts[type] ??= 0;
            counts[type] += 1;
        }
        return new Map(Object.entries(counts));
    });
    createFilter = (filterView) => {
        return (obj, index) => filterView.includes(this.getCellTypeFor(obj), index);
    };
    createReindexer = async (filterView) => {
        const BATCH_SIZE = 20000;
        const result = [];
        let acc = -1;
        await batch(this, BATCH_SIZE, (obj, index) => {
            const included = filterView.includes(this.getCellTypeFor(obj), index);
            acc += Number(included);
            result.push(acc);
        });
        return result;
    };
}
/** Empty nodes view */
const EMPTY_NODES_VIEW = new NodesView([], {
    'Cell Type': 0,
    X: 1,
    Y: 2,
});
/**
 * Load nodes
 *
 * @param input Raw nodes input
 * @param keys Raw nodes key mapping input
 * @param nodeTargetKey Backwards compatable 'Cell Type' key mapping
 * @param loading Observer notified when data is loading
 * @returns A nodes view
 */
function loadNodes(input, keys, nodeTargetKey, loading) {
    const data = loadViewData(input, NodesView, loading);
    const mapping = loadViewKeyMapping(keys, { 'Cell Type': nodeTargetKey }, loading);
    const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
    return createDataView(NodesView, data, inferred, EMPTY_NODES_VIEW);
}

/**
 * Generated bundle index. Do not edit.
 */

export { ColorMapView, EMPTY_COLOR_MAP_VIEW, EMPTY_EDGES_VIEW, EMPTY_NODES_VIEW, EdgesView, NodeFilterView, NodesView, OPTIONAL_KEYS$2 as OPTIONAL_COLOR_MAP_KEYS, OPTIONAL_KEYS$1 as OPTIONAL_EDGE_KEYS, OPTIONAL_KEYS as OPTIONAL_NODE_KEYS, REQUIRED_KEYS$2 as REQUIRED_COLOR_MAP_KEYS, REQUIRED_KEYS$1 as REQUIRED_EDGE_KEYS, REQUIRED_KEYS as REQUIRED_NODE_KEYS, createColorMapGenerator, createDataView, createDataViewClass, createEdgeGenerator, generateEdges, inferViewKeyMapping, inferViewKeyMappingImpl, loadColorMap, loadData, loadEdges, loadNodeFilter, loadNodes, loadViewData, loadViewKeyMapping, toCsv, validateViewKeyMapping, withDataViewDefaultGenerator };
//# sourceMappingURL=hra-ui-node-dist-vis-models.mjs.map
