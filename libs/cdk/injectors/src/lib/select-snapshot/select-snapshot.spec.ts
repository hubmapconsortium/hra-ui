import { inject, ChangeDetectorRef } from '@angular/core';
import { StateToken, Store } from '@ngxs/store';
import { mock, MockProxy } from 'jest-mock-extended';
import { Subject } from 'rxjs';

import { injectOnDestroy } from '../on-destroy/on-destroy';
import { selectQuerySnapshot, selectSnapshot } from './select-snapshot';

jest.mock('@angular/core', () => {
  const originalModule = jest.requireActual('@angular/core');

  return {
    __esModule: true,
    ...originalModule,
    inject: jest.fn(),
  };
});

jest.mock('../on-destroy/on-destroy.ts');

const selector = new StateToken<unknown>('test');
const mockedInject = jest.mocked(inject);
const mockedInjectOnDestroy = jest.mocked(injectOnDestroy);
let store: MockProxy<Store>;
let dataSubject: Subject<unknown>;

beforeEach(() => {
  mockedInject.mockReset();
  mockedInjectOnDestroy.mockReset();

  store = mock<Store>();
  dataSubject = new Subject();

  mockedInject.mockReturnValueOnce(store).mockReturnValueOnce(null);
  mockedInjectOnDestroy.mockReturnValue(new Subject());
  store.select.mockReturnValue(dataSubject);
});

describe(selectSnapshot, () => {
  it('returns a snapshot function', () => {
    expect(typeof selectSnapshot(selector)).toEqual('function');
  });

  it('returns the latest value', () => {
    const value = 'abc';
    const fn = selectSnapshot(selector);
    dataSubject.next(value);
    expect(fn()).toEqual(value);
  });

  it('marks for change detection when a new value is available', () => {
    const cdr = mock<ChangeDetectorRef>();
    mockedInject.mockReset().mockReturnValueOnce(store).mockReturnValueOnce(cdr);
    selectSnapshot(selector);
    dataSubject.next(10);
    expect(cdr.markForCheck).toHaveBeenCalled();
  });

  it('throws an error if an error has been emitted', () => {
    const error = new Error('failure');
    const fn = selectSnapshot(selector);
    dataSubject.error(error);
    expect(fn).toThrow(error);
  });

  it('continues to return the latest value even when completed', () => {
    const value = true;
    const fn = selectSnapshot(selector);
    dataSubject.next(value);
    dataSubject.complete();
    expect(fn()).toEqual(value);
  });
});

describe(selectQuerySnapshot, () => {
  it('calls query with the provided arguments', () => {
    const result = [1, '2'];
    const args = [true, { id: 2 }];
    const query = jest.fn().mockReturnValue(result);
    const fn = selectQuerySnapshot(selector);
    dataSubject.next(query);

    expect(fn(...args)).toEqual(result);
    expect(query).toHaveBeenLastCalledWith(...args);
  });
});
