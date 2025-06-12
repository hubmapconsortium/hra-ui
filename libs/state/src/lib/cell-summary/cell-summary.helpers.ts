import { CellSummary, Iri, SourceReference } from '@hra-ui/services';
import { CellSummaryAggregate, CellSummaryAggregateCell, CellSummaryAggregateRow } from './cell-summary.model';

/** Capitalizes the first character */
function capitalize(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

/**
 * Returns summaries with ids that are included in a source reference array
 */
export function filterSummaries(summaries: CellSummary[], sources: SourceReference[]): CellSummary[] {
  const sourceIds = new Set<string>(sources.map((source) => source.id));
  return summaries.filter((summary) => sourceIds.has(summary.cell_source));
}

/**
 * Combines multiple summaries into one per biomarker type
 *
 * @param summaries Summaries
 * @param types Biomarker types
 * @returns One summary for each biomarker type
 */
export function combineSummariesByBiomarkerType(summaries: CellSummary[], types: string[]): CellSummary[] {
  const summariesByBiomarkerType: Record<string, CellSummary[]> = {};
  for (const summary of summaries) {
    summariesByBiomarkerType[summary.biomarker_type] ??= [];
    summariesByBiomarkerType[summary.biomarker_type].push(summary);
  }

  const results: CellSummary[] = [];
  for (const type of types) {
    const summariesByType = summariesByBiomarkerType[type] ?? [];
    const items = summariesByType.reduce<CellSummary['summary']>((acc, { summary }) => acc.concat(summary), []);
    results.push({
      cell_source: `Aggregated by ${type}` as Iri,
      biomarker_type: type,
      summary: items,
    });
  }

  return results;
}

/** Column object */
type SummaryColumnObj = CellSummary['summary'][number]['genes'][number];
/** Row object */
type SummaryRowObj = CellSummary['summary'][number];

/** Helper class for building aggregate summaries */
export class AggregateBuilder {
  /** Mapping from column id to index */
  private readonly columnIndex = new Map<string, number>();
  /** Mapping from row id to index */
  private readonly rowIndex = new Map<string, number>();
  /** Column labels */
  private readonly columns: string[] = [];
  /** Aggregate rows */
  private readonly rows: CellSummaryAggregateRow[] = [];

  /**
   * Update the cell count for a row
   * @param rowObj Raw row object
   */
  updateRowCount(rowObj: SummaryRowObj): void {
    const row = this.getRow(rowObj);
    (row[1] as number) += rowObj.count;
  }

  /**
   * Update the entry corresponding to the row/column objects
   *
   * @param rowObj Raw row object
   * @param columnObj Raw column object
   */
  updateEntry(rowObj: SummaryRowObj, columnObj: SummaryColumnObj): void {
    const row = this.getRow(rowObj);
    const index = this.getColumnIndex(columnObj);
    row[index] ??= {
      color: 0,
      size: 0,
      data: {
        cell: rowObj.cell_id,
        biomarker: columnObj.gene_id,
        count: 0,
        meanExpression: 0,
        percentage: 0,
        dataset_count: 0,
      },
    };

    const entry = row[index] as CellSummaryAggregateCell;

    // Update count
    entry.data.count += rowObj.count;

    // Update meanExpression
    const { dataset_count: count = 0, meanExpression } = entry.data;
    const cumulativeMeanExpression = (count * meanExpression + columnObj.mean_expression) / (count + 1);
    entry.data.dataset_count = count + 1;
    entry.data.meanExpression = cumulativeMeanExpression;
    entry.color = cumulativeMeanExpression;
  }

  /**
   * Runs the final computations and returns the result
   *
   * @returns The finalized rows and columns
   */
  finalize(): { columns: string[]; rows: CellSummaryAggregateRow[] } {
    const { columns, order } = this.sortColumns();
    const rows = this.sortRows(order);
    const totalCount = rows.reduce((acc, row) => acc + (row[1] ?? 0), 0);
    for (const entry of this.entries()) {
      const percentage = entry.data.count / totalCount;
      entry.size = entry.data.percentage = percentage;
    }

    return { columns, rows };
  }

  /**
   * Get the index for a column object. Adds a new column if necessary.
   *
   * @param obj Raw column object
   * @returns The associated index
   */
  private getColumnIndex(obj: SummaryColumnObj): number {
    const { columnIndex, columns } = this;
    const id = `${obj.gene_id}/${obj.ensemble_id}`;
    let index = columnIndex.get(id);
    if (index === undefined) {
      index = columnIndex.size + 2;
      columnIndex.set(id, index);
      columns.push(`${obj.gene_label} [${obj.ensemble_id}]`);
    }

    return index;
  }

  /**
   * Gets the row for a row object. Adds a new row if necessary.
   *
   * @param obj Raw row object
   * @returns The associated row
   */
  private getRow(obj: SummaryRowObj): CellSummaryAggregateRow {
    const { rowIndex, rows } = this;
    let index = rowIndex.get(obj.cell_id);
    if (index === undefined) {
      index = rows.length;
      rowIndex.set(obj.cell_id, index);
      rows.push([obj.cell_label, 0]);
    }

    return rows[index];
  }

  /**
   * Sorts the columns
   *
   * @returns The sorted columns and an array with the new index order
   */
  private sortColumns(): { columns: string[]; order: number[] } {
    const { columns } = this;
    const indexedColumns = columns.map((col, index) => [index + 2, col] as const);
    indexedColumns.sort((a, b) => (a[1] <= b[1] ? -1 : 1));
    return {
      columns: indexedColumns.map((item) => item[1]),
      order: indexedColumns.map((item) => item[0]),
    };
  }

  /**
   * Sorts the row data
   *
   * @param order The new column order
   * @returns Rows with data sorted in the new column order
   */
  private sortRows(order: number[]): CellSummaryAggregateRow[] {
    return this.rows.map((row) => {
      const sorted: CellSummaryAggregateRow = [row[0], row[1]];
      for (let index = 2; index < row.length; index++) {
        if (row[index] !== undefined) {
          const newIndex = order[index - 2];
          sorted[newIndex] = row[index];
        }
      }

      return sorted;
    });
  }

  /**
   * Iterates of all defined aggregate entries
   */
  private *entries(): Generator<CellSummaryAggregateCell> {
    for (const row of this.rows) {
      for (let index = 2; index < row.length; index++) {
        if (row[index] !== undefined) {
          yield row[index] as CellSummaryAggregateCell;
        }
      }
    }
  }
}

/**
 * Aggregates cell summaries for display in a table
 *
 * @param summary Raw cell summaries
 * @returns Aggregated cell summary rows
 */
export function computeAggregate(summary: CellSummary): CellSummaryAggregate {
  const state = new AggregateBuilder();
  for (const cell of summary.summary) {
    state.updateRowCount(cell);
    for (const gene of cell.genes) {
      state.updateEntry(cell, gene);
    }
  }

  return {
    label: `${capitalize(summary.biomarker_type)} Biomarkers`,
    ...state.finalize(),
  };
}
