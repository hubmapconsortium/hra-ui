import { Injectable, signal } from '@angular/core';
import { Node, RawColorMapItem } from '@hra-ui/cde-visualization';

@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  readonly nodes = signal<string | Node[]>('assets/TEMP/nodes.csv');
  readonly colorMap = signal<string | RawColorMapItem[]>('assets/TEMP/colormap.csv');
}
