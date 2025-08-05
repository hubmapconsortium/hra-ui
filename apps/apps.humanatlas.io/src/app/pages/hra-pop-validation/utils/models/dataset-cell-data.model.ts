// Raw SPARQL binding structure from the API
export interface DatasetCellSparqlBinding {
  organ_id: { value: string };
  organ: { value: string };
  dataset: { value: string };
  sex: { value: string };
  tool: { value: string };
  modality: { value: string };
  cell_id: { value: string };
  cell_label: { value: string };
  cell_count: { value: string };
  cell_percentage: { value: string };
}

// Parsed data structure used in the application
export interface ParsedDatasetCellData {
  organId: string;
  organ: string;
  datasetId: string;
  sex: string;
  tool: string;
  modality: string;
  cellId: string;
  cellLabel: string;
  cellCount: number;
  cellPercentage: number;
}
