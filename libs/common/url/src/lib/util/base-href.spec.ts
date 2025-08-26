import { LocationStrategy } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { getDefaultBaseHref } from './base-href';

describe('Base Href Utilities', () => {
  describe('getDefaultBaseHref', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('should return empty string when LocationStrategy is not available', () => {
      TestBed.configureTestingModule({
        providers: [],
      });

      TestBed.runInInjectionContext(() => {
        const result = getDefaultBaseHref();
        expect(result).toBe('');
      });
    });

    it('should return base href from LocationStrategy when available', () => {
      const mockLocationStrategy = {
        getBaseHref: jest.fn().mockReturnValue('/app/'),
      };

      TestBed.configureTestingModule({
        providers: [{ provide: LocationStrategy, useValue: mockLocationStrategy }],
      });

      TestBed.runInInjectionContext(() => {
        const result = getDefaultBaseHref();
        expect(result).toBe('/app/');
        expect(mockLocationStrategy.getBaseHref).toHaveBeenCalled();
      });
    });

    it('should return empty string when LocationStrategy returns null', () => {
      const mockLocationStrategy = {
        getBaseHref: jest.fn().mockReturnValue(null),
      };

      TestBed.configureTestingModule({
        providers: [{ provide: LocationStrategy, useValue: mockLocationStrategy }],
      });

      TestBed.runInInjectionContext(() => {
        const result = getDefaultBaseHref();
        expect(result).toBe('');
      });
    });

    it('should handle injection errors gracefully', () => {
      const result = getDefaultBaseHref();
      expect(result).toBe('');
    });
  });
});
