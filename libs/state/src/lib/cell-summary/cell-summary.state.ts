import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { z } from 'zod';
import { ComputeAggregate } from './cell-summary.actions';
import { AggregateRow, CellSummaryStateModel, CELL_SUMMARY_AGGREGATE_SCHEMA } from './cell-summary.model';

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
    const aggregateData: z.infer<typeof CELL_SUMMARY_AGGREGATE_SCHEMA> = {};

    for (const key in summaries) {
      const label = summaries[key].label;
      const entries = summaries[key].entries;

      const counts: { [key: string]: number } = {};

      entries.forEach((entry) => {
        const cellId = entry.cell.id;

        if (cellId in counts) {
          counts[cellId] += entry.count;
        } else {
          counts[cellId] = entry.count;
        }
      });

      const columns = Array.from(new Set(entries.map((entry) => entry.biomarker.id)));
      const rows = Object.entries(counts).map(([cellId, count]) => {
        const rowEntries = entries.filter((entry) => entry.cell.id === cellId);
        const rowItems = columns.map((col) => {
          const matchingEntry = rowEntries.find((entry) => entry.biomarker.id === col);
          return {
            color: '',
            size: 0,
            data: matchingEntry,
          };
        });
        return [cellId, count, ...rowItems.filter((item) => item !== null)];
      });

      aggregateData[key] = {
        label: label,
        columns: columns,
        rows: rows as AggregateRow[],
      };
    }

    ctx.patchState({
      aggregate: aggregateData,
    });
  }
}
