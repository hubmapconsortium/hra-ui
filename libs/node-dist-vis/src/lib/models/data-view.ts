import { computed, Signal, Type } from '@angular/core';
import { CsvFileLoaderService, JsonFileLoaderService } from '@hra-ui/common/fs';
import { loadData } from './utils';

type RemoveWhiteSpace<S extends string> = S extends `${infer Pre} ${infer Post}`
  ? RemoveWhiteSpace<`${Pre}${Post}`>
  : S;

type AccessorPostfixes = 'At' | 'For';
type AccessorName<
  Entry,
  P extends keyof Entry,
  Postfix extends AccessorPostfixes,
> = `get${Capitalize<RemoveWhiteSpace<P & string>>}${Postfix}`;
type Accessor<Entry, P extends keyof Entry, Arg> = (arg: Arg) => Entry[P];

export type AnyDataEntry = unknown[] | object;
export type AnyData = unknown[][] | object[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataViewInput<V extends DataView<any>> = V | AnyData | string | undefined;
export type KeyMapping<Entry> = { [P in keyof Entry]: PropertyKey };
export type KeyMappingWithDataOffset<Entry> = KeyMapping<Entry> & { [DATA_VIEW_OFFSET]?: number };
export type KeyMappingMixins<Entry> = { [P in keyof Entry]?: Signal<PropertyKey | undefined> };
export type KeyMappingInput<Entry> = Partial<KeyMapping<Entry>> | string | undefined;

export type DataViewAccessors<Entry> = {
  [P in keyof Entry as AccessorName<Entry, P, 'At'>]-?: Accessor<Entry, P, number>;
} & {
  [P in keyof Entry as AccessorName<Entry, P, 'For'>]-?: Accessor<Entry, P, AnyDataEntry>;
};

export interface DataView<Entry> {
  readonly keys: (keyof Entry)[];
  readonly data: AnyData;
  readonly keyMapping: KeyMapping<Entry>;
  readonly offset: number;
  readonly length: number;

  readonly getPropertyAt: <P extends keyof Entry>(index: number, property: P) => Entry[P];
  readonly getPropertyFor: <P extends keyof Entry>(obj: AnyDataEntry, property: P) => Entry[P];

  [Symbol.iterator](): IterableIterator<AnyDataEntry>;
}

export interface DataViewConstructor<Entry> {
  new (data: AnyData, keyMapping: KeyMapping<Entry>, offset?: number): DataView<Entry> & DataViewAccessors<Entry>;
}

export const DATA_VIEW_OFFSET = Symbol('data offset');

function createAccessorName<Entry>(property: keyof Entry, postfix: AccessorPostfixes): string {
  const trimmedProperty = String(property).replace(/\s+/g, '');
  const capitalizedProperty = trimmedProperty.slice(0, 1).toUpperCase() + trimmedProperty.slice(1);
  return `get${capitalizedProperty}${postfix}`;
}

function createAccessor<Entry>(instance: DataView<Entry>, property: keyof Entry, postfix: AccessorPostfixes) {
  const method = `getProperty${postfix}` as const;
  return (arg: unknown) => instance[method](arg as never, property);
}

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

export function createDataViewClass<Entry>(keys: (keyof Entry)[]): DataViewConstructor<Entry> {
  class DataViewImpl implements DataView<Entry> {
    readonly keys = keys;
    readonly length: number;

    readonly getPropertyAt = <P extends keyof Entry>(index: number, property: P): Entry[P] => {
      return this.getPropertyFor(this.data[index + this.offset] ?? {}, property);
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
  }

  return DataViewImpl as unknown as DataViewConstructor<Entry>;
}

export function loadViewData<T>(
  input: Signal<T | AnyData | string | undefined>,
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

export function loadViewKeyMapping<T>(
  input: Signal<Partial<KeyMapping<T>> | string | undefined>,
  mixins: KeyMappingMixins<T> = {},
): Signal<Partial<KeyMapping<T>>> {
  const data = loadData(input, JsonFileLoaderService, {});
  return computed(() => {
    const result = data();
    const mapping = typeof result === 'object' && result !== null ? (result as Record<string, unknown>) : {};

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

function inferViewKeyMappingImpl<T>(
  entry: AnyDataEntry,
  mapping: Partial<KeyMappingWithDataOffset<T>>,
  keys: (keyof T)[],
): void {
  const icase = (value: unknown) => String(value).toLowerCase();
  const isArrayEntry = Array.isArray(entry);
  let header: unknown[];

  if (isArrayEntry) {
    if (entry.every((value) => typeof value === 'number')) {
      header = keys;
    } else {
      header = entry;
      mapping[DATA_VIEW_OFFSET] = 1;
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
    }
  }
}

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

export function inferViewKeyMapping<T>(
  data: Signal<DataView<T> | AnyData>,
  mapping: Signal<Partial<KeyMapping<T>>>,
  requiredKeys: (keyof T)[],
  optionalKeys: (keyof T)[],
): Signal<KeyMappingWithDataOffset<T> | undefined> {
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

    const viewMapping = mapping();
    inferViewKeyMappingImpl(viewData[0], viewMapping, keys);

    const error = validateViewKeyMapping(viewMapping, requiredKeys);
    if (error !== undefined) {
      return undefined;
    }

    return viewMapping as KeyMappingWithDataOffset<T>;
  });
}

export function createDataView<T, V>(
  viewCls: new (data: AnyData, keyMapping: KeyMapping<T>, offset?: number) => V,
  data: Signal<V | AnyData>,
  keyMapping: Signal<KeyMappingWithDataOffset<T> | undefined>,
  defaultView: V,
): Signal<V> {
  return computed(() => {
    const viewData = data();
    if (viewData instanceof viewCls) {
      return viewData;
    }

    const viewMapping = keyMapping();
    if (viewMapping !== undefined) {
      return new viewCls(viewData as AnyData, viewMapping, viewMapping[DATA_VIEW_OFFSET]);
    }

    return defaultView;
  });
}
