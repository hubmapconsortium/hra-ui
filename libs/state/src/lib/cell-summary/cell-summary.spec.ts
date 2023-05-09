import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ResourceRegistryState } from '@hra-ui/cdk/state';
import { MockTissueFtuService, TissueFtuService } from '@hra-ui/services';
import { NgxsModule, StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { ComputeAggregate, SetData } from './cell-summary.actions';
import { Aggregate, AggregateRowEntry, Cell, CellSummaryStateModel, GradientPoint } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

function createCell(cid: string, clabel: string, bid: string, blabel: string, count = 0, percentage = 0): Cell {
  return {
    cell: {
      id: cid,
      label: clabel,
    },
    biomarker: {
      id: bid,
      label: blabel,
    },
    count,
    percentage,
    metadata: [],
  };
}

function createAggregateEntry(data: Cell, size = 0, color = '#000000'): AggregateRowEntry {
  return { color, size, data: data.metadata };
}

export const summariesData = {
  summary1: {
    label: 'Summary 1',
    entries: [
      createCell('cell1', 'Cell 1', 'biomarker1', 'Biomarker 1', 10, 0.5),
      createCell('cell2', 'Cell 2', 'biomarker1', 'Biomarker 1', 5, 0.2),
      createCell('cell2', 'Cell 2', 'biomarker2', 'Biomarker 2', 5, 0.2),
      createCell('cell1', 'Cell 1', 'biomarker3', 'Biomarker 3', 15, 0.2),
    ],
  },
  summary2: {
    label: 'Summary 2',
    entries: [createCell('cell1', 'Cell 1', 'biomarker2', 'Biomarker 2', 20, 1)],
  },
};

export const aggregateData: Aggregate = {
  summary1: {
    label: 'Summary 1',
    columns: ['Biomarker 1', 'Biomarker 2', 'Biomarker 3'],
    rows: [
      [
        'Cell 1',
        25,
        createAggregateEntry(summariesData.summary1.entries[0], 2.6),
        undefined,
        createAggregateEntry(summariesData.summary1.entries[3], 3.4),
      ],
      [
        'Cell 2',
        10,
        createAggregateEntry(summariesData.summary1.entries[1], 3),
        createAggregateEntry(summariesData.summary1.entries[2], 3),
      ],
    ],
  },
  summary2: {
    label: 'Summary 2',
    columns: ['Biomarker 2'],
    rows: [['Cell 1', 20, createAggregateEntry(summariesData.summary2.entries[0], 5)]],
  },
};

describe('CellSummaryState', () => {
  let ctx: StateContext<CellSummaryStateModel>;
  let state: CellSummaryState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ResourceRegistryState]), HttpClientModule],
      providers: [{ provide: TissueFtuService, useExisting: MockTissueFtuService }],
    });

    ctx = mock<StateContext<CellSummaryStateModel>>();
    state = TestBed.runInInjectionContext(() => new CellSummaryState());
  });

  afterEach(() => jest.clearAllMocks());

  it('should set data', () => {
    const action = new SetData({});
    expect(action.data).toEqual({});
  });

  it('should compute aggregate data for the given summaries', () => {
    state.computeAggregate(ctx, new ComputeAggregate(summariesData));
    expect(ctx.patchState).toHaveBeenCalledWith({ aggregate: aggregateData });
  });

  it('should interpolate and get the color using the percentage', () => {
    const points: GradientPoint[] = [
      { color: '#edfafd', percentage: 0 },
      { color: '#d5e7ee', percentage: 0.1 },
      { color: '#a7bfcd', percentage: 0.3 },
      { color: '#47718e', percentage: 0.7 },
      { color: '#00385f', percentage: 1 },
    ];

    const expected = '#9BB5C5';

    const received = state.interpolateColor(points, 0.35);
    expect(received).toBe(expected);
  });

  describe('interpolateSize(...)', () => {
    it('should interpolate from the points', () => {
      const result = state.interpolateSize(
        [
          { label: '', radius: 0 },
          { label: '', radius: 10 },
        ],
        0.5
      );
      expect(result).toEqual(5);
    });
  });
});
