import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { CellTypeDataService } from './service';
import { CellTypeTableData } from '../models/create-visualization-page-types';
import { z } from 'zod';

const MOCK_ENDPOINT = 'assets/TEMP/mock-cell-type-data.csv';

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
}
