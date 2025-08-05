// Raw SPARQL binding structure from the API
export interface ExtractionSiteSparqlBinding {
  organ_id: { value: string };
  organ: { value: string };
  extraction_site: { value: string };
  sex: { value: string };
  tool: { value: string };
  modality: { value: string };
  cell_id: { value: string };
  cell_label: { value: string };
  cell_count: { value: string };
  cell_percentage: { value: string };
}

export interface ParsedExtractionSiteData {
  organId: string;
  organ: string;
  extractionSiteId: string;
  extractionSiteLabel?: string; // Enhanced label in format: htan-{organ}-{creator_last_name}-{creation_year}
  sex: string;
  tool: string;
  modality: string;
  cellId: string;
  cellLabel: string;
  cellCount: number;
  cellPercentage: number;
}
