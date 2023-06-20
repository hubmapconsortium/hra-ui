import { CellSummary } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { z } from 'zod';

// /** Type representing a single cell value */
// export type Cell = z.infer<typeof CELL_SCHEMA>;
// /** Type representing CELL_SUMMARY_SCHEMA which has labels and entries */
// export type CellSummary = z.infer<typeof CELL_SUMMARY_SCHEMA>;
// /** Type representing an aggregate summary of cell values in a group */
// export type Aggregate = z.infer<typeof CELL_SUMMARY_AGGREGATE_SCHEMA>;
// /** Type representing a row in an aggregate summary */
// export type AggregateRow = Aggregate[string]['rows'][number];
// /** Type representing a single entry in a row with cell, biomarker, count and percentage */
// export type AggregateRowEntry = AggregateRow[2];
export type CellSummaryAggregateRow = z.infer<typeof AGGREGATE_ROW>;

export type CellSummaryAggregate = z.infer<typeof AGGREGATE>;

export interface CellSummaryModel {
  summaries: CellSummary[];
  aggregates: CellSummaryAggregate[];
}

/** An interface of gradient colors along with their percentages for the gradient bar. */
export interface GradientPoint {
  /** Gradient color at a specific percentage */
  color: string;
  /** Percentage point along the gradient bar */
  percentage: number;
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

/**
 * The CellSummaryStateModel interface describes the overall shape of the state for this feature.
 * It has two properties, summaries and aggregate, both of which are of their corresponding types.
//  */
// export interface CellSummaryStateModel {
//   /** An object where each entry is an object containing information about a single cell and its corresponding biomarker. */
//   summaries: CellSummary;
//   /** An object where each entry contains a label and a table of aggregated data */
//   aggregate: Aggregate;
// }

/**
 * The CELL_SCHEMA has an object that contains an id and a label for the cell,
 * another object that contains an id and a label for the biomarker, and a count and a percentage that are both numbers.
 */
// export const CELL_SCHEMA = z.object({
//   cell: z.object({
//     id: z.string(),
//     label: z.string(),
//   }),
//   biomarker: z.object({
//     id: z.string(),
//     label: z.string(),
//   }),
//   count: z.number(),
//   percentage: z.number(),
// });

// /**
//  * The CELL_SUMMARY_SCHEMA constant is a record of CellSummary objects,
//  * where each CellSummary object contains a label and an array of CELL_SCHEMA objects.
//  */
// export const CELL_SUMMARY_SCHEMA = z.record(
//   z.object({
//     label: z.string(),
//     entries: CELL_SCHEMA.array(),
//   })
// );

// /**
//  * The CELL_SUMMARY_AGGREGATE_SCHEMA is a record of Aggregate objects, where each Aggregate object contains a label,
//  * an array of columns that are strings, and an array of rows that are AggregateRow objects.
//  */
// export const CELL_SUMMARY_AGGREGATE_SCHEMA = z.record(
//   z.object({
//     label: z.string(),
//     columns: z.string().array(),
//     rows: z
//       .tuple([z.string(), z.number().optional()])
//       .rest(
//         z
//           .object({
//             color: z.string(),
//             size: z.number(),
//             data: CELL_SCHEMA,
//           })
//           .optional()
//       )
//       .array(),
//   })
// );
