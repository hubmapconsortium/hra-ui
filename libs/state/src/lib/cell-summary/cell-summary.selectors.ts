import { Selector } from '@ngxs/store';
import { Aggregate, CellSummaryStateModel } from './cell-summary.model';
import { CellSummary } from './cell-summary.model';

/** selectors for the CellSummary state */
export class CellSummarySelectors {
  /** get the aggregate data from the state */
  @Selector()
  static getAggregateData(state: CellSummaryStateModel): Aggregate {
    return state.aggregate;
  }

  /** get the summaries data from the state */
  @Selector()
  static getSummariesData(state: CellSummaryStateModel): CellSummary {
    return state.summaries;
  }
}
