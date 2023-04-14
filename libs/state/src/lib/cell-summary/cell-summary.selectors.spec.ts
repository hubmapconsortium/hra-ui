import { CellSummarySelectors } from './cell-summary.selectors';
import { Aggregate, AggregateRowEntry, Cell, CellSummaryStateModel } from './cell-summary.model';

describe('CellSummarySelectors', () => {
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

  const aggregate: Aggregate = {
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

  const state: CellSummaryStateModel = {
    summaries: summaries,
    aggregate: aggregate,
  };

  describe('getAggregateData', () => {
    it('should return the aggregate data', () => {
      const aggregate = CellSummarySelectors.getAggregateData(state);
      expect(aggregate).toEqual(state.aggregate);
    });
  });

  describe('getSummariesData', () => {
    it('should return the summaries data', () => {
      const summaries = CellSummarySelectors.getSummariesData(state);
      expect(summaries).toEqual(state.summaries);
    });
  });
});
