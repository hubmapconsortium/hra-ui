import { Selector } from '@ngxs/store';
import { Aggregate, CellSummaryStateModel, CellSummary } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

/** selectors for the CellSummary state */
export class CellSummarySelectors {
  /** get the aggregate data from the state */
  @Selector([CellSummaryState])
  static aggregates(state: CellSummaryStateModel): Aggregate {
    return state.aggregate;
  }

  /** get the summaries data from the state */
  @Selector([CellSummaryState])
  static summaries(state: CellSummaryStateModel): CellSummary {
    return state.summaries;
  }
}
