import { TableData } from './table';

/** An interface representing the details of the header data */
export interface HeaderData {
  /** Label of the column */
  header: string;
  /** Definition of the column */
  columnDef: string;
  /** Cell data of the column */
  cell: (element: TableData) => unknown;
  /** Flag to show/hide the total below the table */
  isTotalRequired?: boolean;
  /** Flag to enable/disable sorting */
  sorting?: boolean;
  /** Alignment of the column data */
  alignment?: string;
}

/** An interface representing the details of the additional data */
export interface ExtraHeader {
  /** Definition of the column */
  columnDef: string;
  /** Label of the column */
  header: string;
  /** Number of columns to span */
  colspan?: number;
  /** Number of rows to span */
  rowspan?: number;
}
