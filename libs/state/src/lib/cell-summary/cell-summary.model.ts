import { CellSummary } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { z } from 'zod';

export type CellSummaryAggregateRow = z.infer<typeof AGGREGATE_ROW>;

export type CellSummaryAggregate = z.infer<typeof AGGREGATE>;

export interface CellSummaryModel {
  summaries: CellSummary[];
  aggregates: CellSummaryAggregate[];
}

export type Context = StateContext<CellSummaryModel>;

const AGGREGATE_CELL = z.object({
  color: z.string(),
  size: z.number().nonnegative(),
  data: z.unknown(),
});

const AGGREGATE_ROW = z.tuple([z.string(), z.number().optional()]).rest(AGGREGATE_CELL.optional());

const AGGREGATE = z.object({
  label: z.string(),
  columns: z.string().array(),
  rows: AGGREGATE_ROW.array(),
});
