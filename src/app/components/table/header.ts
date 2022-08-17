import { TableData } from "./table";

export interface HeaderData {
  header: string;
  columnDef: string;
  cell: (element: TableData) => string;
}
