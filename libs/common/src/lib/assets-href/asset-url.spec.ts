import { TestBed } from '@angular/core/testing';
import { assetsUrl, buildAssetUrl } from './asset-url';
import { APP_ASSETS_HREF } from './tokens';
import { isSignal } from '@angular/core';

const base = 'foo';
const path = 'bar';
const url = `${base}/${path}`;
const cssUrl = `url("${url}")`;

describe('buildAssetUrl(base, path, type)', () => {
  it('should join the base and path segments', () => {
    expect(buildAssetUrl(base, path)).toEqual(url);
  });

  it('wraps the result in url() when type is css', () => {
    expect(buildAssetUrl(base, path, 'css')).toEqual(cssUrl);
  });
});

describe('assetsUrl(path, type)', () => {
  it('must be called in an injection context', () => {
    expect(() => assetsUrl(path)).toThrow();
  });

  it('returns a signal with the built url', () => {
    TestBed.inject(APP_ASSETS_HREF).set(base);
    const result = TestBed.runInInjectionContext(() => assetsUrl(path, 'css'));
    expect(isSignal(result)).toBeTruthy();
    expect(result()).toEqual(cssUrl);
  });
});
