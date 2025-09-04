import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';
import * as mockDoData from './testing/mock-data.json';
import * as mockMetadata from './testing/mock-metadata.json';
import { DO_COLUMNS } from './app.routes';

jest.mock('@google/model-viewer', () => ({}));

describe('AppComponent', () => {
  const metadataColumns = [
    {
      column: 'provenance',
      label: 'Provenance',
      type: 'text',
    },
    {
      column: 'metadata',
      label: 'Metadata',
      type: 'markdown',
    },
  ];

  async function setup(kg: HraKgService) {
    return render(AppComponent, {
      providers: [
        { provide: HraKgService, useValue: kg },
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
                data: mockKgResolver,
                asctbTermOccurrences: mockAsctbResolver,
                ontologyTree: mockOntologyResolver,
                cellTypeTree: mockCellTypeResolver,
                biomarkerTree: mockBiomarkersResolver,
              },
            },
            {
              path: ':type/:name',
              component: MetadataPageComponent,
              data: {
                columns: metadataColumns,
              },
              resolve: {
                doData: mockKgResolver,
                metadata: mockMetadataResolver,
                documentationUrl: documentationUrlResolver,
                typeLabel: typeLabelResolver,
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

  const mockKgResolver = jest.fn().mockReturnValue(mockDoData);
  const mockAsctbResolver = jest.fn().mockReturnValue([]);
  const mockOntologyResolver = jest.fn().mockReturnValue({ root: '', nodes: [] });
  const mockCellTypeResolver = jest.fn().mockReturnValue({ root: '', nodes: [] });
  const mockBiomarkersResolver = jest.fn().mockReturnValue({ root: '', nodes: [] });

  const mockMetadataResolver = jest.fn().mockReturnValue(mockMetadata);
  const documentationUrlResolver = jest.fn().mockReturnValue('documentationurl');
  const typeLabelResolver = jest.fn().mockReturnValue('typelabel');

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
  };

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
