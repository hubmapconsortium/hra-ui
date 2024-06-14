import { TestBed } from '@angular/core/testing';
import { createAbsoluteUrl } from './url-normalization';
import { Location } from '@angular/common';
import { mock } from 'jest-mock-extended';

describe('createAbsoluteUrl(url)', () => {
  it('throws if not run in an injection context', () => {
    expect(() => createAbsoluteUrl('')).toThrow(/injection context/);
  });

  it('returns the url unchanged if it is already absolute', () => {
    const url = 'https://example.com';
    TestBed.runInInjectionContext(() => {
      const result = createAbsoluteUrl(url);
      expect(result).toEqual(url);
    });
  });

  it('uses the location.prepareExternalUrl for relative urls', () => {
    const relativeUrl = '/abc/def';
    const resultUrl = 'https://example.com' + relativeUrl;
    const mockLocation = mock<Location>();
    mockLocation.prepareExternalUrl.mockReturnValue(resultUrl);

    TestBed.overrideProvider(Location, {
      useValue: mockLocation,
    });

    TestBed.runInInjectionContext(() => {
      const result = createAbsoluteUrl(relativeUrl);
      expect(mockLocation.prepareExternalUrl).toHaveBeenCalledWith(relativeUrl);
      expect(result).toEqual(resultUrl);
    });
  });
});
