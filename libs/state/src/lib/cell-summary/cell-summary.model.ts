import { z } from 'zod';

export type Cell = z.infer<typeof CELL_SCHEMA>;
export type CellSummary = z.infer<typeof CELL_SUMMARY_SCHEMA>;
export type Aggregate = z.infer<typeof CELL_SUMMARY_AGGREGATE_SCHEMA>;
export type AggregateRow = Aggregate[string]['rows'][number];

export interface CellSummaryStateModel {
  summaries: CellSummary;
  aggregate: Aggregate;
}

export const CELL_SCHEMA = z.object({
  cell: z.object({
    id: z.string(),
    label: z.string(),
  }),
  biomarker: z.object({
    id: z.string(),
    label: z.string(),
  }),
  count: z.number(),
  percentage: z.number(),
});

export const CELL_SUMMARY_SCHEMA = z.record(
  z.object({
    label: z.string(),
    entries: CELL_SCHEMA.array(),
  })
);

export const CELL_SUMMARY_AGGREGATE_SCHEMA = z.record(
  z.object({
    label: z.string(),
    columns: z.string().array(),
    rows: z
      .tuple([z.string(), z.number().optional()])
      .rest(
        z
          .object({
            color: z.string(),
            size: z.number(),
            data: CELL_SCHEMA,
          })
          .optional()
      )
      .array(),
  })
);
