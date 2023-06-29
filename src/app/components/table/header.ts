import { TableData } from "./table";

export interface HeaderData {
  header: string;
  columnDef: string;
  cell: (element: TableData) => unknown;
  isTotalRequired?: boolean;
  sorting?: boolean;
  alignment?: string;
}

export interface ExtraHeader {
  columnDef: string;
  header: string;
  colspan?: number;
  rowspan?: number;
}
