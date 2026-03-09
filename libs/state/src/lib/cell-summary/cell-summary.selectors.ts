import { Selector } from '@ngxs/store';
import { CellSummary } from '@hra-ui/services';
import { CellSummaryModel, CellSummaryAggregate } from './cell-summary.model';
import { CellSummaryState } from './cell-summary.state';

/** Selectors for the CellSummary state */
export class CellSummarySelectors {
  /** Get the aggregate data from the state */
  @Selector([CellSummaryState])
  static aggregates(state: CellSummaryModel): CellSummaryAggregate[] {
    return state.aggregates;
  }

  /** Get the summaries data from the state */
  @Selector([CellSummaryState])
  static summaries(state: CellSummaryModel): CellSummary[] {
    return state.summaries;
  }

  /** Get the filtered summaries data from the state */
  @Selector([CellSummaryState])
  static filteredSummaries(state: CellSummaryModel): CellSummary[] {
    return state.filteredSummaries;
  }
}
