import { isSignal, Signal, signal } from '@angular/core';
import { createChainedHrefProvider, createHrefProvider } from './href-provider';
import { InjectHrefFn, RawProvideHrefFn } from './types';

describe('createHrefProvider(provide)', () => {
  it('should accept string values in addition to signals', () => {
    const provide: jest.MockedFunction<RawProvideHrefFn> = jest.fn();
    const hrefProvider = createHrefProvider(provide);

    hrefProvider('abc');
    const result1 = provide.mock.calls[0][0]();
    expect(isSignal(result1)).toBeTruthy();

    hrefProvider(() => signal('def'));
    const result2 = provide.mock.calls[1][0]();
    expect(isSignal(result2)).toBeTruthy();
  });
});

describe('createChainedHrefProvider(injectHref, provide)', () => {
  it('should fall back to the parent href when the value is undefined', () => {
    const baseHref = signal('abc');
    const injectHref: jest.MockedFunction<InjectHrefFn> = jest.fn().mockReturnValue(baseHref);
    const provide: jest.MockedFunction<RawProvideHrefFn> = jest.fn();
    const hrefProvider = createChainedHrefProvider(injectHref, provide);

    hrefProvider(signal('def'));
    const result1 = provide.mock.calls[0][0]();
    expect(isSignal(result1)).toBeTruthy();
    expect((result1 as Signal<string>)()).toEqual('def');

    hrefProvider(signal(undefined));
    const result2 = provide.mock.calls[1][0]();
    expect((result2 as Signal<string>)()).toEqual('abc');
  });
});
