import { HraCommonModule } from '@hra-ui/common';
import { Component, ChangeDetectionStrategy, computed, effect, inject, model, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VisualizationSpec } from 'vega-embed';
import {
  Configuration,
  GraphAttribute,
  OrderType,
  DatasetOption,
  GroupOption,
  GraphSelectionState,
  GRAPH_ATTRIBUTE_LABELS,
} from '../../models/parameters.model';
import { CellPopulationDataService } from '../../services/cell-population-data.service';
import { getStackedBarsSpec, StackedBarsSpecOptions } from '../../utils/visualization';

/**
 * Component for selecting configurations from dropdowns and rendering the cell population graph.
 */
@Component({
  selector: 'hra-config-selector',
  imports: [HraCommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonToggleModule],
  templateUrl: './config-selector.component.html',
  styleUrl: './config-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigSelectorComponent {
  /** Data service */
  private readonly dataService = inject(CellPopulationDataService);

  /** Form builder */
  private readonly fb = inject(FormBuilder);

  /** Vega spec output signal */
  readonly vegaSpecEvent = output<VisualizationSpec>();

  /** Graph Selection state signal */
  readonly graphSelections = model<GraphSelectionState>();

  /** Current configuration signal */
  private readonly currentConfig = signal<Configuration | null>(null);

  /** General sort labels signal */
  readonly generalSortLabels = signal<string[]>(['Total Cell Count']);

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
      return [{ key: '', label: 'None' }];
    }

    return Object.entries(config.groupTypes).reduce(
      (types, [key, label]) => {
        types.push({ key: key as GraphAttribute, label: label || '' });
        return types;
      },
      [{ key: '', label: 'None' }] as GroupOption[],
    );
  });

  /** Options for order type */
  readonly orderTypeOptions: { value: OrderType; label: string }[] = [
    { value: 'ascending', label: 'Ascending' },
    { value: 'descending', label: 'Descending' },
  ];

  /** X-axis options */
  readonly xAxisOptions: { value: GraphAttribute; label: string }[] = [
    { value: 'dataset_id', label: 'Dataset ID' },
    { value: 'dataset_name', label: 'Dataset name' },
  ];

  /** Y-axis options */
  readonly yAxisOptions: { value: GraphAttribute; label: string }[] = [
    { value: 'count', label: 'Raw count' },
    { value: 'percentage', label: 'Percentage' },
  ];

  /** Config form group */
  readonly configForm: FormGroup = this.fb.group({
    datasetSource: [''],
    sortBy: [''],
    orderType: ['descending'],
    groupBy: [''],
    xAxisField: ['dataset_name'],
    yAxisField: ['count'],
  });

  /**
   * Constructor to initialize the component and load the dataset and current configurations.
   */
  constructor() {
    this.configForm.valueChanges.subscribe((value) => {
      this.graphSelections.set({ ...this.graphSelections(), ...value });
    });

    effect(() => {
      const selections = this.graphSelections();
      if (selections) {
        this.configForm.patchValue(selections, { emitEvent: false });
        if (selections.datasetSource) {
          this.loadDataset(selections.datasetSource);
        }
      }
    });

    effect(() => {
      const config = this.currentConfig();
      const data = this.graphData();
      const cellTypes = this.cellTypes();
      const selections = this.graphSelections();

      if (config && data.length && cellTypes.length && selections) {
        const options: StackedBarsSpecOptions = {
          values: data,
          xAxisField: selections.xAxisField ?? 'dataset_name',
          yAxisField: selections.yAxisField ?? 'count',
          sortBy: selections.sortBy ?? 'Total Cell Count',
          orderType: selections.orderType ?? 'descending',
          groupBy: selections.groupBy ?? '',
          legendField: 'cell_type',
          legendDomain: cellTypes,
          legendRange: [...config.colorPalette].reverse().slice(0, cellTypes.length),
          fixedBars: config.fixed || 0,
        };
        this.vegaSpecEvent.emit(getStackedBarsSpec(options));
      }
    });
  }

  /**
   * Loads dataset configuration and data
   */
  private async loadDataset(source: string): Promise<void> {
    const result = await this.dataService.loadDataset(source);
    this.currentConfig.set(result.config);
    this.generalSortLabels.set([
      'Total Cell Count',
      ...result.config.sortAttributes.map((attr) => GRAPH_ATTRIBUTE_LABELS[attr]),
    ]);
  }
}
