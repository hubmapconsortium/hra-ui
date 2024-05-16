import { Injectable, signal } from '@angular/core';
import { EdgeEntry, Node, RawColorMapItem } from '@hra-ui/cde-visualization';

@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  readonly nodes = signal<string | Node[]>('assets/TEMP/nodes.csv');
  readonly edges = signal<string | EdgeEntry[]>('assets/TEMP/edges.csv');
  readonly colorMap = signal<string | RawColorMapItem[]>('assets/TEMP/colormap.csv');
}
