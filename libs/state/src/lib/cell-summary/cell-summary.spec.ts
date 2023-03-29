import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { ComputeAggregate, SetData } from './cell-summary.actions';
import { CellSummaryStateModel } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

describe('CellSummaryState', () => {
  let ctx: StateContext<CellSummaryStateModel>;
  let state: CellSummaryState;

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
          {
            cell: {
              label: 'Cell 1',
              id: 'cell1',
            },
            biomarker: {
              label: 'Biomarker 1',
              id: 'biomarker1',
            },
            count: 10,
            percentage: 50,
          },
          {
            cell: {
              label: 'Cell 2',
              id: 'cell2',
            },
            biomarker: {
              label: 'Biomarker 1',
              id: 'biomarker1',
            },
            count: 5,
            percentage: 25,
          },
          {
            cell: {
              label: 'Cell 2',
              id: 'cell2',
            },
            biomarker: {
              label: 'Biomarker 2',
              id: 'biomarker2',
            },
            count: 5,
            percentage: 25,
          },
        ],
      },
      summary2: {
        label: 'Summary 2',
        entries: [
          {
            cell: {
              label: 'Cell 1',
              id: 'cell1',
            },
            biomarker: {
              label: 'Biomarker 2',
              id: 'biomarker2',
            },
            count: 20,
            percentage: 100,
          },
        ],
      },
    };

    const expectedAggregate = {
      summary1: {
        label: 'Summary 1',
        columns: ['Biomarker 1', 'Biomarker 2'],
        rows: [
          ['Cell 1', 10, { color: '', size: 0, data: summaries.summary1.entries[0] }],
          [
            'Cell 2',
            10,
            { color: '', size: 0, data: summaries.summary1.entries[1] },
            { color: '', size: 0, data: summaries.summary1.entries[2] },
          ],
        ],
      },
      summary2: {
        label: 'Summary 2',
        columns: ['Biomarker 2'],
        rows: [['Cell 1', 20, { color: '', size: 0, data: summaries.summary2.entries[0] }]],
      },
    };

    state.computeAggregate(ctx, new ComputeAggregate(summaries));
    expect(ctx.patchState).toHaveBeenCalledWith({ aggregate: expectedAggregate });
  });
});
