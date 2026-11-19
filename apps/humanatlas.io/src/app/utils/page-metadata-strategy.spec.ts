import { Component, DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Routes, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { PageMetadataStrategy } from './page-metadata-strategy';

@Component({ template: '' })
class DummyComponent {}

const ROUTES: Routes = [
  { path: '', component: DummyComponent },
  {
    path: 'about',
    component: DummyComponent,
    resolve: {
      data: () => ({ title: ' About\n  the HRA ', subtitle: 'See <a href="/data">digital objects</a>\n  here.' }),
    },
  },
  {
    path: 'release-notes/:version',
    title: (route) => `Release Notes ${route.params['version']}`,
    component: DummyComponent,
    resolve: { data: () => ({ title: 'Release Notes', subtitle: 'What is new.' }) },
  },
  { path: '**', title: 'Page Not Found', component: DummyComponent, data: { robots: 'noindex' } },
];

describe('PageMetadataStrategy', () => {
  let harness: RouterTestingHarness;
  let meta: Meta;

  function getTag(selector: string): string | undefined {
    return meta.getTag(selector)?.content;
  }

  function getCanonicalUrl(): string | null | undefined {
    return TestBed.inject(DOCUMENT).head.querySelector('link[rel="canonical"]')?.getAttribute('href');
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(ROUTES),
        provideAppConfiguration({ url: 'https://humanatlas.io/' }),
        { provide: TitleStrategy, useClass: PageMetadataStrategy },
      ],
    });
    meta = TestBed.inject(Meta);
    harness = await RouterTestingHarness.create();
  });

  it('uses the content page title and subtitle', async () => {
    await harness.navigateByUrl('/about?organ=kidney#team');

    expect(TestBed.inject(Title).getTitle()).toBe('About the HRA | Human Reference Atlas');
    expect(getTag('property="og:title"')).toBe('About the HRA');
    expect(getTag('name="description"')).toBe('See digital objects here.');
    expect(getTag('property="og:description"')).toBe('See digital objects here.');
    expect(getTag('property="og:url"')).toBe('https://humanatlas.io/about');
    expect(getCanonicalUrl()).toBe('https://humanatlas.io/about');
  });

  it('prefers the route title', async () => {
    await harness.navigateByUrl('/release-notes/v2.5');

    expect(TestBed.inject(Title).getTitle()).toBe('Release Notes v2.5 | Human Reference Atlas');
  });

  it('falls back to the site defaults', async () => {
    await harness.navigateByUrl('/about');
    await harness.navigateByUrl('/');

    expect(TestBed.inject(Title).getTitle()).toBe('Human Reference Atlas Portal');
    expect(getTag('name="description"')).toMatch(/^The Human Reference Atlas \(HRA\) is/);
    expect(getCanonicalUrl()).toBe('https://humanatlas.io/');
  });

  it('adds noindex without a canonical link, and removes it on the next page', async () => {
    await harness.navigateByUrl('/about');
    await harness.navigateByUrl('/index.html');

    expect(getTag('name="robots"')).toBe('noindex');
    expect(getTag('property="og:url"')).toBeUndefined();
    expect(getCanonicalUrl()).toBeUndefined();

    await harness.navigateByUrl('/about');

    expect(getTag('name="robots"')).toBeUndefined();
    expect(getCanonicalUrl()).toBe('https://humanatlas.io/about');
  });
});
