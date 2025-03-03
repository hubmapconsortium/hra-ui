import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { provideFontIcons, provideIcons, provideSvgIcons } from './providers';

describe('provideFontIcons()', () => {
  const fontClasses = ['font-class-1', 'font-class-2'];
  let registry: MatIconRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFontIcons({
          defaultClasses: fontClasses,
        }),
      ],
    });

    registry = TestBed.inject(MatIconRegistry);
  });

  it('adds font set classes', () => {
    for (const cls of fontClasses) {
      expect(registry.getDefaultFontSetClass()).toContain(cls);
    }
  });
});

describe('provideSvgIcons()', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideSvgIcons()],
    });

    spy = jest.spyOn(MatIconRegistry.prototype, 'addSvgIconResolver');
    TestBed.inject(MatIconRegistry);
  });

  it('registers a svg icon resolver', () => {
    expect(spy).toHaveBeenCalled();
  });
});

describe('provideIcons()', () => {
  it('provides both font and svg icon providers', () => {
    expect(provideIcons()).toBeDefined();
  });
});
