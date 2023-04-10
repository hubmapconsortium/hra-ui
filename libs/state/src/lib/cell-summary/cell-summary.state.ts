import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ComputeAggregate } from './cell-summary.actions';
import { Aggregate, AggregateRow, CellSummary, CellSummaryStateModel, GradientPoint } from './cell-summary.model';

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
  computeAggregate(ctx: StateContext<CellSummaryStateModel>, action: ComputeAggregate): void {
    const summaries = action.summaries;
    const aggregateData: Aggregate = {};

    for (const key in summaries) {
      const label = summaries[key].label;
      const entries = summaries[key].entries;

      const counts = this.getCellCountMap(entries);

      const [rows, columns] = this.getRowsAndColumns(entries, counts);

      aggregateData[key] = {
        label: label,
        columns: columns,
        rows: rows,
      };
    }

    ctx.patchState({
      aggregate: aggregateData,
    });
  }

  /** Gets a count of the number of occurrences of each unique cellId in an array of entries,
   * and returns an object mapping each cellId to its corresponding count. */
  private getCellCountMap(entries: CellSummary[string]['entries']): { [key: string]: number } {
    return entries.reduce<Record<string, number>>((res, { cell: { id }, count }) => {
      res[id] = res[id] ? res[id] + count : count;
      return res;
    }, {});
  }

  /** Returns an array of rows and columns based on an array of entries */
  private getRowsAndColumns(
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
        // TODO: Compute color and size
        color: '',
        size: 0,
        data: entry,
      };
    }

    return [Object.values(rows), columns];
  }

  private hexToRgb(hex: string) {
    const hexValue = hex.toUpperCase().replace('#', '');
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    return [r, g, b];
  }

  private rgbToHex(rgb: number[]) {
    const r = Math.round(rgb[0]).toString(16).padStart(2, '0');
    const g = Math.round(rgb[1]).toString(16).padStart(2, '0');
    const b = Math.round(rgb[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
  }

  interpolateColor(points: GradientPoint[], percentage: number): string {
    const index = points.findIndex((point) => point.percentage >= percentage);
    const lowPoint = points[index - 1];
    const highPoint = points[index];
    const diff = highPoint.percentage - lowPoint.percentage;
    const finalPercentage = (percentage - lowPoint.percentage) / diff;

    const rgb1 = this.hexToRgb(lowPoint.color);
    const rgb2 = this.hexToRgb(highPoint.color);

    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * finalPercentage);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * finalPercentage);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * finalPercentage);

    return this.rgbToHex([r, g, b]);
  }
}
