import { CellTypeTableData } from '../services/file-upload-service';

/** Color map row */
export interface ColorMapItem {
  /** Cell id */
  cell_id: number;
  /** Cell type */
  cell_type: string;
  /** Cell color */
  cell_color: [number, number, number];
}

/** Color map */
export type ColorMap = ColorMapItem[];

/** Settings */
export interface VisualizationSettings {
  /** Node data */
  data: CellTypeTableData[];
  /** Cell type anchor */
  anchorCellType?: string;
  /** User provided metadata */
  metadata: MetaData;
  /** Optional color map */
  colorMap?: ColorMap;
}

/** Metadata */
export interface MetaData {
  /** Visualization metadata */
  title?: string;
  /** Sex */
  sex: string;
  /** Thickness */
  thickness?: number;
  /** Technology */
  technology?: string;
  /** Age */
  age?: number;
  /** Pixel size */
  pixelSize?: number;
  /** Organ */
  organ?: string;
}

/** Csv data source */
export type CsvType = 'data' | 'colormap';
