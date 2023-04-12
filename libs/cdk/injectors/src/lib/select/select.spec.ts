import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { mock, mockClear } from 'jest-mock-extended';
import { from, lastValueFrom, NEVER, toArray } from 'rxjs';
import { injectDestroy$ } from '../on-destroy/on-destroy';
import { select$ } from './select';

jest.mock('../on-destroy/on-destroy');
jest.mocked(injectDestroy$).mockReturnValue(NEVER);

describe('select$(selector, options)', () => {
  const values = ['a', 1, false];
  const selector = () => undefined as unknown;
  const store = mock<Store>();
  const cdr = mock<ChangeDetectorRef>();
  store.select.mockReturnValue(from(values));

  const runSelect$: typeof select$ = (...args) => TestBed.runInInjectionContext(() => select$(...args));
  const collectSelect$: <T>(...args: Parameters<typeof select$<T>>) => Promise<T[]> = (...args) =>
    lastValueFrom(runSelect$(...args).pipe(toArray()));

  beforeEach(() => {
    mockClear(store);
    mockClear(cdr);

    TestBed.overrideProvider(Store, { useValue: store });
  });

  it('should select values from the store', () => {
    runSelect$(selector);
    expect(store.select).toHaveBeenCalledWith(selector);
  });

  it('should emit the selected values', async () => {
    await expect(collectSelect$(selector)).resolves.toEqual(values);
  });

  it('should notify the change detector by default if it exists', async () => {
    TestBed.overrideProvider(ChangeDetectorRef, { useValue: cdr });
    await collectSelect$(selector);
    // Total # of calls = # of values + 1 for 'complete()' call
    expect(cdr.markForCheck).toHaveBeenCalledTimes(values.length + 1);
  });

  it('should not notify the change detector if explicitly told not too', async () => {
    TestBed.overrideProvider(ChangeDetectorRef, { useValue: cdr });
    await collectSelect$(selector, { notifyOnChange: false });
    expect(cdr.markForCheck).not.toHaveBeenCalled();
  });
  //
});
