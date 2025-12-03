import { LocationStrategy } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { injectPageHref, PageUrlPipe, providePageHref } from './page';

describe('PageHref', () => {
  it('defaults to the page location', () => {
    const baseUrl = 'https://apps.humanatlas.io/';

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocationStrategy,
          useValue: { getBaseHref: () => baseUrl },
        },
      ],
    });

    const href = TestBed.runInInjectionContext(injectPageHref);
    expect(href?.()).toEqual(baseUrl);
  });
});

describe('PageUrlPipe', () => {
  it('resolves urls against the page href', async () => {
    const baseUrl = 'https://humanatlas.io';
    const url = `page1`;
    const otherUrl = 'https://example.com';

    TestBed.configureTestingModule({ providers: [providePageHref(baseUrl)] });
    const pipe = TestBed.runInInjectionContext(() => new PageUrlPipe());

    expect(pipe.transform(url)).toEqual(`${baseUrl}/${url}`);
    expect(pipe.transform(otherUrl)).toEqual(otherUrl);
  });
});
