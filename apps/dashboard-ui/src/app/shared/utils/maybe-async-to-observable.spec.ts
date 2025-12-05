import { Observable, of } from 'rxjs';
import { maybeAsyncToObservable } from './maybe-async-to-observable';

describe('maybeAsyncToObservable', () => {
  it('should convert Observable to Observable', async () => {
    const source = of('test-value');
    const result = maybeAsyncToObservable(source);

    expect(result).toBe(source);

    const value = await result.toPromise();
    expect(value).toBe('test-value');
  });

  it('should convert Promise to Observable', async () => {
    const source = Promise.resolve('promise-value');
    const result = maybeAsyncToObservable(source);

    expect(result).toBeInstanceOf(Observable);

    const value = await result.toPromise();
    expect(value).toBe('promise-value');
  });

  it('should convert synchronous value to Observable', async () => {
    const source = 'sync-value';
    const result = maybeAsyncToObservable(source);

    expect(result).toBeInstanceOf(Observable);

    const value = await result.toPromise();
    expect(value).toBe('sync-value');
  });
});
