import { CellSummaryModel } from './cell-summary.model';
import { CellSummarySelectors } from './cell-summary.selectors';

describe('CellSummarySelectors', () => {
  const state: CellSummaryModel = {
    summaries: [],
    aggregates: [],
  };

  it('should return the aggregate data from the state', () => {
    const result = CellSummarySelectors.aggregates(state);
    expect(result).toEqual(state.aggregates);
  });

  it('should return the summaries data from the state', () => {
    const result = CellSummarySelectors.summaries(state);
    expect(result).toEqual(state.summaries);
  });
});
