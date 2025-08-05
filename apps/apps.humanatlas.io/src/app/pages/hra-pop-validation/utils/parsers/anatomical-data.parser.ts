import { AnatomicalSparqlBinding, ParsedAnatomicalData } from '../models/anatomical-data.model';

export function parseAnatomical(raw: AnatomicalSparqlBinding): ParsedAnatomicalData {
  return {
    organ: raw.organ.value,
    anatomicalStructureId: raw.as.value,
    anatomicalStructureLabel: raw.as_label.value,
    sex: raw.sex.value,
    tool: raw.tool.value,
    modality: raw.modality.value,
    cellId: raw.cell_id.value,
    cellLabel: raw.cell_label.value,
    cellCount: Number(raw.cell_count.value),
    cellPercentage: Number(raw.cell_percentage.value),
    datasetCount: Number(raw.dataset_count.value),
  };
}
