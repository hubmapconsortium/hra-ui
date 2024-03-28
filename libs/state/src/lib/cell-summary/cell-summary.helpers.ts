import { Biomarker, Cell, CellSummary, CellSummaryRow, SourceReference } from '@hra-ui/services';
import { BIOMARKER_TYPES, CellSummaryAggregate, CellSummaryAggregateRow } from './cell-summary.model';

/**
 * This function gets the index of the column if it does not have any
 */
export function getColumnIndex(indexById: Map<string, number>, id: string): number {
  if (!indexById.has(id)) {
    indexById.set(id, indexById.size + 2);
  }

  return indexById.get(id) as number;
}

/**
 * This function gets the index of the row if it does not have any
 */
export function getRow(rowById: Map<string, CellSummaryAggregateRow>, id: string): CellSummaryAggregateRow {
  if (!rowById.has(id)) {
    rowById.set(id, ['', 0]);
  }

  return rowById.get(id) as CellSummaryAggregateRow;
}

/**
 * This function expands the current row length with undefined if its length is
 * less than the given length
 */
export function expandRow(row: CellSummaryAggregateRow, length: number): void {
  if (row.length < length) {
    const fillStart = row.length;
    row.length = length;
    row.fill(undefined, fillStart);
  }
}

/**
 * This function retrieves the label of an item from an array based on its ID,
 * and if not found, it returns a default string indicating the absence of a label for the specified item type.
 */
export function getLabel<T extends { id: string; label: string }>(items: T[], id: string, what: string): string {
  return items.find((item) => item.id === id)?.label ?? `<Unlabled ${what} '${id}'>`;
}

/**
 * This function calculates and returns the total count by iterating over a row array and summing
 * up the count property of each object entry, while ignoring non-object entries, with an initial value of 0.
 */
export function getTotalCount(row: CellSummaryAggregateRow): number {
  return row.reduce<number>((acc, entry) => acc + (typeof entry === 'object' ? entry.data.count : 0), 0);
}

/**
 * The computeAggregate function takes a summary object and performs aggregation operations on its properties
 */
export function computeAggregate(summary: CellSummary): CellSummaryAggregate {
  const { label, cells, biomarkers, summaries } = summary;
  const columnIndexByBiomarker = new Map<string, number>();
  const rowsByCell = new Map<string, CellSummaryAggregateRow>();

  for (const summary of summaries) {
    const { biomarker, cell } = summary;
    const columnIndex = getColumnIndex(columnIndexByBiomarker, biomarker);
    const row = getRow(rowsByCell, cell);

    expandRow(row, columnIndex);
    row[columnIndex] = {
      color: summary.meanExpression,
      size: summary.percentage,
      data: summary,
    };
  }

  for (const [cell, row] of rowsByCell.entries()) {
    row[0] = getLabel(cells, cell, 'cell');
    row[1] = getTotalCount(row);
  }

  const columns = Array.from(columnIndexByBiomarker.keys()).map((id) => getLabel(biomarkers, id, 'biomarker'));
  return { label, columns, rows: Array.from(rowsByCell.values()) };
}

export function filterSummaries(summaries: CellSummary[], sources: SourceReference[]): CellSummary[] {
  const sourceIds = new Set<string>(sources.map((source) => source.id));
  return summaries.filter((summary) => sourceIds.has(summary.cellSource));
}

export function calculateDatasetCount(id: string, countsList: Record<string, boolean>[]): number {
  let result = 0;
  for (const list of countsList) {
    if (list[id]) {
      result = result + 1;
    }
  }
  return result;
}

export function combineSummaries(summaries: CellSummary[]): CellSummary[] {
  return BIOMARKER_TYPES.map((type) => mergeCellSummaries(summaries, type));
}

export function mergeCellSummaries(summaries: CellSummary[], label: string): CellSummary {
  const filteredSummaries = summaries.filter((summary) => summary.label === label);
  const aggregateBiomarkers: Biomarker[] = [];
  const aggregateCells: Cell[] = [];
  const aggregateSummaries: CellSummaryRow[] = [];
  const summariesList: CellSummaryRow[][] = [];

  for (const summary of filteredSummaries) {
    for (const biomarker of summary.biomarkers) {
      aggregateBiomarkers.push(biomarker);
    }
    for (const cell of summary.cells) {
      aggregateCells.push(cell);
    }

    summariesList.push(summary.summaries);
    const countsList: Record<string, boolean>[] = [];
    for (const summaries of summariesList) {
      const datasetCounts: Record<string, boolean> = {};
      for (const sum of summaries) {
        const id = sum.cell + sum.biomarker;
        if (!datasetCounts[id]) {
          datasetCounts[id] = true;
        }
      }
      countsList.push(datasetCounts);
    }

    for (const sum of summary.summaries) {
      const match = aggregateSummaries.find((entry) => entry.biomarker === sum.biomarker && entry.cell === sum.cell);
      if (match) {
        const id = match.cell + match.biomarker;
        match.count += sum.count;
        match.meanExpression =
          (match.count * match.meanExpression + sum.count * sum.meanExpression) / (match.count + sum.count);
        match.dataset_count = calculateDatasetCount(id, countsList);
      } else {
        aggregateSummaries.push({ ...sum, dataset_count: 1 });
      }
    }
  }

  return {
    label: label,
    biomarkers: aggregateBiomarkers,
    cells: aggregateCells,
    summaries: aggregateSummaries,
    cellSource: '',
  };
}
