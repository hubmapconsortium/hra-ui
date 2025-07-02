import { Injectable, signal } from '@angular/core';
import { parse } from 'papaparse';
import urljoin from 'url-join';
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

  readonly presetsSignal = this.presets.asReadonly();
  readonly loadingSignal = this.loading.asReadonly();
  readonly graphDataSignal = this.graphData.asReadonly();
  readonly cellTypesSignal = this.cellTypes.asReadonly();

  constructor() {}

  async getCsv(url: string): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      parse(url, {
        download: true,
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          resolve(result.data);
        },
        error: (error: any) => {
          reject(`Failed to load from URL: ${url}`);
        },
      });
    });
  }

  async loadConfiguration(configSource?: string, previewMode?: PreviewMode): Promise<void> {
    try {
      let finalConfigSource = configSource || MAIN_CONFIG_JSON;

      if (previewMode !== undefined && isOfTypePreviewMode(previewMode)) {
        finalConfigSource = PREVIEW_CONFIG_JSON;
      }

      const response = await fetch(finalConfigSource, {
        method: 'GET',
        cache: 'reload',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Failed to load configuration');
      }

      const presetsData = await response.json();
      this.presets.set(presetsData);
    } catch (error) {
      console.error('Unable to load JSON config:', error);
      this.presets.set({});
    }
  }

  async loadDataset(datasetSource: string): Promise<{
    graphData: Record<string, any>[];
    cellTypes: string[];
    config: Configuration;
  }> {
    const presets = this.presets();

    if (!(datasetSource in presets)) {
      throw new Error('No config found for provided data source.');
    }

    this.loading.set(true);

    const config = presets[datasetSource];
    const newGraphData: Record<string, any>[] = [];
    const uniqueCTs = new Set<string>();

    try {
      // Make requests in parallel
      const promises = config.datasets.map((title) => {
        const fileUrl = (() => {
          if (config.basePath.includes('docs.google.com')) {
            // Request Google Sheets API through query param
            return urljoin(config.basePath, `&sheet=${encodeURIComponent(title)}`);
          }
          // Append title as CSV to base path otherwise
          return urljoin(config.basePath, encodeURIComponent(`${title}.csv`));
        })();
        return this.getCsv(fileUrl);
      });

      const datasets = await Promise.all(promises);

      for (const [index, csvData] of datasets.entries()) {
        csvData.forEach((row) => {
          row['dataset_id'] = config.datasets[index];
          row['index'] = index;
          uniqueCTs.add(row['cell_type']);
          newGraphData.push(row);
        });
      }

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
      console.error('Error loading dataset:', error);
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
