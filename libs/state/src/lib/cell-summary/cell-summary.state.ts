import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ComputeAggregate } from './cell-summary.actions';
import { Aggregate, AggregateRow, Cell, CellSummary, CellSummaryStateModel } from './cell-summary.model';

/** State handling cell summary data */
@State<CellSummaryStateModel>({
  name: 'cellsummary',
  defaults: {
    summaries: {},
    aggregate: {},
  },
})
@Injectable()
export class CellSummaryState {
  /**
   * computes aggregate data and stores in the current state
   */
  @Action(ComputeAggregate)
  computeAggregate(ctx: StateContext<CellSummaryStateModel>, action: ComputeAggregate) {
    const summaries = action.summaries;
    const aggregateData: Aggregate = {};

    for (const key in summaries) {
      const label = summaries[key].label;
      const entries = summaries[key].entries;

      const counts = this.getCellCountMap(entries);

      const [rows, columns] = this.getRowsAndColumns(entries, counts);

      aggregateData[key] = {
        label: label,
        columns: columns as string[],
        rows: rows as AggregateRow[],
      };
    }

    ctx.patchState({
      aggregate: aggregateData,
    });
  }

  /** Gets a count of the number of occurrences of each unique cellId in an array of entries,
   * and returns an object mapping each cellId to its corresponding count. */
  private getCellCountMap(entries: CellSummary[string]['entries']) {
    return entries.reduce<Record<string, number>>((res, { cell: { id }, count }) => {
      res[id] = res[id] ? res[id] + count : count;
      return res;
    }, {});
  }

  /** Returns an array of rows and columns based on an array of entries */
  getRowsAndColumns(
    entries: CellSummary[string]['entries'],
    counts: { [key: string]: number }
  ): [rows: AggregateRow[], columns: string[]] {
    const columns: string[] = [];
    const columnIndices: Record<string, number> = {};
    const rows: Record<string, AggregateRow> = {};

    for (const entry of entries) {
      const {
        cell: { id: rowId, label: rowLabel },
        biomarker: { id: columnId, label: columnLabel },
        count,
        percentage,
      } = entry;

      if (!(columnId in columnIndices)) {
        columnIndices[columnId] = columns.length + 2;
        columns.push(columnLabel);
      }
      const columnIndex = columnIndices[columnId];

      if (!(rowId in rows)) {
        rows[rowId] = [rowLabel, counts[rowId]];
      }
      const row = rows[rowId];

      if (row.length < columnIndex) {
        const start = row.length;
        row.length = columnIndex + 1;
        row.fill(undefined, start);
      }

      row[columnIndex] = {
        color: '',
        size: 0,
        data: entry,
      };
    }

    return [Object.values(rows), columns];
  }
}
