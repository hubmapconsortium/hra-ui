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
export type KeyMapping<Entry> = { [P in keyof Entry]: PropertyKey };

export type DataViewAccessors<Entry> = {
  [P in keyof Entry as AccessorName<Entry, P, 'At'>]-?: Accessor<Entry, P, number>;
} & {
  [P in keyof Entry as AccessorName<Entry, P, 'For'>]-?: Accessor<Entry, P, AnyDataEntry>;
};

export interface DataView<Entry> {
  readonly keys: (keyof Entry)[];
  readonly data: AnyData;
  readonly keyMapping: KeyMapping<Entry>;

  readonly getPropertyAt: <P extends keyof Entry>(index: number, property: P) => Entry[P];
  readonly getPropertyFor: <P extends keyof Entry>(obj: AnyDataEntry, property: P) => Entry[P];
}

export interface DataViewConstructor<Entry> {
  new (data: AnyData, keyMapping?: KeyMapping<Entry>): DataView<Entry> & DataViewAccessors<Entry>;
}

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

    readonly getPropertyAt = <P extends keyof Entry>(index: number, property: P): Entry[P] => {
      return this.getPropertyFor(this.data[index], property);
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
    ) {
      attachAccessors(this, this.keys);
    }
  }

  return DataViewImpl as unknown as DataViewConstructor<Entry>;
}
