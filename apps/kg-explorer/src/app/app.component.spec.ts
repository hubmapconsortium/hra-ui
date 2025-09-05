import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
                data: kgResolver(''),
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
                doData: kgResolver(''),
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

  it('should render the component and compute breadcrumbs', async () => {
    const { fixture } = await setup(mockKgService as unknown as HraKgService);
    const component = fixture.componentInstance;
    component.params.set(['ref-organ', 'heart']);
    fixture.detectChanges();
    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Heart Object')).toBeInTheDocument();
  });

  it('uses default breadcrumbs if there are no params', async () => {
    await setup(mockKgService as unknown as HraKgService);

    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Knowledge Graph')).toBeInTheDocument();
  });
});
