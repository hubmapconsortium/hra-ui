import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import {
  SAMPLE_FILE_URL,
  TISSUE_ORIGIN_ENDPOINT,
  TissueOriginService,
  UserSelectionService,
} from './tissue-origin.service';
import { firstValueFrom } from 'rxjs';
import { IdLabelPair } from '@hra-api/ng-client';

describe('TissueOriginService', () => {
  const mockPredictions = {
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
    rui_locations: {
      '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
      '@graph': [],
    },
  };
  const csvFileContent = `
"tool","modality","percentage","count","cell_label","cell_id"
"azimuth","sc_transcriptomics","0.04605395883422269452","9590.049692","B","http://purl.obolibrary.org/obo/CL_0000236"
`;

  let httpTesting: HttpTestingController;
  let tissueOriginService: TissueOriginService;
  let userSelectionService: UserSelectionService;

  let endpoint: string;

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TissueOriginService, UserSelectionService, provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    tissueOriginService = TestBed.inject(TissueOriginService);
    userSelectionService = TestBed.inject(UserSelectionService);
    endpoint = TestBed.inject(TISSUE_ORIGIN_ENDPOINT);
  });

  it('should load predictions', async () => {
    const mockCSVFile = new File([csvFileContent], 'sample.csv', { type: 'text/csv' });
    if (!mockCSVFile.text) {
      mockCSVFile.text = jest.fn().mockResolvedValue(csvFileContent);
    }
    tissueOriginService.setFile(mockCSVFile);

    const expectedRequestBody = {
      csvString: csvFileContent,
      organ: '',
      tool: '',
    };

    const result = firstValueFrom(tissueOriginService.loadTissuePredictions());
    await wait(0);

    const req = httpTesting.expectOne(`${endpoint}/cell-summary-report`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedRequestBody);
    req.flush(mockPredictions);

    expect(await result).toEqual(mockPredictions);
  });

  it('should set sample CSV file', async () => {
    const mockCSVFile = new File([csvFileContent], 'sample.csv', { type: 'text/csv' });
    jest.spyOn(tissueOriginService, 'loadSampleFile').mockResolvedValue(mockCSVFile);
    const setFileSpy = jest.spyOn(tissueOriginService, 'setFile');

    await tissueOriginService.setSampleFile();

    expect(setFileSpy).toHaveBeenCalled();
    expect(setFileSpy).toHaveBeenCalledWith(mockCSVFile);
  });

  it('should load sample CSV file', async () => {
    const mockCSVFile = new File([csvFileContent], 'sample.csv', { type: 'text/csv' });

    const result = tissueOriginService.loadSampleFile();

    const req = httpTesting.expectOne(SAMPLE_FILE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(csvFileContent);

    expect(await result).toEqual(mockCSVFile);
  });

  it('should load supported tools', async () => {
    const mockSupportedTools: IdLabelPair[] = [
      { id: 'organ1', label: 'Organ 1' },
      { id: 'organ2', label: 'Organ 2' },
    ];

    const result = firstValueFrom(tissueOriginService.loadSupportedTools());
    await wait(0);

    const req = httpTesting.expectOne(`${endpoint}/supported-tools`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSupportedTools);

    expect(await result).toEqual(mockSupportedTools);
  });

  // UserSelection Service
  it('should be created', () => {
    expect(userSelectionService).toBeTruthy();
  });

  it('should update user selection', () => {
    const selectedOrganIri = 'heart';
    const selectedToolIri = 'azimuth';

    userSelectionService.updateSelection(selectedOrganIri, selectedToolIri);
    const selections = userSelectionService.getSelections();

    expect(selections.selectedOrganIri).toBe(selectedOrganIri);
    expect(selections.selectedToolIri).toBe(selectedToolIri);
  });

  it('should return empty selection object initially', () => {
    const selections = userSelectionService.getSelections();
    expect(selections).toEqual({});
  });

  it('should update selection when only organ is provided', () => {
    const selectedOrganIri = 'heart';
    userSelectionService.updateSelection(selectedOrganIri);

    const selections = userSelectionService.getSelections();
    expect(selections.selectedOrganIri).toBe(selectedOrganIri);
    expect(selections.selectedToolIri).toBeUndefined();
  });

  it('should update selection when only tool is provided', () => {
    const selectedToolIri = 'azimuth';
    userSelectionService.updateSelection(undefined, selectedToolIri);

    const selections = userSelectionService.getSelections();
    expect(selections.selectedOrganIri).toBeUndefined();
    expect(selections.selectedToolIri).toBe(selectedToolIri);
  });
});
