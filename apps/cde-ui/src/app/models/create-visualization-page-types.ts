import { CellTypeTableData } from '../services/file-upload-service';

export interface ColorMapItem {
  cell_id: number;
  cell_type: string;
  cell_color: [number, number, number];
}

export type ColorMap = ColorMapItem[];

export interface VisualizationSettings {
  data: CellTypeTableData[];
  anchorCellType?: string;
  metadata: MetaData;
  colorMap?: ColorMap;
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
