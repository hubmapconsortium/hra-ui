import { CellSummary } from '@hra-ui/services';
import { CellSummaryAggregate, CellSummaryAggregateRow } from './cell-summary.model';

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
    row[columnIndex] = { color: '', size: 0, data: summary };
  }

  for (const [cell, row] of rowsByCell.entries()) {
    row[0] = getLabel(cells, cell, 'cell');
    row[1] = getTotalCount(row);

    // TODO update entries with interpolation etc.
  }

  const columns = Array.from(columnIndexByBiomarker.keys()).map((id) => getLabel(biomarkers, id, 'biomarker'));
  return { label, columns, rows: Array.from(rowsByCell.values()) };
}
