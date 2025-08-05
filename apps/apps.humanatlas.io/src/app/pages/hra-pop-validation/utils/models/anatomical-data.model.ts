// Raw SPARQL binding structure from the API
export interface AnatomicalSparqlBinding {
  organ: { value: string };
  as: { value: string };
  as_label: { value: string };
  sex: { value: string };
  tool: { value: string };
  modality: { value: string };
  cell_id: { value: string };
  cell_label: { value: string };
  cell_count: { value: string };
  cell_percentage: { value: string };
  dataset_count: { value: string };
}

// Parsed data structure used in the application
export interface ParsedAnatomicalData {
  organ: string;
  anatomicalStructureId: string;
  anatomicalStructureLabel: string;
  sex: string;
  tool: string;
  modality: string;
  cellId: string;
  cellLabel: string;
  cellCount: number;
  cellPercentage: number;
  datasetCount: number;
}
