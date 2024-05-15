import { TestBed } from '@angular/core/testing';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FtuDataService, Iri, SourceReference } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { calledWithFn, mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';

import { ActiveFtuSelectors } from '../active-ftu';
import { FilterSummaries, Load } from './cell-summary.actions';
import { CellSummaryModel } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';
import { filterSummaries } from './cell-summary.helpers';

jest.mock('@hra-ui/cdk/injectors');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

describe('CellSummaryState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  const sourceReferences: SourceReference[] = [
    {
      id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
      title: 'Kidney Precision Medicine Project',
      label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
      link: 'google.com',
      authors: [],
      year: -1,
      doi: '',
    },
    {
      id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
      title: '[Dataset Owner Title]',
      label: '<Dataset Title + Link to Dataset>',
      link: 'google.com',
      authors: [],
      year: -1,
      doi: '',
    },
  ];
  let state: CellSummaryState;
  let ctx: MockProxy<StateContext<CellSummaryModel>>;
  let dataService: MockProxy<FtuDataService>;

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(dispatch).mockReturnValue(jest.fn());

    selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);

    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });
    state = TestBed.runInInjectionContext(() => new CellSummaryState());
    dataService.getCellSummaries.mockReturnValue(of([]));
    ctx = mock();

    ctx.getState.mockReturnValue({
      summaries: [],
      aggregates: [],
      biomarkerTypes: [],
      filteredSummaries: [],
      summariesByBiomarker: [],
    });
  });

  describe('load(ctx, action)', () => {
    it('should load the correct iri', () => {
      state.load(ctx, new Load(testIri));
      expect(dataService.getCellSummaries).toHaveBeenCalledWith(testIri);
    });

    it('should load the cell summaries', () => {
      const summaries: never[] = [];
      dataService.getCellSummaries.mockReturnValue(of(summaries));
      state.load(ctx, new Load(testIri)).subscribe();
      expect(ctx.patchState).toHaveBeenCalledWith({
        summaries: summaries,
        filteredSummaries: [],
        aggregates: [],
        summariesByBiomarker: [],
      });
    });
  });

  describe('filterSummaries(ctx, action)', () => {
    it('should filter summaries by source references', () => {
      const summaries: never[] = [];
      dataService.getCellSummaries.mockReturnValue(of(summaries));
      state.filterSummaries(ctx, new FilterSummaries(sourceReferences));
      expect(ctx.patchState).toHaveBeenCalledWith({ filteredSummaries: filterSummaries(summaries, sourceReferences) });
    });
  });

  describe('combineSummariesByBiomarker(ctx, action)', () => {
    it('should combine summaries into cell summaries grouped by biomarker type', () => {
      const summaries: never[] = [];
      dataService.getCellSummaries.mockReturnValue(of(summaries));
      state.combineSummariesByBiomarker(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({
        summariesByBiomarker: [
          { biomarkers: [], cellSource: '', cells: [], label: 'Gene Biomarkers', summaries: [] },
          { biomarkers: [], cellSource: '', cells: [], label: 'Protein Biomarkers', summaries: [] },
          { biomarkers: [], cellSource: '', cells: [], label: 'Lipid Biomarkers', summaries: [] },
        ],
      });
    });
  });

  describe('computeAggregates', () => {
    it('should compute aggregrate data and update state', () => {
      ctx.getState.mockReturnValue({
        summaries: [],
        aggregates: [],
        biomarkerTypes: [],
        filteredSummaries: [],
        summariesByBiomarker: [],
      });
      state.computeAggregates(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ aggregates: [] });
    });
  });

  describe('reset', () => {
    it('should reset summaries and aggregates', () => {
      state.reset(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({
        summaries: [],
        filteredSummaries: [],
        aggregates: [],
        summariesByBiomarker: [],
      });
    });
  });
});
