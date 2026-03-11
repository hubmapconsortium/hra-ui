import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { HraKgService, V1Service } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { DO_COLUMNS, METADATA_COLUMNS } from './app.routes';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';
import { setMirrorUrl, setRemoteApiEndpoint } from './utils/endpoints';
import {
  asctbResolver,
  biomarkersResolver,
  cellTypeResolver,
  documentationUrlResolver,
  doMetadataResolver,
  kgResolver,
  ontologyResolver,
  productLabelResolver,
} from './utils/kg-resolver';

const mockRouteDataSignal = signal<Record<string, unknown>>({});

jest.mock('./utils/route-data', () => ({
  routeData: () => mockRouteDataSignal,
}));

jest.mock('./utils/endpoints', () => ({
  setRemoteApiEndpoint: jest.fn(),
  setMirrorUrl: jest.fn(),
}));

jest.mock('@google/model-viewer', () => ({}));

describe('AppComponent', () => {
  const mockKgService = {
    doSearch: jest.fn().mockReturnValue(of([])),
    digitalObjects: jest.fn().mockReturnValue(
      of({
        '@graph': [
          {
            '@id': 'https://lod.humanatlas.io/ref-organ/heart',
            title: 'Heart Object',
          },
        ],
      }),
    ),
    asctbTermOccurences: jest.fn().mockReturnValue(of({ root: '', nodes: [] })),
  };

  const mockV1Service = {
    asctbTermOccurences: jest.fn().mockReturnValue(of([])),
    ontologyTreeModel: jest.fn().mockReturnValue(of({ root: '', nodes: {} })),
    cellTypeTreeModel: jest.fn().mockReturnValue(of({ root: '', nodes: {} })),
    biomarkerTreeModel: jest.fn().mockReturnValue(of({ root: '', nodes: {} })),
  };

  const mockActivatedRouteSnapshot = {
    params: {
      type: 'ref-organ',
      name: 'heart',
      version: '1.0',
    },
    paramMap: {
      get: jest.fn().mockImplementation((key: string) => {
        const params: Record<string, string> = { type: 'ref-organ', name: 'heart', version: 'v1.0' };
        return params[key];
      }),
    },
  };

  async function setup(kg: HraKgService) {
    return render(AppComponent, {
      providers: [
        { provide: HraKgService, useValue: kg },
        { provide: V1Service, useValue: mockV1Service },
        { provide: ActivatedRouteSnapshot, useValue: mockActivatedRouteSnapshot },
        provideRouter(
          [
            {
              path: '',
              pathMatch: 'full',
              component: MainPageComponent,
              data: {
                reuse: true,
                columns: DO_COLUMNS,
              },
              resolve: {
                data: kgResolver(),
                asctbTermOccurrences: asctbResolver(),
                ontologyTree: ontologyResolver(),
                cellTypeTree: cellTypeResolver(),
                biomarkerTree: biomarkersResolver(),
              },
            },
            {
              path: ':type/:name/:version',
              component: MetadataPageComponent,
              data: {
                columns: METADATA_COLUMNS,
              },
              resolve: {
                doData: kgResolver(),
                metadata: jest.mocked(doMetadataResolver),
                documentationUrl: documentationUrlResolver(),
                typeLabel: jest.mocked(productLabelResolver()),
              },
            },
          ],
          withComponentInputBinding(),
          withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
        ),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component and compute breadcrumbs', async () => {
    mockRouteDataSignal.set({});
    const { fixture } = await setup(mockKgService as unknown as HraKgService);
    const component = fixture.componentInstance;
    component.params.set(['ref-organ', 'heart']);
    fixture.detectChanges();

    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Heart Object')).toBeInTheDocument();
  });

  it('uses default breadcrumbs if there are no params', async () => {
    mockRouteDataSignal.set({});
    await setup(mockKgService as unknown as HraKgService);

    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Knowledge Graph')).toBeInTheDocument();
  });

  it('sets extra menu option when route data has both type label and documentation url', async () => {
    mockRouteDataSignal.set({
      typeLabel: 'Reference Organ',
      documentationUrl: 'https://example.org/reference-organ',
    });

    const { fixture } = await setup(mockKgService as unknown as HraKgService);
    const component = fixture.componentInstance as unknown as {
      extraMenuOption: () => unknown;
      helpMenuOptions: () => { label: string; url: string; description?: string }[] | undefined;
    };

    expect(component.extraMenuOption()).toEqual({
      label: 'Reference Organ',
      url: 'https://example.org/reference-organ',
      description: 'Data documentation for this digital object type',
    });
    expect(component.helpMenuOptions()?.[1]).toEqual({
      label: 'Reference Organ',
      url: 'https://example.org/reference-organ',
      description: 'Data documentation for this digital object type',
    });
  });

  it('clears extra menu option when route data is missing required fields', async () => {
    mockRouteDataSignal.set({ typeLabel: 'Reference Organ' });

    const { fixture } = await setup(mockKgService as unknown as HraKgService);
    const component = fixture.componentInstance as unknown as { extraMenuOption: () => unknown };

    expect(component.extraMenuOption()).toBeUndefined();
  });

  it('keeps breadcrumb title empty when digital object is not found', async () => {
    mockRouteDataSignal.set({});
    const noMatchKgService = {
      ...mockKgService,
      digitalObjects: jest.fn().mockReturnValue(
        of({
          '@graph': [
            {
              '@id': 'https://lod.humanatlas.io/ref-organ/lung',
              title: 'Lung Object',
            },
          ],
        }),
      ),
    };

    const { fixture } = await setup(noMatchKgService as unknown as HraKgService);
    const component = fixture.componentInstance as unknown as {
      params: { set: (value: string[]) => void };
      crumbs: () => { name: string; route?: string }[];
    };

    component.params.set(['ref-organ', 'heart']);
    fixture.detectChanges();

    expect(component.crumbs()).toEqual([
      { name: 'Apps', route: 'https://apps.humanatlas.io/' },
      { name: 'Knowledge Graph', route: '/' },
      { name: '' },
    ]);
  });

  it('sets remote endpoints when host attributes are present', async () => {
    mockRouteDataSignal.set({});
    jest.spyOn(HTMLElement.prototype, 'getAttribute').mockImplementation((name: string) => {
      if (name === 'remote-api-endpoint') {
        return 'https://api.example.org';
      }
      if (name === 'mirror-url') {
        return 'https://mirror.example.org';
      }
      return null;
    });

    await setup(mockKgService as unknown as HraKgService);

    expect(setRemoteApiEndpoint).toHaveBeenCalledWith('https://api.example.org');
    expect(setMirrorUrl).toHaveBeenCalledWith('https://mirror.example.org');
  });

  it('does not set remote endpoints when host attributes are absent', async () => {
    mockRouteDataSignal.set({});
    jest.spyOn(HTMLElement.prototype, 'getAttribute').mockImplementation(() => null);

    await setup(mockKgService as unknown as HraKgService);

    expect(setRemoteApiEndpoint).not.toHaveBeenCalled();
    expect(setMirrorUrl).not.toHaveBeenCalled();
  });
});
