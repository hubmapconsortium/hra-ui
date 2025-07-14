import { Injectable, signal } from '@angular/core';
import { parse } from 'papaparse';
import {
  Configuration,
  MAIN_CONFIG_JSON,
  PREVIEW_CONFIG_JSON,
  isOfTypePreviewMode,
  PreviewMode,
} from '../models/parameters.model';

/**
 * Service for managing cell population data, including loading configurations and datasets.
 */
@Injectable({
  providedIn: 'root',
})
export class CellPopulationDataService {
  /** Presets signal to hold configurations */
  private readonly presets = signal<Record<string, Configuration>>({});

  /** Loading signal set to default false*/
  private readonly loading = signal<boolean>(false);

  /** Graph data signal to hold the loaded data */
  private readonly graphData = signal<Record<string, any>[]>([]);

  /** Cell types signal to hold unique cell types */
  private readonly cellTypes = signal<string[]>([]);

  /** Error signal to hold any error messages */
  private readonly error = signal<string | null>(null);

  /** Readonly signals for external access */
  readonly loadingSignal = this.loading.asReadonly();
  readonly graphDataSignal = this.graphData.asReadonly();
  readonly cellTypesSignal = this.cellTypes.asReadonly();

  /**
   * Resolves the dataset URL based on the base path and title.
   * @param basePath - Base path for the dataset
   * @param title - Title of the dataset
   * @returns Resolved URL for the dataset
   */
  private resolveDatasetUrl(basePath: string, title: string): string {
    if (basePath.includes('docs.google.com')) {
      return `${basePath}&sheet=${encodeURIComponent(title)}`;
    }
    const safeBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return new URL(`${title}.csv`, safeBasePath).toString();
  }

  /**
   * Fetches CSV data from the given URL.
   * @param url - URL to fetch the CSV data from
   * @returns Promise resolving to an array of records
   */
  private async getCsv(url: string): Promise<Record<string, any>[]> {
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

  /**
   * Loads the configuration from the specified source.
   * @param configSource - Source URL for the configuration
   * @param previewMode - Optional preview mode to use
   */
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
      this.presets.set({});
      this.error.set(`Configuration Error: ${msg}`);
    }
  }

  /**
   * Loads dataset based on the selected source.
   * @param datasetSource - The key of the dataset to load
   * @returns Promise resolving to an object containing graph data, cell types, and configuration
   */
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

  /**
   * Returns dataset options for the selector.
   * @returns Array of dataset options with key and label
   */
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
