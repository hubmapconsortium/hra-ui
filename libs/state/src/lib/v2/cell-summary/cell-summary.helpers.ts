import { CellSummary } from '@hra-ui/services';
import { CellSummaryAggregate } from './cell-summary.model';

export function computeAggregate(summary: CellSummary): CellSummaryAggregate {
  const { label, cells, biomarkers, summaries } = summary;
  // const columnByBiomarker = new Map<string, number>();
  // const rowsByCell = new Map<string, CellSummaryAggregateRow>();
  // TODO
}
