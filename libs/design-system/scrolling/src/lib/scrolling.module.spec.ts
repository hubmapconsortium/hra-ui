import { TestBed } from '@angular/core/testing';
import { StyleComponentManagerService } from '@hra-ui/cdk/styling';
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

  it('should provide style component manager service', () => {
    TestBed.configureTestingModule({
      providers: [provideScrolling()],
    });

    const service = TestBed.inject(StyleComponentManagerService);
    expect(service).toBeDefined();
  });

  it('should handle custom polyfill url', () => {
    const customPolyfillUrl = 'custom/path/to/polyfill.js';

    TestBed.configureTestingModule({
      providers: [provideScrolling({ polyfillUrl: customPolyfillUrl })],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options).toBeDefined();
  });

  it('should use default polyfill url when no custom url is provided', () => {
    TestBed.configureTestingModule({
      providers: [provideScrolling()],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options).toBeDefined();
  });

  it('should handle options being undefined', () => {
    TestBed.configureTestingModule({
      providers: [provideScrolling(undefined)],
    });

    const options = TestBed.inject(NG_SCROLLBAR_OPTIONS) as NgScrollbarOptions;
    expect(options).toBeDefined();
    expect(options.visibility).toBe('hover');
  });
});
