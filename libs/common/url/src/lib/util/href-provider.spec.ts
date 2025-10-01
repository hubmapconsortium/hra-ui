import { isSignal, Signal, signal } from '@angular/core';
import { createHrefProvider } from './href-provider';
import { RawProvideHrefFn } from './types';

describe('createHrefProvider(provide)', () => {
  it('should accept string values in addition to signals', () => {
    const provide: jest.MockedFunction<RawProvideHrefFn> = jest.fn();
    const hrefProvider = createHrefProvider(provide);

    hrefProvider('abc');
    const result1 = provide.mock.calls[0][0]();
    expect(isSignal(result1)).toBeTruthy();
    expect((result1 as Signal<string>)()).toEqual('abc');

    hrefProvider(() => signal('def'));
    const result2 = provide.mock.calls[1][0]();
    expect(isSignal(result2)).toBeTruthy();
    expect((result2 as Signal<string>)()).toEqual('def');
  });
});
