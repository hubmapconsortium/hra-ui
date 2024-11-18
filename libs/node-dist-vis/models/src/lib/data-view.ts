import { computed, ErrorHandler, inject, Signal, Type } from '@angular/core';
import { CsvFileLoaderService, JsonFileLoaderService } from '@hra-ui/common/fs';
import { derivedAsync } from 'ngxtension/derived-async';
import { unparse } from 'papaparse';
import { Observable } from 'rxjs';
import { DataInput, isRecordObject, loadData } from './utils';

/** Removes all whitespaces in a string */
type RemoveWhiteSpace<S extends string> = S extends `${infer Pre} ${infer Post}`
  ? RemoveWhiteSpace<`${Pre}${Post}`>
  : S;

/** 'At' accessors take an index argument while 'For' accessors takes the data object */
type AccessorPostfixes = 'At' | 'For';
/** Creates an accessor name from a property name */
type AccessorName<
  Entry,
  P extends keyof Entry,
  Postfix extends AccessorPostfixes,
> = `get${Capitalize<RemoveWhiteSpace<P & string>>}${Postfix}`;
/** Accessor function type */
type Accessor<Entry, P extends keyof Entry, Arg> = (arg: Arg) => Entry[P];

/** View data entry */
export type AnyDataEntry = AnyData[number];
/** View data */
export type AnyData = unknown[][] | object[];
/** Any data view (primarly used as a generic constraint) */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyDataView = DataView<any>;

/** Data view input */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataViewInput<V extends DataView<any>> = DataInput<V | AnyData>;

/** Filter function */
export type DataViewFilter = (obj: AnyDataEntry, index: number) => boolean;

/** Mapping for each entry key to the actual data's properties */
export type KeyMapping<Entry> = { [P in keyof Entry]: PropertyKey };
/**
 * Additional key mapping entries mixed into the mapping.
 * Used to merge backwards compatibility inputs into the key mapping.
 */
export type KeyMappingMixins<Entry> = { [P in keyof Entry]?: Signal<PropertyKey | undefined> };
/** Key mapping input */
export type KeyMappingInput<Entry> = DataInput<Partial<KeyMapping<Entry>>>;

/** Accessors automatically created by a data view */
export type DataViewAccessors<Entry> = {
  [P in keyof Entry as AccessorName<Entry, P, 'At'>]-?: Accessor<Entry, P, number>;
} & {
  [P in keyof Entry as AccessorName<Entry, P, 'For'>]-?: Accessor<Entry, P, AnyDataEntry>;
};

/** Data view */
export interface DataView<Entry> {
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

  /** Raw data iterator */
  [Symbol.iterator](): IterableIterator<AnyDataEntry>;

  /**
   * Serialize to a csv blob (including header)
   */
  toCsv(filter?: DataViewFilter): Promise<Blob>;
}

/** Data view constructor */
export type DataViewConstructor<Entry> = new (
  data: AnyData,
  keyMapping: KeyMapping<Entry>,
  offset?: number,
) => DataView<Entry> & DataViewAccessors<Entry>;

/**
 * Create an accessor name for a property
 *
 * @param property Property name
 * @param postfix Accessor postfix
 * @returns An accessor name
 */
function createAccessorName<Entry>(property: keyof Entry, postfix: AccessorPostfixes): string {
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
function createAccessor<Entry>(instance: DataView<Entry>, property: keyof Entry, postfix: AccessorPostfixes) {
  const key = instance.keyMapping[property];
  if (key === undefined) {
    return () => undefined;
  }

  if (postfix === 'At') {
    const { data, offset } = instance;
    return (index: number) => ((data[index + offset] ?? {}) as Record<PropertyKey, unknown>)[key];
  } else {
    return (obj: Record<PropertyKey, unknown>) => obj[key];
  }
}

/**
 * Creates and attaches accessors for each entry property on a data view
 *
 * @param instance Data view instance
 * @param keys Entry property keys
 */
function attachAccessors<Entry>(instance: DataView<Entry>, keys: (keyof Entry)[]): void {
  const postfixes: AccessorPostfixes[] = ['At', 'For'];
  for (const key of keys) {
    for (const postfix of postfixes) {
      const name = createAccessorName<Entry>(key, postfix);
      const accessor = createAccessor<Entry>(instance, key, postfix);
      (instance as unknown as Record<string, unknown>)[name] = accessor;
    }
  }
}

function* normalizeRows(
  data: AnyData,
  keys: PropertyKey[],
  start: number,
  end: number,
  offset: number,
  filter: DataViewFilter | undefined,
): Generator<unknown[]> {
  end = Math.min(end, data.length);
  for (let index = start; index < end; index++) {
    const item = data[index] as Record<PropertyKey, unknown>;
    const row: unknown[] = [];
    if (filter?.(item, index - offset) === false) {
      continue;
    }

    for (const key of keys) {
      const value = item[key];
      const serialized = typeof value !== 'object' ? value : JSON.stringify(value);
      row.push(serialized);
    }

    yield row;
  }
}

async function serializeToCsv<T>(
  data: AnyData,
  keyMapping: KeyMapping<T>,
  offset: number,
  filter: DataViewFilter | undefined,
): Promise<Blob> {
  const ROWS_PER_CHUNK = 5000;
  const keys = Object.values(keyMapping) as PropertyKey[];
  const chunks: string[] = [unparse([Object.keys(keyMapping)]), '\r\n'];

  for (let index = offset; index < data.length; index += ROWS_PER_CHUNK) {
    const rows = Array.from(normalizeRows(data, keys, index, index + ROWS_PER_CHUNK, offset, filter));
    chunks.push(unparse(rows), '\r\n');
    // Don't block the main thread
    await new Promise((res) => setTimeout(res));
  }

  // Remove trailing new line
  chunks.pop();

  return new Blob(chunks);
}

/**
 * Create a new data view base class
 *
 * @param keys Entry property keys
 * @returns A data view base class
 */
export function createDataViewClass<Entry>(keys: (keyof Entry)[]): DataViewConstructor<Entry> {
  class DataViewImpl implements DataView<Entry> {
    readonly keys = keys;
    readonly length: number;

    readonly at = (index: number) => this.data[this.offset + index];
    readonly getPropertyAt = <P extends keyof Entry>(index: number, property: P): Entry[P] => {
      return this.getPropertyFor(this.data[this.offset + index] ?? {}, property);
    };
    readonly getPropertyFor = <P extends keyof Entry>(obj: AnyDataEntry, property: P): Entry[P] => {
      const key = this.keyMapping[property];
      if (key === undefined) {
        return undefined as Entry[P];
      }

      return (obj as Record<PropertyKey, Entry[P]>)[key];
    };

    constructor(
      readonly data: AnyData,
      readonly keyMapping: KeyMapping<Entry>,
      readonly offset = 0,
    ) {
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

    toCsv(filter?: DataViewFilter): Promise<Blob> {
      return serializeToCsv(this.data, this.keyMapping, this.offset, filter);
    }
  }

  return DataViewImpl as unknown as DataViewConstructor<Entry>;
}

/**
 * Loads view data from either json encoded input, a file or url,
 * an existing data view instance, or an array of raw data
 *
 * @param input Raw data view input
 * @param viewCls Data view class
 * @returns Either a data view of the specified type or an array of raw data
 */
export function loadViewData<T extends AnyDataView>(
  input: Signal<DataViewInput<T>>,
  viewCls: Type<T>,
): Signal<T | AnyData> {
  const data = loadData(input, CsvFileLoaderService, {
    papaparse: {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: 'greedy',
    },
  });

  return computed(() => {
    const result = data();
    return result instanceof viewCls || Array.isArray(result) ? result : [];
  });
}

/**
 * Loads a key mapping from either json encoded input, a file or url,
 * or an existing key mapping object
 *
 * @param input Raw key mapping input
 * @param mixins Additional mappings for backwards compatability
 * @returns A partial key mapping
 */
export function loadViewKeyMapping<T>(
  input: Signal<KeyMappingInput<T>>,
  mixins: KeyMappingMixins<T> = {},
): Signal<Partial<KeyMapping<T>>> {
  const data = loadData(input, JsonFileLoaderService, {});
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

    return mapping as Partial<KeyMapping<T>>;
  });
}

/** Type with the `DATA_VIEW_OFFSET` property */
type WithDataViewOffset = Partial<Record<typeof DATA_VIEW_OFFSET, number>>;
/** Symbol used to "smuggle" the offset between inferViewKeyMapping and createDataView */
const DATA_VIEW_OFFSET = Symbol('DataView offset');

/**
 * Gets the `DATA_VIEW_OFFSET` stored in a key mapping
 *
 * @param mapping Key mapping
 * @returns The offset if present
 */
function getDataViewOffset<T>(mapping: Partial<KeyMapping<T>>): number | undefined {
  return (mapping as WithDataViewOffset)[DATA_VIEW_OFFSET];
}

/**
 * Sets a new `DATA_VIEW_OFFSET` in a key mapping
 *
 * @param mapping Key mapping
 * @param offset New offset value
 */
function setDataViewOffset<T>(mapping: Partial<KeyMapping<T>>, offset: number): void {
  (mapping as WithDataViewOffset)[DATA_VIEW_OFFSET] = offset;
}

/**
 * Attempts to infer key mapping properties from raw data
 *
 * @param entry The first raw data entry in the data array
 * @param mapping Mapping to update with inferred keys
 * @param keys Expected entry property keys
 */
function inferViewKeyMappingImpl<T>(entry: AnyDataEntry, mapping: Partial<KeyMapping<T>>, keys: (keyof T)[]): void {
  const icase = (value: unknown) => String(value).toLowerCase();
  const isArrayEntry = Array.isArray(entry);
  let header: unknown[] = [];

  if (isArrayEntry) {
    const isAllNumeric = entry.every((value) => typeof value === 'number');
    const isBackwardsIncompatibleEdges = entry.length === 7 && keys.length >= 7 && isAllNumeric;
    if (isBackwardsIncompatibleEdges) {
      console.warn('Legacy edge format detected! Edges csv now require a header.');
    } else {
      header = entry;
      setDataViewOffset(mapping, 1);
    }
  } else {
    header = Object.keys(entry);
  }

  for (const key of keys) {
    const prop = mapping[key] ?? key;
    const propICase = icase(prop);
    const index = header.findIndex((candidate) => icase(candidate) === propICase);
    if (index >= 0) {
      mapping[key] = (isArrayEntry ? index : header[index]) as never;
    } else {
      delete mapping[key];
    }
  }
}

/**
 * Validates an inferred key mapping
 *
 * @param mapping Inferred key mapping
 * @param requiredKeys Required entry property keys
 * @returns undefined if valid, otherwise an error describing the issue
 */
function validateViewKeyMapping<T>(mapping: Partial<KeyMapping<T>>, requiredKeys: (keyof T)[]): Error | void {
  const missingKeys: (keyof T)[] = [];
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
export function inferViewKeyMapping<T>(
  data: Signal<DataView<T> | AnyData>,
  mapping: Signal<Partial<KeyMapping<T>>>,
  requiredKeys: (keyof T)[],
  optionalKeys: (keyof T)[],
): Signal<KeyMapping<T> | undefined> {
  const errorHandler = inject(ErrorHandler);
  const keys = [...requiredKeys, ...optionalKeys];
  const defaultArrayKeyMapping = {} as KeyMapping<T>;
  keys.forEach((key, index) => (defaultArrayKeyMapping[key] = index));

  return computed(() => {
    const viewData = data();
    if (!Array.isArray(viewData)) {
      return viewData.keyMapping;
    } else if (viewData.length === 0) {
      return defaultArrayKeyMapping;
    }

    const viewMapping = { ...mapping() };
    inferViewKeyMappingImpl(viewData[0], viewMapping, keys);

    const error = validateViewKeyMapping(viewMapping, requiredKeys);
    if (error !== undefined) {
      errorHandler.handleError(error);
      return undefined;
    }

    return viewMapping as KeyMapping<T>;
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
export function createDataView<T, V extends AnyDataView>(
  viewCls: new (data: AnyData, keyMapping: KeyMapping<T>, offset?: number) => V,
  data: Signal<V | AnyData>,
  keyMapping: Signal<KeyMapping<T> | undefined>,
  defaultView: V,
): Signal<V> {
  return computed(() => {
    const viewData = data();
    if (viewData instanceof viewCls) {
      return viewData;
    }

    const viewMapping = keyMapping();
    if (viewMapping !== undefined) {
      return new viewCls(viewData as AnyData, viewMapping, getDataViewOffset(viewMapping));
    }

    return defaultView;
  });
}

export function withDataViewDefaultGenerator<V extends AnyDataView>(
  view: Signal<V>,
  generator: () => Observable<V> | V,
  initialValue: V,
): Signal<V> {
  return derivedAsync<V>(
    () => {
      const result = view();
      return result.length !== 0 ? result : generator();
    },
    { initialValue },
  );
}
