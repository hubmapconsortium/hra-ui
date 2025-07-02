import { Component, computed, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { VisualizationSpec } from 'vega-embed';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { ConfigSelectorComponent } from './components/config-selector/config-selector.component';
import { GraphAttribute, OrderType, PreviewMode, MAIN_CONFIG_JSON } from './models/parameters.model';
import { CellPopulationDataService } from './services/cell-population-data.service';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatDividerModule } from '@angular/material/divider';

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

  readonly configSource = input<string>(MAIN_CONFIG_JSON);
  readonly showUi = input<boolean>(true);
  readonly previewMode = input<PreviewMode | undefined>(undefined);

  readonly datasetSource = signal<string>('');
  readonly sortBy = signal<string>('Total Cell Count');
  readonly orderType = signal<OrderType>(OrderType.Descending);
  readonly groupBy = signal<GraphAttribute>(GraphAttribute.None);
  readonly yAxisField = signal<GraphAttribute>(GraphAttribute.Count);
  readonly xAxisField = signal<GraphAttribute>(GraphAttribute.DatasetName);
  readonly currentSpec = signal<VisualizationSpec | null>(null);

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
      if (options.length > 0 && !this.datasetSource()) {
        this.datasetSource.set(options[0].key);
      }
    });
  }

  /**
   * Event handlers for configuration changes
   */
  onSpecUpdate(spec: VisualizationSpec): void {
    this.currentSpec.set(spec);
  }

  onDatasetChange(value: string): void {
    this.datasetSource.set(value);
  }

  onSortByChange(value: string): void {
    this.sortBy.set(value);
  }

  onOrderTypeChange(value: OrderType): void {
    this.orderType.set(value);
  }

  onGroupByChange(value: GraphAttribute): void {
    this.groupBy.set(value);
  }

  onYAxisFieldChange(value: GraphAttribute): void {
    this.yAxisField.set(value);
  }

  onXAxisFieldChange(value: GraphAttribute): void {
    this.xAxisField.set(value);
  }
}
