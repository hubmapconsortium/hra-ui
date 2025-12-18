import { TestBed } from '@angular/core/testing';
import { NG_SCROLLBAR_OPTIONS, NgScrollbarOptions } from 'ngx-scrollbar';
import { provideScrolling } from './scrolling.module';

describe('provideScrolling', () => {
  it('should provide scrollbar options with default values', () => {
    TestBed.configureTestingModule({
      providers: [provideScrolling()],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options).toBeDefined();
    expect(options.visibility).toBe('hover');
    expect(options.appearance).toBe('compact');
    expect(options.trackClass).toBe('hra-scrollbar-track');
    expect(options.thumbClass).toBe('hra-scrollbar-thumb');
  });

  it('should provide scrollbar options with custom values', () => {
    const customOptions = {
      visibility: 'native' as const,
    };

    TestBed.configureTestingModule({
      providers: [provideScrolling(customOptions)],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options).toBeDefined();
    expect(options.visibility).toBe('native');
    expect(options.appearance).toBe('compact');
    expect(options.trackClass).toBe('hra-scrollbar-track');
    expect(options.thumbClass).toBe('hra-scrollbar-thumb');
  });

  it('should merge custom options with defaults', () => {
    const customOptions = {
      visibility: 'native' as const,
      trackClass: 'custom-track',
    };

    TestBed.configureTestingModule({
      providers: [provideScrolling(customOptions)],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options.visibility).toBe('native');
    expect(options.appearance).toBe('compact');
    expect(options.trackClass).toBe('custom-track');
    expect(options.thumbClass).toBe('hra-scrollbar-thumb');
  });
});
