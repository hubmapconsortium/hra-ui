/** An interface representing the details of Table data */
export interface TableData {
  /** Label of the column */
  label: string;
  /** Value of the column */
  value: string;
}

/** An interface representing the details of Tissue table info */
export interface TissueTableInfo {
  /** Name of the tissue */
  tissueName?: string;
  /** Table data for the tissue */
  tissueData: TableData[];
}
