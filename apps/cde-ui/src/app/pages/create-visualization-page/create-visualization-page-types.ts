export interface VisualizationSettings {
  data: CellTypeTableData;
  anchorCellType?: string;
  metadata: MetaData;
  colorMap: Color[];
}

export interface CellTypeTableData {
  x: number;
  y: number;
  cellType: string;
  z?: number;
  ontologyId?: string;
}

export interface MetaData {
  title?: string;
  sex: string;
  thickness?: number;
  technology?: string;
  age?: number;
  pixelSize?: number;
  organ?: string;
}

export interface Color {
  cellType: number[];
}

export interface MetadataSelectOption {
  value: string;
  viewValue: string;
}

export const DEFAULT_SETTINGS: VisualizationSettings = {
  data: {
    x: 0,
    y: 0,
    cellType: '',
  },
  metadata: {
    sex: 'female',
  },
  colorMap: [],
};
