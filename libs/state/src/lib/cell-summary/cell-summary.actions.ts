import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';
import { CellSummaryModel } from './cell-summary.model';

/** Base action factory */
const Action = ActionGroup('CellSummary');

/** Set data to store */
export class SetData extends Action('SetData') {
  /**
   * Defines the SetData action, which sets data to the store.
   * @param data - The data to set to the store.
   */
  constructor(readonly data: object) {
    super();
  }
}

export class Load extends Action('Load') {
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Compute aggregate of the given data and store to state */
export class ComputeAggregate extends Action('ComputeAggregate') {
  /**
   * Defines the ComputeAggregate action, which computes aggregate data for the given summaries.
   * @param summaries - The cell summary data to compute aggregate for.
   */
  constructor(readonly summaries: CellSummaryModel) {
    super();
  }
}

export class Reset extends Action('Reset') {}
