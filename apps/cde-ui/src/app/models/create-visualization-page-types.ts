import { CellTypeTableData } from '../services/cell-type-data-service';

export type ColorMap = Record<string, [number, number, number]>;

export interface VisualizationSettings {
  data: CellTypeTableData[];
  anchorCellType?: string;
  metadata: MetaData;
  colorMap: ColorMap;
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

export type CsvType = 'data' | 'colormap';

export const DEFAULT_COLOR_MAP: ColorMap = { default: [1, 2, 3] };

export const DEFAULT_SETTINGS: VisualizationSettings = {
  data: [],
  metadata: {
    sex: 'female',
  },
  colorMap: DEFAULT_COLOR_MAP,
};
