import { Action } from '@hra-ui/cdk/state';
import { Iri, SourceReference } from '@hra-ui/services';

/** Loads the given Iri to the state */
export class Load extends Action('[CellSummary] Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

/** Filters summaries by sources */
export class FilterSummaries extends Action('[CellSummary] Filter Summaries') {
  /** Initializes */
  constructor(readonly sources: SourceReference[]) {
    super();
  }
}

/**
 * Action to combine summaries by biomarker
 */
export class CombineSummariesByBiomarker extends Action('[CellSummary] Combine Summaries by Biomarker') {}

/**
 * Compute aggregate of the given data and store to state */
export class ComputeAggregates extends Action('[CellSummary] Compute Aggregates') {}

/**
 * Action to reset the current state */
export class Reset extends Action('[CellSummary] Reset') {}
