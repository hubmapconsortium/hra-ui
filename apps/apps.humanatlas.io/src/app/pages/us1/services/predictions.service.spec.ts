import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PredictionsService, PREDICTIONS_ENDPOINT, SupportedOrgans } from './predictions.service';
import { firstValueFrom } from 'rxjs';

describe('PredictionsService', () => {
  const mockPredictions = [
    {
      tool: 'azimuth',
      modality: 'sc_transcriptomics',
      cell_id: 'http://purl.obolibrary.org/obo/CL_0000113',
      cell_label: 'Cycling Mononuclear Phagocyte',
      count: 7.632667999999999,
      percentage: 0.00000433948095483701,
    },
    {
      tool: 'azimuth',
      modality: 'sc_transcriptomics',
      cell_id: 'http://purl.obolibrary.org/obo/CL_0000775',
      cell_label: 'Neutrophil',
      count: 10.328336,
      percentage: 0.00000587207741344933,
    },
  ];

  let httpTesting: HttpTestingController;
  let service: PredictionsService;
  let endpoint: string;

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictionsService, provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PredictionsService);
    endpoint = TestBed.inject(PREDICTIONS_ENDPOINT);
  });

  it('should load predictions', async () => {
    const mockFileContent = JSON.stringify({ data: JSON.stringify(mockPredictions) });
    const mockFile = new File([mockFileContent], 'sample.json');
    if (!mockFile.text) {
      mockFile.text = jest.fn().mockResolvedValue(mockFileContent);
    }

    service.setFile(mockFile);

    const result = firstValueFrom(service.loadPredictions());
    await wait(0);

    const req = httpTesting.expectOne(`${endpoint}/rui-location-cell-summary`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.parse(mockFileContent));
    req.flush(mockPredictions);

    expect(await result).toEqual(mockPredictions);
  });

  it('should load supported reference organs', async () => {
    const mockOrgans: SupportedOrgans[] = [
      { id: 'organ1', label: 'Organ 1' },
      { id: 'organ2', label: 'Organ 2' },
    ];

    const result = firstValueFrom(service.loadSupportedReferenceOrgans());
    await wait(0);

    const req = httpTesting.expectOne(`${endpoint}/supported-reference-organs`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrgans);

    expect(await result).toEqual(mockOrgans.map((organ) => organ.id));
  });
});
