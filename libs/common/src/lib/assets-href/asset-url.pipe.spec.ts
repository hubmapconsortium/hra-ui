import { signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { AssetUrlPipe } from './asset-url.pipe';
import { APP_ASSETS_HREF } from './tokens';

describe('AssetUrlPipe', () => {
  const base = '/base/url/';
  const path = 'assets/data.json';

  it('should resolve the relative path against the assets href', async () => {
    await render(`<p>{{ "${path}" | assetUrl }}</p>`, {
      imports: [AssetUrlPipe],
      providers: [{ provide: APP_ASSETS_HREF, useValue: signal(base) }],
    });

    expect(screen.queryByText(base + path)).toBeDefined();
  });

  it('should turn the url into a css url if type is `css`', async () => {
    await render(`<p>{{ "${path}" | assetUrl:'css' }}</p>`, {
      imports: [AssetUrlPipe],
      providers: [{ provide: APP_ASSETS_HREF, useValue: signal(base) }],
    });

    expect(screen.queryByText(`url("${base + path}")`)).toBeDefined();
  });
});
