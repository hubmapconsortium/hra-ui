import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { CellSummaryReport } from '@hra-api/ng-client';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { SimilarDatasetsTableComponent } from './similar-datasets-table.component';

describe('SimilarAnatomicalStructuresTableComponent', () => {
  const MOCK_PREDICTION: CellSummaryReport = {
    rui_locations: [],
    sources: [
      {
        cell_source: 'http://purl.org/ccf/',
        cell_source_type: 'http://purl.org/ccf/Dataset',
        cell_source_label: '',
        cell_source_link: '',
        tool: 'azimuth',
        modality: '',
        similarity: 0.5,
      },
    ],
  };
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should create', async () => {
    const result = render(SimilarDatasetsTableComponent, {
      providers,
      inputs: { predictions: MOCK_PREDICTION },
    });
    await expect(result).resolves.toBeTruthy();
  });

  it('downloads CSV file when user clicks on download CSV button', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(SimilarDatasetsTableComponent, {
      providers,
      inputs: { predictions: MOCK_PREDICTION },
    });
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const menu = await loader.getHarness(MatMenuHarness.with({ selector: '.similar-datasets-menu-trigger' }));

    await menu.clickItem({ text: /CSV/i });
    const snackbar = await loader.getHarnessOrNull(MatSnackBarHarness);

    expect(snackbar).toBeDefined();
    expect(screen.queryByText(/File downloaded/)).toBeDefined();
  });
});
