import { TestBed } from '@angular/core/testing';
import { ICONS_CONFIG } from '../tokens';
import { MatIconRegistry } from '@angular/material/icon';
import { mock } from 'jest-mock-extended';
import { registerFontClasses } from './classes';

describe('registerFontClasses()', () => {
  it('registers the font classes in addition to the defaults', () => {
    const defaultClasses = ['a', 'b'];
    const classes = ['b', 'c'];
    const registry = mock<MatIconRegistry>({
      getDefaultFontSetClass: () => defaultClasses,
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ICONS_CONFIG,
          useValue: { fontClasses: classes },
        },
        {
          provide: MatIconRegistry,
          useValue: registry,
        },
      ],
    });

    TestBed.runInInjectionContext(() => registerFontClasses());

    expect(registry.setDefaultFontSetClass).toHaveBeenCalledTimes(1);
    const args = registry.setDefaultFontSetClass.mock.calls[0];
    expect(args.length).toEqual(3);
    expect(args).toEqual(expect.arrayContaining(['a', 'b', 'c']));
  });
});
