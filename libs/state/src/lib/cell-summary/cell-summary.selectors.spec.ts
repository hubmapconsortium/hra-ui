import { CellSummarySelectors } from './cell-summary.selectors';
import { CellSummaryStateModel } from './cell-summary.model';
import { aggregateData, summariesData } from './cell-summary.spec';

describe('CellSummarySelectors', () => {
  const state: CellSummaryStateModel = {
    summaries: summariesData,
    aggregate: aggregateData,
  };

  describe('getAggregateData', () => {
    it('should return the aggregate data', () => {
      const aggregate = CellSummarySelectors.aggregates(state);
      expect(aggregate).toEqual(Object.values(state.aggregate));
    });
  });

  describe('getSummariesData', () => {
    it('should return the summaries data', () => {
      const summaries = CellSummarySelectors.summaries(state);
      expect(summaries).toEqual(state.summaries);
    });
  });
});
