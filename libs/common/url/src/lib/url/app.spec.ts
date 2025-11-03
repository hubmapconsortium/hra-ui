import { TestBed } from '@angular/core/testing';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { AppUrlPipe, injectAppHref } from './app';

describe('AppHref', () => {
  it('defaults to the empty string', () => {
    const href = TestBed.runInInjectionContext(injectAppHref);
    expect(href?.()).toEqual('');
  });
});

describe('AppUrlPipe', () => {
  it('resolves urls against the app href', async () => {
    const baseUrl = 'https://humanatlas.io';
    const url = `${baseUrl}/page1`;
    const otherUrl = 'https://example.com';

    TestBed.configureTestingModule({ providers: [provideAppConfiguration({ url: baseUrl })] });
    const pipe = TestBed.runInInjectionContext(() => new AppUrlPipe());

    expect(pipe.transform(url)).toEqual('page1');
    expect(pipe.transform(otherUrl)).toEqual(otherUrl);
  });
});
