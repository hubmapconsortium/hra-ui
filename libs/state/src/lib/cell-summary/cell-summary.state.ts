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
    const counts: { [key: string]: number } = {};

    entries.forEach((entry) => {
      const cellId = entry.cell.id;

      if (cellId in counts) {
        counts[cellId] += entry.count;
      } else {
        counts[cellId] = entry.count;
      }
    });

    return counts;
  }

  /** Returns an array of rows and columns based on an array of entries */
  getRowsAndColumns(entries: CellSummary[string]['entries'], counts: { [key: string]: number }) {
    // get columns which is string array of biomarkers
    const columns = Array.from(new Set(entries.map((entry) => entry.biomarker.id)));

    // array of rowItems with format [cellId, count, ...rowItems]
    const rows = [];
    for (const cellId in counts) {
      const count = counts[cellId];

      // get all entries with cellId
      const rowEntries = entries.filter((entry) => entry.cell.id === cellId);

      const rowItem: AggregateRow = [cellId, count];
      columns.forEach((col) => {
        // find the matching cell which is [cell.id, biomarker.id]
        const matchingEntry = rowEntries.find((entry) => entry.biomarker.id === col) as Cell;
        rowItem.push({
          color: '',
          size: 0,
          data: matchingEntry,
        });
      });

      rows.push(rowItem);
    }

    return [rows, columns];
  }
}
