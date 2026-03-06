import { LocationStrategy } from '@angular/common';
import { Injector, SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { mock } from 'jest-mock-extended';
import { createExternalUrl, createInternalUrl } from './create';

describe('createInternalUrl(injector, commands, extras, isResourceUrl)', () => {
  const commands = ['a', 'b'];
  const router = mock<Router>();
  const locationStrategy = mock<LocationStrategy>();
  const sanitizer = mock<DomSanitizer>();

  function create(isResourceUrl = false): string | undefined {
    const injector = TestBed.inject(Injector);
    return createInternalUrl(injector, commands, {}, isResourceUrl);
  }

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: LocationStrategy, useValue: locationStrategy },
        { provide: DomSanitizer, useValue: sanitizer },
      ],
    });
  });

  it('should create an url tree', () => {
    create();
    expect(router.createUrlTree).toHaveBeenCalledWith(commands, { relativeTo: null });
  });

  it('should serialize the url tree', () => {
    create();
    expect(router.serializeUrl).toHaveBeenCalled();
    expect(locationStrategy.prepareExternalUrl).toHaveBeenCalled();
  });

  it('should sanitize the resulting url', () => {
    create();
    expect(sanitizer.sanitize).toHaveBeenCalled();
  });

  it('should use a different security context if the url is used as a resource', () => {
    create(true);
    expect(sanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.RESOURCE_URL, undefined);
  });
});

describe('createExternalUrl(url, extras)', () => {
  const base = 'https://www.example.com/';

  describe('extras.fragment', () => {
    const url = base + '#test';

    it('keeps the fragment by default', () => {
      const result = createExternalUrl(url, {});
      expect(result).toEqual(url);
    });

    it('replaces the fragment if a new one is provided', () => {
      const fragment = '#foo';
      const result = createExternalUrl(url, { fragment });
      expect(result).toEqual(base + fragment);
    });

    it('removes the fragment if preserveFragment is false', () => {
      const result = createExternalUrl(url, { preserveFragment: false });
      expect(result).toEqual(base);
    });
  });

  describe('extras.queryParams', () => {
    const url = base + '?a=1&b=2';
    const queryParams = { b: 3, c: 4 };

    it('merges the query parameters by default', () => {
      const result = createExternalUrl(url, { queryParams });
      expect(result).toEqual(base + '?a=1&b=3&c=4');
    });

    it("replaces the query parameters if queryParamsHandling === ''", () => {
      const result = createExternalUrl(url, { queryParams, queryParamsHandling: '' });
      expect(result).toEqual(base + '?b=3&c=4');
    });

    it("keeps the query parameters if queryParamsHandling === 'preserve'", () => {
      const result = createExternalUrl(url, { queryParams, queryParamsHandling: 'preserve' });
      expect(result).toEqual(url);
    });
  });
});
