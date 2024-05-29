import { Injectable, signal } from '@angular/core';
import { ColorMapEntry, EdgeEntry, NodeEntry } from '@hra-ui/cde-visualization';

@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  readonly nodes = signal<string | NodeEntry[]>('assets/TEMP/nodes.csv');
  readonly edges = signal<string | EdgeEntry[]>('assets/TEMP/edges.csv');
  readonly colorMap = signal<string | ColorMapEntry[]>('assets/TEMP/colormap.csv');
}
