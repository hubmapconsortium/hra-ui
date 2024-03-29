import { ActionGroup } from '@hra-ui/cdk/state';
import { Iri, SourceReference } from '@hra-ui/services';

/** Action base class factory */
const Action = ActionGroup('CellSummary');

/** loads the given Iri to the state */
export class Load extends Action('Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

export class FilterSummaries extends Action('Filter Summaries') {
  constructor(readonly sources: SourceReference[]) {
    super();
  }
}

export class CombineSummariesByBiomarker extends Action('Combine Summaries by Biomarker') {}

/**
 * Compute aggregate of the given data and store to state */
export class ComputeAggregates extends Action('Compute Aggregates') {}

/**
 * Action to reset the current state */
export class Reset extends Action('Reset') {}
