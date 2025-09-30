import { isSignal, signal } from '@angular/core';
import { createUrlResolverFn, createUrlResolverInjector } from './url-resolver';

describe('createUrlResolverInjector(injectHref, resolve)', () => {
  it('should create an injector function', () => {
    const href1 = signal('/href1');
    const href2 = signal('/href2');
    const injectHref = jest.fn().mockReturnValue(href1);
    const resolve = jest.fn().mockReturnValue('');
    const injectUrlResolver = createUrlResolverInjector(injectHref, resolve);

    const resolver1 = injectUrlResolver();
    const resolver2 = injectUrlResolver();
    expect(resolver1).toEqual(expect.any(Function));
    expect(resolver1).toBe(resolver2);

    injectHref.mockReturnValueOnce(href2);
    const resolver3 = injectUrlResolver();
    expect(resolver3).not.toBe(resolver1);

    const url = 'test';
    const result = resolver1(url);
    expect(result).toEqual('');
    expect(resolve).toHaveBeenCalledWith(href1(), url);
  });
});

describe('createUrlResolverFn(injectResolver)', () => {
  it('returns a function to create resolved url signals', () => {
    const url1 = 'test/url';
    const url2 = 'test/url/2';
    const resolvedUrl = 'https://example.com/test/url';
    const resolver = jest.fn().mockReturnValue(resolvedUrl);
    const injectResolver = () => resolver;

    const urlFn = createUrlResolverFn(injectResolver);
    expect(urlFn).toEqual(expect.any(Function));

    const result1 = urlFn(url1);
    expect(isSignal(result1)).toBeTruthy();
    expect(result1()).toEqual(resolvedUrl);
    expect(resolver).toHaveBeenCalledWith(url1);

    const source = jest.fn().mockReturnValue(url2);
    const result2 = urlFn(source);
    expect(isSignal(result2)).toBeTruthy();
    expect(result2()).toEqual(resolvedUrl);
    expect(resolver).toHaveBeenCalledWith(url2);
  });
});
