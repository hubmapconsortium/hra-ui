import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HraApiConfiguration } from '@hra-api/ng-client';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

jest.mock('@google/model-viewer', () => ({}));

@Component({
  standalone: true,
  template: '',
})
class TestMainPageComponent {}

@Component({
  standalone: true,
  template: '',
})
class TestMetadataPageComponent {}

@Component({
  imports: [AppComponent],
  standalone: true,
  template: '<hra-kg-explorer remote-api-endpoint="https://api.test" mirror-url="https://custom-mirror.test" />',
})
class TestAppWithAttributesHostComponent {}

describe('AppComponent', () => {
  const mockApiConfig = {
    basePath: undefined,
  } as HraApiConfiguration;

  const mockHttpClient = {
    get: jest.fn(),
  };

  const defaultGraph = [
    {
      '@id': 'https://cdn.humanatlas.io/hra-kg--staging/ref-organ/heart',
      title: 'Heart Object',
    },
  ];

  function setMockGraph(graph = defaultGraph) {
    mockHttpClient.get.mockReturnValue(
      of({
        '@context': {},
        '@graph': graph,
      }),
    );
  }

  async function setup(options?: {
    metadataRouteData?: Record<string, string>;
    hostWithAttributes?: boolean;
    graph?: unknown[];
  }) {
    mockHttpClient.get.mockClear();
    mockApiConfig.basePath = undefined;
    setMockGraph(options?.graph as typeof defaultGraph | undefined);

    const renderResult = await render(options?.hostWithAttributes ? TestAppWithAttributesHostComponent : AppComponent, {
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: HraApiConfiguration, useValue: mockApiConfig },
        provideRouter(
          [
            {
              path: '',
              pathMatch: 'full',
              component: TestMainPageComponent,
            },
            {
              path: ':type/:name/:version',
              component: TestMetadataPageComponent,
              data: options?.metadataRouteData,
            },
          ],
          withComponentInputBinding(),
          withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
        ),
      ],
    });

    return {
      router: TestBed.inject(Router),
      app: options?.hostWithAttributes
        ? (renderResult.fixture.debugElement.query(By.directive(AppComponent)).componentInstance as AppComponent)
        : (renderResult.fixture.componentInstance as AppComponent),
    };
  }

  it('renders metadata page title in breadcrumbs for object routes', async () => {
    const { router } = await setup();
    await router.navigateByUrl('/ref-organ/heart/v1.0');

    expect(await screen.findByText('Heart Object')).toBeInTheDocument();
    expect(mockHttpClient.get).toHaveBeenCalled();
  });

  it('uses default breadcrumbs when route has no object params', async () => {
    await setup();

    expect(screen.getByText('Knowledge Graph')).toBeInTheDocument();
  });

  it('adds type documentation menu option when documentationUrl and typeLabel are in route data', async () => {
    const { router, app } = await setup({
      metadataRouteData: {
        documentationUrl: 'https://docs.test/ref-organ',
        typeLabel: 'Reference Docs',
      },
    });

    await router.navigateByUrl('/ref-organ/heart/v1.0');
    await screen.findByText('Heart Object');

    expect(app.helpMenuOptions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Reference Docs',
          url: 'https://docs.test/ref-organ',
          description: 'Data documentation for this digital object type',
        }),
      ]),
    );
  });

  it('uses remote-api-endpoint and custom mirror-url host attributes when present', async () => {
    const { router } = await setup({
      hostWithAttributes: true,
      graph: [
        {
          '@id': 'https://custom-mirror.test/ref-organ/heart',
          title: 'Heart Object',
        },
      ],
    });

    await router.navigateByUrl('/ref-organ/heart/v1.0');

    expect(mockApiConfig.basePath).toBe('https://api.test');
    expect(mockHttpClient.get).toHaveBeenCalledWith('https://custom-mirror.test/kg/digital-objects.jsonld');
    expect(await screen.findByText('Heart Object')).toBeInTheDocument();
  });
});
