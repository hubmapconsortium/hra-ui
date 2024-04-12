import { Injectable } from '@angular/core';
import { z } from 'zod';

import { ColorMap } from '../models/create-visualization-page-types';

export interface CellTypeTableData {
  x: number;
  y: number;
  cellType: string;
  z?: number;
  ontologyId?: string;
}

const CELL_TYPE_DATA = z
  .object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
    Cell_Type: z.string(),
    Ontology_ID: z.string().optional(),
  })
  .array();

export type CellTypeData = z.infer<typeof CELL_TYPE_DATA>;

const COLOR_MAP_DATA = z
  .object({
    cell: z.string(),
    R: z.number(),
    G: z.number(),
    B: z.number(),
  })
  .array();

export type ColorMapData = z.infer<typeof COLOR_MAP_DATA>;

@Injectable({
  providedIn: 'root',
})
export class CellTypeDataService {
  getCellTypeData(cellTypeData: CellTypeData): CellTypeTableData[] {
    return cellTypeData.map((row) => {
      return {
        x: row.x,
        y: row.y,
        z: row.z,
        cellType: row.Cell_Type,
        ontologyId: row.Ontology_ID,
      };
    });
  }

  getColorMap(colorMapData: ColorMapData): ColorMap {
    const result: ColorMap = {};
    colorMapData.forEach((row) => {
      result[row.cell] = [row.R, row.G, row.B];
    });
    return result;
  }
}
