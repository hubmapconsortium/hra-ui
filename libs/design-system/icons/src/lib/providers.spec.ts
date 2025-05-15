import { TestBed } from '@angular/core/testing';
import { provideIcons } from './providers';
import { ICONS_CONFIG } from './tokens';

describe('provideIcons(config)', () => {
  it('sets the icons config', () => {
    const dir = 'test/dir/';
    TestBed.configureTestingModule({ providers: [provideIcons({ svgDirectory: dir })] });

    expect(TestBed.inject(ICONS_CONFIG).svgDirectory).toEqual(dir);
  });
});
