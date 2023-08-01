import { ReplaySubject } from 'rxjs';
import { select$ } from './select';
import { selectQuerySnapshot, selectSnapshot } from './select-snapshot';

jest.mock('./select.ts');

let selectSubject: ReplaySubject<unknown>;

beforeEach(() => {
  selectSubject = new ReplaySubject();
  jest.clearAllMocks();
  jest.mocked(select$).mockReturnValue(selectSubject);
});

describe(selectSnapshot, () => {
  const selector = () => undefined as unknown;

  it('returns a snapshot function', () => {
    expect(typeof selectSnapshot(selector)).toEqual('function');
  });

  it('returns the latest value', () => {
    const value = 'abc';
    const fn = selectSnapshot(selector);
    selectSubject.next(value);
    expect(fn()).toEqual(value);
  });

  it('throws an error if an error has been emitted', () => {
    const error = new Error('failure');
    const fn = selectSnapshot(selector);
    selectSubject.error(error);
    expect(fn).toThrow(error);
  });

  it('continues to return the latest value even when completed', () => {
    const value = true;
    const fn = selectSnapshot(selector);
    selectSubject.next(value);
    selectSubject.complete();
    expect(fn()).toEqual(value);
  });
});

describe(selectQuerySnapshot, () => {
  const query = jest.fn();
  const selector = () => query;

  beforeEach(() => {
    query.mockReset();
  });

  it('calls query with the provided arguments', () => {
    const result = [1, '2'];
    const args = [true, { id: 2 }];
    const query = jest.fn().mockReturnValue(result);
    const fn = selectQuerySnapshot(selector);
    selectSubject.next(query);

    expect(fn(...args)).toEqual(result);
    expect(query).toHaveBeenLastCalledWith(...args);
  });

  it('should pass bound arguments before additional ones', () => {
    const result = [1, '2'];
    const boundArgs = ['b', 33];
    const args = [true, { id: 2 }];
    const query = jest.fn().mockReturnValue(result);
    const fn = selectQuerySnapshot(selector, ...boundArgs);
    selectSubject.next(query);

    expect(fn(...args)).toEqual(result);
    expect(query).toHaveBeenLastCalledWith(...boundArgs, ...args);
  });
});
