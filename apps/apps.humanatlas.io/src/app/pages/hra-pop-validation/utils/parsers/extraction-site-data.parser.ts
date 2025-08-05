import { ExtractionSiteSparqlBinding, ParsedExtractionSiteData } from '../models/extraction-site-data.model';

export function parseExtractionSite(raw: ExtractionSiteSparqlBinding): ParsedExtractionSiteData {
  return {
    organId: raw.organ_id.value,
    organ: raw.organ.value,
    extractionSiteId: raw.extraction_site.value,
    sex: raw.sex.value,
    tool: raw.tool.value,
    modality: raw.modality.value,
    cellId: raw.cell_id.value,
    cellLabel: raw.cell_label.value,
    cellCount: Number(raw.cell_count.value),
    cellPercentage: Number(raw.cell_percentage.value),
  };
}
