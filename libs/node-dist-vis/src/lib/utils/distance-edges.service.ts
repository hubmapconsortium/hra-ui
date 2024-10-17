// distances.service.ts
import { Injectable } from '@angular/core';
import { readFileSync, createWriteStream } from 'fs';
import Papa from 'papaparse';
import { distanceEdges } from './distance-edges';

@Injectable({
  providedIn: 'root',
})
export class DistancesService {
  calculateDistances(
    nodesFile: string,
    targetKey: string,
    targetValue: string,
    maxDist: number,
    outputFile: string,
  ): void {
    const nodes = Papa.parse(readFileSync(nodesFile).toString(), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data;

    const out = createWriteStream(outputFile);

    for (const row of distanceEdges(nodes, targetKey, targetValue, maxDist)) {
      out.write(row.join(',') + '\n');
    }

    out.end();
  }
}
