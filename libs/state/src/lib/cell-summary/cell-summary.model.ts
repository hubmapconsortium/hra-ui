import { CellSummary, FtuDataSchemas } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { z } from 'zod';

/** Type representing a single AGGREGATE_ROW */
export type CellSummaryAggregateRow = z.infer<typeof AGGREGATE_ROW>;

/** Type representing AGGREGATE having label, columns and rows */
export type CellSummaryAggregate = z.infer<typeof AGGREGATE>;

/**
 * An interface of the Cell summary model
 * having the summaries and aggregrates
 */
export interface CellSummaryModel {
  summaries: CellSummary[];
  aggregates: CellSummaryAggregate[];
}

export type Context = StateContext<CellSummaryModel>;

/**
 * The AGGREGATE_CELL is an object that contains the color, size and
 * the data
 */
const AGGREGATE_CELL = z.object({
  color: z.string(),
  size: z.number().nonnegative(),
  data: FtuDataSchemas.CELL_SUMMARY_ROW,
});

/**
 * The AGGREGATE_ROW is a tuple of aggregate data structure with two elements:
 * a required string followed by an optional number
 */
const AGGREGATE_ROW = z.tuple([z.string(), z.number().optional()]).rest(AGGREGATE_CELL.optional());

/**
 * The AGGREGATE is an object that contains the label, columns
 * and rows */
const AGGREGATE = z.object({
  label: z.string(),
  columns: z.string().array(),
  rows: AGGREGATE_ROW.array(),
});
