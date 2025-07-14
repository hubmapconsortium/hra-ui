import { Component, computed, effect, inject, output, signal, ChangeDetectionStrategy, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VisualizationSpec } from 'vega-embed';
import {
  Configuration,
  GraphAttribute,
  OrderType,
  getAttributeTitle,
  DatasetOption,
  GroupOption,
  GraphSelectionState,
} from '../../models/parameters.model';
import { CellPopulationDataService } from '../../services/cell-population-data.service';
import { getStackedBarsSpec, StackedBarsSpecOptions } from '../../utils/visualization';
import { CommonModule } from '@angular/common';

/**
 * Component for selecting configurations from dropdowns and rendering the cell population graph.
 */
@Component({
  selector: 'hra-config-selector',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonToggleModule],
  templateUrl: './config-selector.component.html',
  styleUrl: './config-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigSelectorComponent {
  /** Data service */
  private readonly dataService = inject(CellPopulationDataService);

  /** Vega spec output signal */
  readonly vegaSpecEvent = output<VisualizationSpec>();

  /** Graph Selection state signal */
  readonly graphSelections = model<GraphSelectionState>();

  /** Current configuration signal */
  private readonly currentConfig = signal<Configuration | null>(null);

  /** General sort labels signal */
  readonly generalSortLabels = signal<string[]>(['Total Cell Count']);

  /** Loading signal */
  readonly loading = this.dataService.loadingSignal;

  /** Cell types */
  readonly cellTypes = this.dataService.cellTypesSignal;

  /** Grpah data signal */
  readonly graphData = this.dataService.graphDataSignal;

  /** Computed signal for dataset options in config selector component */
  readonly datasetOptions = computed<DatasetOption[]>(() => {
    return this.dataService.getDatasetOptions();
  });

  /** Computed signal for groupBy options */
  readonly groupOptions = computed<GroupOption[]>(() => {
    const config = this.currentConfig();
    if (!config) {
      return [{ key: GraphAttribute.None, label: 'None' }];
    }

    return Object.entries(config.groupTypes).reduce(
      (types, [key, label]) => {
        types.push({ key: key as GraphAttribute, label: label || '' });
        return types;
      },
      [{ key: GraphAttribute.None, label: 'None' }] as GroupOption[],
    );
  });

  /** Computed signal for sortBy options */
  readonly sortOptions = computed<string[]>(() => {
    return [...this.generalSortLabels(), ...this.cellTypes()];
  });

  /** Options for order type */
  readonly orderTypeOptions = [
    { value: OrderType.Ascending, label: 'Ascending' },
    { value: OrderType.Descending, label: 'Descending' },
  ];

  /** X-axis toggle options */
  readonly xAxisOptions = [
    { value: GraphAttribute.DatasetName, label: 'Dataset Name' },
    { value: GraphAttribute.Dataset, label: 'Dataset ID' },
  ];

  /** Y-axis toggle options */
  readonly yAxisOptions = [
    { value: GraphAttribute.Count, label: 'Raw Count' },
    { value: GraphAttribute.Percentage, label: 'Percentage' },
  ];

  constructor() {
    effect(async () => {
      const source = this.graphSelections()?.datasetSource;
      if (source) {
        await this.loadDataset(source);
      }
    });

    effect(() => {
      const config = this.currentConfig();
      const data = this.graphData();
      const cellTypes = this.cellTypes();

      if (config && data.length > 0 && cellTypes.length > 0) {
        this.emitSpec();
      }
    });
  }

  /**
   * Loads dataset configuration and data
   */
  private async loadDataset(source: string): Promise<void> {
    const result = await this.dataService.loadDataset(source);
    this.currentConfig.set(result.config);

    // Update general sort labels with config attributes
    const newSortLabels = ['Total Cell Count', ...result.config.sortAttributes.map(getAttributeTitle)];
    this.generalSortLabels.set(newSortLabels);
  }

  /**
   * Emits the Vega-Lite specification based on current selections and data
   */
  private emitSpec(): void {
    const config = this.currentConfig();
    const data = this.graphData();
    const cellTypes = this.cellTypes();

    if (!config || data.length === 0) {
      return;
    }

    if (!this.graphSelections()) {
      return;
    }
    const options: StackedBarsSpecOptions = {
      values: data,
      xAxisField: this.graphSelections()?.xAxisField ?? GraphAttribute.DatasetName,
      yAxisField: this.graphSelections()?.yAxisField ?? GraphAttribute.Count,
      sortBy: this.graphSelections()?.sortBy ?? 'Total cell count',
      orderType: this.graphSelections()?.orderType ?? OrderType.Descending,
      groupBy: this.graphSelections()?.groupBy ?? GraphAttribute.None,
      legendField: GraphAttribute.CellType,
      legendDomain: cellTypes,
      legendRange: Array.from(config.colorPalette).reverse().slice(0, cellTypes.length),
      fixedBars: config.fixed || 0,
    };

    const spec = getStackedBarsSpec(options);
    this.vegaSpecEvent.emit(spec);
  }

  /**
   * Handles changes in graph selection state
   *
   * @param partial Partial graph selection state to update
   */
  onGraphSelectionChange(partial: Partial<GraphSelectionState>) {
    const currentSelections = this.graphSelections();
    const newSelections = { ...currentSelections, ...partial } as GraphSelectionState;
    this.graphSelections.set(newSelections);
  }
}
