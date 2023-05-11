import { inject, Injectable } from '@angular/core';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { TissueFtuService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';
import { GradientLegend, SizeLegend } from '../resource-ids';
import { Gradient, Size } from '../resource-types';
import { ComputeAggregate, Load, SetData } from './cell-summary.actions';
import {
  Aggregate,
  AggregateRow,
  CellSummary,
  CellSummaryStateModel,
  GradientPoint,
  SizePoint,
} from './cell-summary.model';

/** Helper alias for action handler context */
type Context = StateContext<CellSummaryStateModel>;

/** Default gradient points */
const DEFAULT_GRADIENTS: GradientPoint[] = [
  { color: '#000000', percentage: 0 },
  { color: '#000000', percentage: 1 },
];

/** Default size points */
const DEFAULT_SIZES: SizePoint[] = [
  { label: '', radius: 1 },
  { label: '', radius: 5 },
];

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
  /** Gradient legend points */
  private readonly gradients = selectQuerySnapshot(
    ResourceRegistrySelectors.field,
    GradientLegend,
    Gradient,
    'points' as const,
    DEFAULT_GRADIENTS
  )<GradientPoint[]>;

  /** Size legend points */
  private readonly sizes = selectQuerySnapshot(
    ResourceRegistrySelectors.field,
    SizeLegend,
    Size,
    'sizes' as const,
    DEFAULT_SIZES
  )<SizePoint[]>;

  /** Service to load summaries */
  private readonly dataService = inject(TissueFtuService);

  /** Set summaries */
  @Action(SetData)
  set({ patchState, dispatch }: Context, { data }: SetData): Observable<void> {
    patchState({ summaries: data });
    return dispatch(new ComputeAggregate(data));
  }

  /** Load summaries from service */
  @Action(Load)
  load({ dispatch }: Context, { id }: Load): Observable<void> {
    return this.dataService.getCellSummaries(id).pipe(switchMap((data) => dispatch(new SetData(data as CellSummary))));
  }

  /**
   * computes aggregate data and stores in the current state
   */
  @Action(ComputeAggregate)
  computeAggregate(ctx: Context, action: ComputeAggregate): void {
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
        color: this.interpolateColor(this.gradients(), entry.percentage),
        size: this.interpolateSize(this.sizes(), entry.count / counts[rowId]),
        data: entry.metadata,
      };
    }

    return [Object.values(rows), columns];
  }

  /** Converts a hex string to RGB values. */
  private hexToRgb(hex: string) {
    const hexValue = hex.toUpperCase().replace('#', '');
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    return [r, g, b];
  }

  /** Converts RGB values to a hex string. */
  private rgbToHex(rgb: number[]) {
    const r = Math.round(rgb[0]).toString(16).padStart(2, '0');
    const g = Math.round(rgb[1]).toString(16).padStart(2, '0');
    const b = Math.round(rgb[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
  }

  /** Calculates the interpolated color value at the given percentage between two points in a color gradient. */
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

  /** Calculates the interpolated size at a percentage */
  interpolateSize(points: SizePoint[], percentage: number): number {
    const { radius: min } = points[0];
    const { radius: max } = points[points.length - 1];
    const diff = max - min;
    return min + diff * percentage;
  }
}
