import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { getDefaultAssetsHref } from './tokens';

describe('getDefaultAssetsHref([fileUrl])', () => {
  const base = 'https://www.example.com/foo/';

  it("should return fileUrl's directory if the protocol is http(s)", () => {
    const result = TestBed.runInInjectionContext(() => getDefaultAssetsHref(base + 'bar.js'));
    expect(result).toEqual(base);
  });

  it("should return the base href if fileUrl's protocol is not http(s)", () => {
    TestBed.configureTestingModule({ providers: [{ provide: APP_BASE_HREF, useValue: base }] });
    const result = TestBed.runInInjectionContext(() => getDefaultAssetsHref());
    expect(result).toEqual(base);
  });
});
