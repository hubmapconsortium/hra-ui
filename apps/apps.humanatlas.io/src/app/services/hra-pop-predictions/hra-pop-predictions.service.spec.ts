import { TestBed } from '@angular/core/testing';

import { HraPopPredictionsService } from './hra-pop-predictions.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

const MOCK_TISSUE_PREDICTIONS = {
  sources: [
    {
      cell_source: 'http://purl.org/ccf/1.5/f1790d4b-bbc0-434c-b8ed-f21e8b8be903',
      cell_source_type: 'http://purl.org/ccf/SpatialEntity',
      cell_source_label: null,
      cell_source_link: null,
      tool: 'azimuth',
      modality: 'sc_transcriptomics',
      similarity: 0.48972270959827124,
    },
  ],
  rui_locations: {},
};
const MOCK_CELL_PREDICTIONS = [
  {
    tool: 'azimuth',
    modality: 'sc_transcriptomics',
    cell_id: 'http://purl.obolibrary.org/obo/CL_0000113',
    cell_label: 'Cycling Mononuclear Phagocyte',
    count: 7.632667999999999,
    percentage: 0.00000433948095483701,
  },
];
const ENDPOINT = 'https://apps.humanatlas.io/api/hra-pop';

describe('HraPopPredictionsService', () => {
  let service: HraPopPredictionsService;
  let httpTesting: HttpTestingController;

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HraPopPredictionsService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(HraPopPredictionsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should get cell population predictions', async () => {
    const mockFileContent = JSON.stringify({ data: JSON.stringify(MOCK_CELL_PREDICTIONS) });
    const mockFile = new File([mockFileContent], 'sample.json');
    if (!mockFile.text) {
      mockFile.text = jest.fn().mockResolvedValue(mockFileContent);
    }
    const data = {
      file: mockFile,
      organ: 'heart',
      tool: 'azimuth',
    };

    const result = firstValueFrom(service.getCellPopulationPredictions(data));
    await wait(0);

    const req = httpTesting.expectOne(`${ENDPOINT}/rui-location-cell-summary`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.parse(mockFileContent));
    req.flush(MOCK_CELL_PREDICTIONS);

    expect(await result).toEqual(MOCK_CELL_PREDICTIONS);
  });

  it('should get tissue predictions', async () => {
    const mockCSVFile = new File([''], 'sample.csv', { type: 'text/csv' });
    if (!mockCSVFile.text) {
      mockCSVFile.text = jest.fn().mockResolvedValue('');
    }
    const data = { file: mockCSVFile };
    const expectedRequestBody = {
      csvString: '',
      organ: undefined,
      tool: undefined,
    };

    const result = firstValueFrom(service.getTissuePredictions(data));
    await wait(0);

    const req = httpTesting.expectOne(`${ENDPOINT}/cell-summary-report`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedRequestBody);
    req.flush(MOCK_TISSUE_PREDICTIONS);
    expect(await result).toEqual(MOCK_TISSUE_PREDICTIONS);
  });
});
