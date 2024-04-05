export type ColorMap = Record<string, [number, number, number]>;

export interface VisualizationSettings {
  data: CellTypeTableData[];
  anchorCellType?: string;
  metadata: MetaData;
  colorMap: ColorMap;
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

export interface MetadataSelectOption {
  value: string;
  viewValue: string;
}

export const DEFAULT_SETTINGS: VisualizationSettings = {
  data: [],
  metadata: {
    sex: 'female',
  },
  colorMap: {},
};

export const DEFAULT_COLOR_MAP: ColorMap = { default: [1, 2, 3] };
