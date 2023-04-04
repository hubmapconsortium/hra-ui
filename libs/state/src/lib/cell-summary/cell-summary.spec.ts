import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { ComputeAggregate, SetData } from './cell-summary.actions';
import { AggregateRowEntry, Cell, CellSummaryStateModel } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

describe('CellSummaryState', () => {
  let ctx: StateContext<CellSummaryStateModel>;
  let state: CellSummaryState;

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
    };
  }

  function createAggregateEntry(data: Cell): AggregateRowEntry {
    return { color: '', size: 0, data };
  }

  beforeEach(() => {
    ctx = mock<StateContext<CellSummaryStateModel>>();
    state = new CellSummaryState();
  });

  afterEach(() => jest.clearAllMocks());

  it('should set data', () => {
    const data = { foo: 'bar' };
    const action = new SetData(data);
    expect(action.data).toEqual(data);
  });

  it('should compute aggregate data for the given summaries', () => {
    const summaries = {
      summary1: {
        label: 'Summary 1',
        entries: [
          createCell('cell1', 'Cell 1', 'biomarker1', 'Biomarker 1', 10, 50),
          createCell('cell2', 'Cell 2', 'biomarker1', 'Biomarker 1', 5, 20),
          createCell('cell2', 'Cell 2', 'biomarker2', 'Biomarker 2', 5, 20),
          createCell('cell1', 'Cell 1', 'biomarker3', 'Biomarker 3', 15, 10),
        ],
      },
      summary2: {
        label: 'Summary 2',
        entries: [createCell('cell1', 'Cell 1', 'biomarker2', 'Biomarker 2', 20, 100)],
      },
    };

    const expectedAggregate = {
      summary1: {
        label: 'Summary 1',
        columns: ['Biomarker 1', 'Biomarker 2', 'Biomarker 3'],
        rows: [
          [
            'Cell 1',
            25,
            createAggregateEntry(summaries.summary1.entries[0]),
            undefined,
            createAggregateEntry(summaries.summary1.entries[3]),
          ],
          [
            'Cell 2',
            10,
            createAggregateEntry(summaries.summary1.entries[1]),
            createAggregateEntry(summaries.summary1.entries[2]),
          ],
        ],
      },
      summary2: {
        label: 'Summary 2',
        columns: ['Biomarker 2'],
        rows: [['Cell 1', 20, createAggregateEntry(summaries.summary2.entries[0])]],
      },
    };

    state.computeAggregate(ctx, new ComputeAggregate(summaries));
    expect(ctx.patchState).toHaveBeenCalledWith({ aggregate: expectedAggregate });
  });
});
