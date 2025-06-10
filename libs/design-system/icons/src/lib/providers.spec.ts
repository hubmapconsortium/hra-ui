import { TestBed } from '@angular/core/testing';
import { provideIcons, withFontIconClasses, withSvgIconDirectory } from './providers';
import { MatIconRegistry } from '@angular/material/icon';

describe('provideIcons', () => {
  it('should apply the features', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(withFontIconClasses(['foobar']), withSvgIconDirectory('assets/'))],
    });

    const registry = TestBed.inject(MatIconRegistry);
    expect(registry.getDefaultFontSetClass()).toContain('foobar');
  });
});
