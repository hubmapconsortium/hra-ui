import { Component, computed, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { VisualizationSpec } from 'vega-embed';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { ConfigSelectorComponent } from './components/config-selector/config-selector.component';
import { MAIN_CONFIG_JSON, GraphSelectionState, ConfigurationSchema } from './models/parameters.model';
import { CellPopulationDataService } from './services/cell-population-data.service';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatDividerModule } from '@angular/material/divider';
import { httpResource } from '@angular/common/http';

/**
 * Component for displaying the Cell Population Graph with configuration options.
 */
@Component({
  selector: 'hra-cell-population-graph',
  imports: [BarGraphComponent, ConfigSelectorComponent, PageSectionComponent, IconsModule, MatDividerModule],
  templateUrl: './cell-population-graph.component.html',
  styleUrl: './cell-population-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationGraphComponent {
  /** Data service for loading configurations and datasets */
  private readonly dataService = inject(CellPopulationDataService);

  readonly configurationUrl = input<string>(MAIN_CONFIG_JSON);

  private readonly config = httpResource(() => this.configurationUrl(), {
    parse: (raw: unknown) => ConfigurationSchema.parse(raw),
  });

  /** Input for configuration source, defaults to the main config JSON */
  readonly configSource = input<string>(MAIN_CONFIG_JSON);

  /** Signal to hold the current visualization specification */
  readonly currentSpec = signal<VisualizationSpec | null>(null);

  /** Signal to hold the graph selections state */
  readonly graphSelections = signal<GraphSelectionState>({
    datasetSource: '',
    sortBy: 'Total cell count',
    orderType: 'descending',
    groupBy: '',
    yAxisField: 'count',
    xAxisField: 'dataset_name',
  });

  /** Available dataset options */
  readonly datasetOptions = computed(() => this.dataService.getDatasetOptions());

  /**
   * Constructor to initialize the component and load the configuration.
   */
  constructor() {
    effect(() => {
      const configSource = this.configSource();

      this.loadConfig(configSource);
    });
  }

  private async loadConfig(configSource?: string): Promise<void> {
    await this.dataService.loadConfiguration(configSource);

    const options = this.dataService.getDatasetOptions();
    if (options.length > 0 && !this.graphSelections().datasetSource) {
      this.graphSelections.set({
        ...this.graphSelections(),
        datasetSource: options[0].key,
      });
    }
  }

  /** Handle updates to the graph visualization specification */
  onSpecUpdate(spec: VisualizationSpec): void {
    this.currentSpec.set(spec);
  }
}
