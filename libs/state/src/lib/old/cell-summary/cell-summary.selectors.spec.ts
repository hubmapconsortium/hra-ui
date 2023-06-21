import { CellSummaryModel } from './cell-summary.model';
import { CellSummarySelectors } from './cell-summary.selectors';
import { aggregateData, summariesData } from './cell-summary.spec';

describe('CellSummarySelectors', () => {
  const state: CellSummaryModel = {
    summaries: summariesData,
    aggregate: aggregateData,
  };

  describe('getAggregateData', () => {
    it('should return the aggregate data', () => {
      const aggregate = CellSummarySelectors.aggregates(state);
      expect(aggregate).toEqual(state.aggregate);
    });
  });

  describe('getSummariesData', () => {
    it('should return the summaries data', () => {
      const summaries = CellSummarySelectors.summaries(state);
      expect(summaries).toEqual(state.summaries);
    });
  });
});
