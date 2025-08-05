import { DatasetCellSparqlBinding, ParsedDatasetCellData } from '../models/dataset-cell-data.model';

export function parseDatasetCell(raw: DatasetCellSparqlBinding): ParsedDatasetCellData {
  return {
    organId: raw.organ_id.value,
    organ: raw.organ.value,
    datasetId: raw.dataset.value,
    sex: raw.sex.value,
    tool: raw.tool.value,
    modality: raw.modality.value,
    cellId: raw.cell_id.value,
    cellLabel: raw.cell_label.value,
    cellCount: Number(raw.cell_count.value),
    cellPercentage: Number(raw.cell_percentage.value),
  };
}
