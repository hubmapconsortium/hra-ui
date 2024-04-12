import { CellTypeTableData } from '../services/file-upload-service';

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

export type CsvType = 'data' | 'colormap';
