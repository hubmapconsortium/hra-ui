import { Injectable } from '@angular/core';
import { CellTypeTableData } from '../models/create-visualization-page-types';

@Injectable()
export abstract class CellTypeDataService {
  abstract getCellTypeData(): Promise<CellTypeTableData[]>;
}
