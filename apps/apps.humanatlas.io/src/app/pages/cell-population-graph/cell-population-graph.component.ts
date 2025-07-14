import { Component, computed, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { VisualizationSpec } from 'vega-embed';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { ConfigSelectorComponent } from './components/config-selector/config-selector.component';
import {
  GraphAttribute,
  OrderType,
  PreviewMode,
  MAIN_CONFIG_JSON,
  GraphSelectionState,
} from './models/parameters.model';
import { CellPopulationDataService } from './services/cell-population-data.service';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatDividerModule } from '@angular/material/divider';

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

  /** Input for configuration source, defaults to the main config JSON */
  readonly configSource = input<string>(MAIN_CONFIG_JSON);

  /** Input for preview mode, if undefined, the component will not be in preview mode */
  readonly previewMode = input<PreviewMode | undefined>(undefined);

  /** Signal to hold the current visualization specification */
  readonly currentSpec = signal<VisualizationSpec | null>(null);

  /** Signal to hold the graph selections state */
  readonly graphSelections = signal<GraphSelectionState>({
    datasetSource: '',
    sortBy: 'Total cell count',
    orderType: OrderType.Descending,
    groupBy: GraphAttribute.None,
    yAxisField: GraphAttribute.Count,
    xAxisField: GraphAttribute.DatasetName,
  });

  /** Loading state from data service */
  readonly isLoading = this.dataService.loadingSignal;

  /** Available dataset options */
  readonly datasetOptions = computed(() => this.dataService.getDatasetOptions());

  constructor() {
    effect(async () => {
      const configSource = this.configSource();
      const previewMode = this.previewMode();

      await this.dataService.loadConfiguration(configSource, previewMode);

      const options = this.dataService.getDatasetOptions();
      if (options.length > 0 && !this.graphSelections().datasetSource) {
        this.graphSelections.set({
          ...this.graphSelections(),
          datasetSource: options[0].key,
        });
      }
    });
  }

  onSpecUpdate(spec: VisualizationSpec): void {
    this.currentSpec.set(spec);
  }
}
