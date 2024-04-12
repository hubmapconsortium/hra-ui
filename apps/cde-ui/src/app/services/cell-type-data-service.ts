import { Injectable } from '@angular/core';
import { CellTypeTableData, ColorMap } from '../models/create-visualization-page-types';

@Injectable()
export abstract class CellTypeDataService {
  abstract getCellTypeData(): Promise<CellTypeTableData[]>;

  abstract getColorMap(): Promise<ColorMap>;
}
