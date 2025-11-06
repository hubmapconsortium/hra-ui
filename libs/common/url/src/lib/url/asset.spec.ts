import { TestBed } from '@angular/core/testing';
import { AssetUrlPipe, injectAssetHref, provideAssetHref } from './asset';

describe('AssetHref', () => {
  it('defaults to the import path', () => {
    const href = TestBed.runInInjectionContext(injectAssetHref);
    expect(href?.()).toEqual('');
  });
});

describe('AssetUrlPipe', () => {
  it('resolves urls against the asset href', async () => {
    const baseUrl = 'https://humanatlas.io';
    const url = `page1`;
    const otherUrl = 'https://example.com';

    TestBed.configureTestingModule({ providers: [provideAssetHref(baseUrl)] });
    const pipe = TestBed.runInInjectionContext(() => new AssetUrlPipe());

    expect(pipe.transform(url)).toEqual(`${baseUrl}/${url}`);
    expect(pipe.transform(otherUrl)).toEqual(otherUrl);
  });
});
