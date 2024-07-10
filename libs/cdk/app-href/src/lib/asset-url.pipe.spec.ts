import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { AppHrefService } from './app-href.service';
import { AssetUrlPipe } from './asset-url.pipe';
import { provideAppHref } from './providers';

describe('AssetUrlPipe', () => {
  const appHref = 'https://example.com/';

  it('prefixes the path with the appHref', async () => {
    await render(`<div>{{ 'image.svg' | assetUrl }}</div>`, {
      imports: [AssetUrlPipe],
      providers: [provideAppHref(appHref)],
    });

    screen.getByText(appHref + 'image.svg');
  });

  it('adds `url(...)` to for css urls', async () => {
    await render(`<div>{{ 'image.svg' | assetUrl:'css' }}</div>`, {
      imports: [AssetUrlPipe],
      providers: [provideAppHref(appHref)],
    });

    screen.getByText(`url("${appHref}image.svg")`);
  });

  it('updates when appHref changes', async () => {
    await render(`<div>{{ 'image.svg' | assetUrl }}</div>`, {
      imports: [AssetUrlPipe],
      providers: [provideAppHref(appHref)],
    });

    const newAppHref = 'https://test.com/';
    TestBed.inject(AppHrefService).setAppHref(newAppHref);

    await screen.findByText(newAppHref + 'image.svg');
  });
});
