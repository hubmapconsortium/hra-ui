import { Injectable, signal } from '@angular/core';
import { parse } from 'papaparse';
import {
  Configuration,
  MAIN_CONFIG_JSON,
  PREVIEW_CONFIG_JSON,
  isOfTypePreviewMode,
  PreviewMode,
} from '../models/parameters.model';

@Injectable({
  providedIn: 'root',
})
export class CellPopulationDataService {
  private readonly presets = signal<Record<string, Configuration>>({});
  private readonly loading = signal<boolean>(false);
  private readonly graphData = signal<Record<string, any>[]>([]);
  private readonly cellTypes = signal<string[]>([]);
  private readonly error = signal<string | null>(null);

  readonly loadingSignal = this.loading.asReadonly();
  readonly graphDataSignal = this.graphData.asReadonly();
  readonly cellTypesSignal = this.cellTypes.asReadonly();

  constructor() {}

  private resolveDatasetUrl(basePath: string, title: string): string {
    if (basePath.includes('docs.google.com')) {
      return `${basePath}&sheet=${encodeURIComponent(title)}`;
    }
    const safeBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return new URL(`${title}.csv`, safeBase).toString();
  }

  async getCsv(url: string): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      parse(url, {
        download: true,
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => resolve(result.data),
        error: () => reject(`Failed to load from URL: ${url}`),
      });
    });
  }

  async loadConfiguration(configSource?: string, previewMode?: PreviewMode): Promise<void> {
    this.error.set(null);
    const finalConfigSource =
      previewMode !== undefined && isOfTypePreviewMode(previewMode)
        ? PREVIEW_CONFIG_JSON
        : configSource || MAIN_CONFIG_JSON;

    try {
      const response = await fetch(finalConfigSource, {
        method: 'GET',
        cache: 'reload',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch configuration from ${finalConfigSource}`);
      }

      const presetsData = await response.json();
      this.presets.set(presetsData);
    } catch (err) {
      const msg = (err as Error).message ?? 'Unknown config load error';
      console.error('Config Load Error:', msg);
      this.presets.set({});
      this.error.set(`Configuration Error: ${msg}`);
    }
  }

  async loadDataset(datasetSource: string): Promise<{
    graphData: Record<string, any>[];
    cellTypes: string[];
    config: Configuration;
  }> {
    this.error.set(null);
    const presets = this.presets();
    const config = presets[datasetSource];

    if (!config) {
      const msg = 'No configuration found for the selected dataset.';
      this.error.set(msg);
      throw new Error(msg);
    }

    this.loading.set(true);
    const newGraphData: Record<string, any>[] = [];
    const uniqueCTs = new Set<string>();

    try {
      const datasets = await Promise.all(
        config.datasets.map((title) => this.getCsv(this.resolveDatasetUrl(config.basePath, title))),
      );

      datasets.forEach((csvData, index) =>
        csvData.forEach((row) => {
          row['dataset_id'] = config.datasets[index];
          row['index'] = index;
          uniqueCTs.add(row['cell_type']);
          newGraphData.push(row);
        }),
      );

      const sortedCellTypes = Array.from(uniqueCTs).sort();

      this.graphData.set(newGraphData);
      this.cellTypes.set(sortedCellTypes);
      this.loading.set(false);

      return {
        graphData: newGraphData,
        cellTypes: sortedCellTypes,
        config,
      };
    } catch (error) {
      this.error.set(error as string);
      this.loading.set(false);
      throw error;
    }
  }

  getDatasetOptions(): { key: string; label: string }[] {
    const presets = this.presets();
    return Object.entries(presets)
      .map(([key, value]) => ({
        key,
        label: value.label,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}
