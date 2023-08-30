export interface TableData {
  label: string;
  value: string;
}

export interface TissueTableInfo {
  tissueName?: string;
  tissueData: TableData[];
}
