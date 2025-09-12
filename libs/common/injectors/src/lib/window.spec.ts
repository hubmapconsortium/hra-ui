import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { injectWindow } from './window';

describe('Window Injector', () => {
  it('should inject window from document.defaultView', () => {
    const mockWindow = { location: { href: 'https://test.com' } } as Window;
    const mockDocument = {
      defaultView: mockWindow,
    } as Document;

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: mockDocument }],
    });

    TestBed.runInInjectionContext(() => {
      const windowObj = injectWindow();
      expect(windowObj).toBe(mockWindow);
    });
  });

  it('should fallback to global window when defaultView is null', () => {
    const mockDocument = {
      defaultView: null,
    } as Document;

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: mockDocument }],
    });

    TestBed.runInInjectionContext(() => {
      const windowObj = injectWindow();
      expect(windowObj).toBe(window);
    });
  });
});
