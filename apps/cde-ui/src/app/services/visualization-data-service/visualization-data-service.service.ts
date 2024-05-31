import { Injectable, signal } from '@angular/core';
import { ColorMapEntry, EdgeEntry, NodeEntry } from '@hra-ui/cde-visualization';

/**
 * Visualization data service
 */
@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  /** Visualization nodes */
  readonly nodes = signal<string | NodeEntry[]>('assets/TEMP/nodes.csv');
  /** Visualization edges */
  readonly edges = signal<string | EdgeEntry[]>('assets/TEMP/edges.csv');
  /** Visualization color map */
  readonly colorMap = signal<string | ColorMapEntry[]>('assets/TEMP/colormap.csv');
}
