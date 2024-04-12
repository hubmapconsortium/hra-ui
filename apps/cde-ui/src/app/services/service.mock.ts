import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { CellTypeDataService } from './cell-type-data-service';
import { CellTypeTableData, ColorMap } from '../models/create-visualization-page-types';
import { z } from 'zod';

const MOCK_ENDPOINT = 'assets/TEMP/mock-cell-type-data.csv';
const MOCK_COLOR_ENDPOINT = 'assets/TEMP/mock-color-map-data.csv';

const CELL_TYPE_DATA = z
  .object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
    Cell_Type: z.string(),
    Ontology_ID: z.string().optional(),
  })
  .array();

type CellTypeData = z.infer<typeof CELL_TYPE_DATA>;

const COLOR_MAP_DATA = z
  .object({
    cell: z.string(),
    R: z.number(),
    G: z.number(),
    B: z.number(),
  })
  .array();

type ColorMapData = z.infer<typeof COLOR_MAP_DATA>;

async function fetchFromCsv(endpoint: string) {
  return fetch(endpoint, {
    headers: {
      Accept: 'text/csv',
    },
  })
    .then((r) => r.text())
    .then((r) => parse(r, { header: true, skipEmptyLines: true, dynamicTyping: true }).data);
}

@Injectable({
  providedIn: 'root',
})
export class MockCellTypeDataService extends CellTypeDataService {
  override async getCellTypeData(datasetsApi = MOCK_ENDPOINT): Promise<CellTypeTableData[]> {
    const cellTypeData = (await fetchFromCsv(datasetsApi)) as CellTypeData;
    const results: CellTypeTableData[] = [];
    for (const row of cellTypeData) {
      results.push({
        x: row.x,
        y: row.y,
        z: row.z,
        cellType: row.Cell_Type,
        ontologyId: row.Ontology_ID,
      });
    }
    return results;
  }

  override async getColorMap(colorMapApi = MOCK_COLOR_ENDPOINT): Promise<ColorMap> {
    const colorMapData = (await fetchFromCsv(colorMapApi)) as ColorMapData;
    const results: ColorMap = {};
    for (const row of colorMapData) {
      results[row.cell] = [row.R, row.G, row.B];
    }
    return results;
  }
}
