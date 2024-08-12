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

export function combineSummariesByBiomarkerType(summaries: CellSummary[], types: string[]): CellSummary[] {
  const summariesByBiomarkerType: Record<string, CellSummary[]> = {};
  for (const summary of summaries) {
    summariesByBiomarkerType[summary.biomarker_type] ??= [];
    summariesByBiomarkerType[summary.biomarker_type].push(summary);
  }

  const results: CellSummary[] = [];
  for (const type of types) {
    const summaries = summariesByBiomarkerType[type] ?? [];
    const items = summaries.reduce<CellSummary['summary']>((acc, { summary }) => acc.concat(summary), []);
    results.push({
      cell_source: `Aggregated by ${type}` as Iri,
      biomarker_type: type,
      summary: items,
    });
  }

  return results;
}

type SummaryColumnObj = CellSummary['summary'][number]['genes'][number];
type SummaryRowObj = CellSummary['summary'][number];

class AggregateBuilderState {
  private readonly columnIndex = new Map<string, number>();
  private readonly rowIndex = new Map<string, number>();
  private readonly columns: string[] = [];
  private readonly rows: CellSummaryAggregateRow[] = [];

  updateRowCount(rowObj: SummaryRowObj): void {
    const row = this.getRow(rowObj);
    (row[1] as number) += rowObj.count;
  }

  updateEntry(rowObj: SummaryRowObj, columnObj: SummaryColumnObj): void {
    const row = this.getRow(rowObj);
    const index = this.getColumnIndex(columnObj);
    const entry = (row[index] ??= {
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
    }) as CellSummaryAggregateCell;

    // Update count
    entry.data.count += rowObj.count;

    // Update meanExpression
    const { dataset_count: count = 0, meanExpression } = entry.data;
    const cumulativeMeanExpression = (count * meanExpression + columnObj.mean_expression) / (count + 1);
    entry.data.dataset_count = count + 1;
    entry.data.meanExpression = cumulativeMeanExpression;
    entry.color = cumulativeMeanExpression;
  }

  finalize(): { columns: string[]; rows: CellSummaryAggregateRow[] } {
    const { columns, rows } = this;
    const totalCount = rows.reduce((acc, row) => acc + (row[1] ?? 0), 0);
    for (const entry of this.entries()) {
      const percentage = entry.data.count / totalCount;
      entry.size = entry.data.percentage = percentage;
    }

    return { columns, rows };
  }

  private getColumnIndex(obj: SummaryColumnObj): number {
    const { columnIndex, columns } = this;
    let index = columnIndex.get(obj.gene_id);
    if (index === undefined) {
      index = columnIndex.size + 2;
      columnIndex.set(obj.gene_id, index);
      columns.push(obj.gene_label);
    }

    return index;
  }

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

export function computeAggregate(summary: CellSummary): CellSummaryAggregate {
  const state = new AggregateBuilderState();
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
