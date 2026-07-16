import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideWindow } from '@hra-ui/common/injectors';
import { render, screen } from '@testing-library/angular';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ArchiveRedirectComponent } from './archive-redirect.component';
import { ArchiveStore } from './state/archive.store';

describe('ArchiveRedirectComponent', () => {
  function createStoreMock(options?: { isLoading?: boolean; redirectUrl?: string }) {
    const isLoading = options?.isLoading ?? false;
    const redirectUrl = options?.redirectUrl;

    return {
      loadEntries: jest.fn(),
      isLoading: jest.fn(() => isLoading),
      getEntryBefore: jest.fn(() =>
        redirectUrl
          ? {
              redirectUrl,
              timestamp: Date.UTC(2026, 2, 9),
            }
          : undefined,
      ),
    };
  }

  async function setup(options?: {
    routeSegments?: string[];
    isLoading?: boolean;
    redirectUrl?: string;
    href?: string;
  }) {
    const store = createStoreMock({
      isLoading: options?.isLoading,
      redirectUrl: options?.redirectUrl,
    });

    const windowMock = {
      location: {
        href: options?.href ?? 'https://cns.iu.edu/old/page',
      },
    };

    const routeSegments = options?.routeSegments ?? ['old', 'page'];

    const renderResult = await render(ArchiveRedirectComponent, {
      componentProviders: [{ provide: ArchiveStore, useValue: store }],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            url: of(routeSegments.map((segment) => ({ toString: () => segment }))),
          },
        },
        provideWindow(windowMock as unknown as Window & typeof globalThis),
      ],
    });

    return { ...renderResult, store, windowMock };
  }

  it('loads archive entries using the current route path', async () => {
    const { store } = await setup({ routeSegments: ['legacy', 'news', 'article'] });

    expect(store.loadEntries).toHaveBeenCalledTimes(1);

    const [route$] = store.loadEntries.mock.calls[0] as [Observable<string>];
    await expect(firstValueFrom(route$)).resolves.toBe('legacy/news/article');
  });

  it('shows loading state while archive entries are being fetched', async () => {
    await setup({ isLoading: true });

    expect(screen.getByText('This page isn’t available')).toBeInTheDocument();
    expect(screen.getByText('Looking for archived pages...')).toBeInTheDocument();
    expect(
      screen.queryByText('No archived pages found. Check the page address or try searching Google for this URL.'),
    ).not.toBeInTheDocument();
  });

  it('shows unavailable state when no archived page is found', async () => {
    await setup({ isLoading: false, redirectUrl: undefined });

    expect(screen.getByText('This page isn’t available')).toBeInTheDocument();
    expect(
      screen.getByText('No archived pages found. Check the page address or try searching Google for this URL.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Looking for archived pages...')).not.toBeInTheDocument();
  });

  it('shows archived page messaging and action link when redirect exists', async () => {
    const redirectUrl = 'https://apps.humanatlas.io/archive/page';
    await setup({ isLoading: false, redirectUrl });

    expect(screen.getByText('This page has been archived')).toBeInTheDocument();
    expect(screen.getByText(redirectUrl)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view archived page/i })).toHaveAttribute('href', redirectUrl);
  });

  it('redirects to the archived page after countdown reaches zero', async () => {
    jest.useFakeTimers();
    const redirectUrl = 'https://apps.humanatlas.io/archive/page';

    const { windowMock } = await setup({ isLoading: false, redirectUrl });

    jest.advanceTimersByTime(5000);
    expect(windowMock.location.href).toBe(redirectUrl);

    jest.useRealTimers();
  });
});
