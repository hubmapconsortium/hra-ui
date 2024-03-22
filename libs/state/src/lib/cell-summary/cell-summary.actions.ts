import { ActionGroup } from '@hra-ui/cdk/state';
import { CellSummary, Iri } from '@hra-ui/services';
import { SourceListItem } from './cell-summary.model';

/** Action base class factory */
const Action = ActionGroup('CellSummary');

/** loads the given Iri to the state */
export class Load extends Action('Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

export class UpdateSummaries extends Action('Update Summaries') {
  /** Intializes the set iri */
  constructor(readonly summaries: CellSummary[]) {
    super();
  }
}

export class UpdateSources extends Action('Update Sources') {
  /** Intializes the set iri */
  constructor(readonly sources: SourceListItem[]) {
    super();
  }
}

/**
 * Compute aggregate of the given data and store to state */
export class ComputeAggregates extends Action('Compute Aggregates') {}

/**
 * Action to reset the current state */
export class Reset extends Action('Reset') {}
