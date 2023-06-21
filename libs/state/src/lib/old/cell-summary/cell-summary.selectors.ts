import { Selector } from '@ngxs/store';
import { CellSummary } from '@hra-ui/services';
import { CellSummaryModel, CellSummaryAggregate } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

/** selectors for the CellSummary state */
export class CellSummarySelectors {
  /** get the aggregate data from the state */
  @Selector([CellSummaryState])
  static aggregates(state: CellSummaryModel): CellSummaryAggregate[] {
    return state.aggregates;
  }

  /** get the summaries data from the state */
  @Selector([CellSummaryState])
  static summaries(state: CellSummaryModel): CellSummary[] {
    return state.summaries;
  }
}
