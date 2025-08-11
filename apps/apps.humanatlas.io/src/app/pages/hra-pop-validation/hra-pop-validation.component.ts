// hra-pop-validation.component.ts
import { ChangeDetectionStrategy, Component, effect, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatIconModule } from '@angular/material/icon';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { ConfigSelectorComponent } from './components/config-selector/config-selector.component';
import { DataService } from './service/data.service';
import { VisualizationSpec } from 'vega-embed';
import { getBarGraphSpec } from './utils/visualization';
import {
  DataType,
  DATA_TYPE_CONFIGS,
  Y_AXIS_OPTIONS,
  SORT_OPTIONS,
  XAxisOption,
  YAxisValue,
  SortValue,
  getToolDisplayName,
} from './utils/data-type-config';

@Component({
  selector: 'hra-pop-validation',
  imports: [CommonModule, PageSectionComponent, IconsModule, MatIconModule, BarGraphComponent, ConfigSelectorComponent],
  templateUrl: './hra-pop-validation.component.html',
  styleUrl: './hra-pop-validation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraPopValidationComponent {
  private readonly dataService = inject(DataService);
  readonly dataTypeConfigs = DATA_TYPE_CONFIGS;
  readonly dataTypeOptions = Object.values(DATA_TYPE_CONFIGS);
  readonly yAxisOptions = Y_AXIS_OPTIONS;
  readonly sortOptions = SORT_OPTIONS;

  readonly selectedDataType = signal<DataType>('anatomical');
  readonly selectedOrgan = signal<string>('');
  readonly selectedTools = signal<string[]>([]);
  readonly selectedSexes = signal<string[]>(['Male', 'Female']);
  readonly xAxisOptions = signal<XAxisOption[]>([]);
  readonly selectedXAxis = signal<string>('');
  readonly selectedYAxis = signal<YAxisValue>('cellCount');
  readonly selectedSort = signal<SortValue>('totalCellCount');
  readonly availableTools = signal<string[]>([]);
  readonly vegaSpecs = signal<VisualizationSpec[]>([]);

  // Resources for data loading
  private readonly anatomicalDataResource = rxResource({
    request: () => ({ dataType: 'anatomical' as const }),
    loader: () => this.dataService.getAnatomicalData(),
  });

  private readonly extractionSiteDataResource = rxResource({
    request: () => ({ dataType: 'extraction-site' as const }),
    loader: () => this.dataService.getExtractionSiteData(),
  });

  private readonly datasetDataResource = rxResource({
    request: () => ({ dataType: 'dataset' as const }),
    loader: () => this.dataService.getDatasetCellData(),
  });

  // Computed signals derived from resources
  readonly allData = computed(() => {
    const dataType = this.selectedDataType();
    switch (dataType) {
      case 'anatomical':
        return this.anatomicalDataResource.value() ?? [];
      case 'extraction-site':
        return this.extractionSiteDataResource.value() ?? [];
      case 'dataset':
        return this.datasetDataResource.value() ?? [];
      default:
        return [];
    }
  });

  readonly organOptions = computed(() => {
    const data = this.allData();
    return [...new Set(data.map((d) => d.organ))];
  });

  readonly loading = computed(() => {
    const dataType = this.selectedDataType();
    switch (dataType) {
      case 'anatomical':
        return this.anatomicalDataResource.isLoading();
      case 'extraction-site':
        return this.extractionSiteDataResource.isLoading();
      case 'dataset':
        return this.datasetDataResource.isLoading();
      default:
        return false;
    }
  });

  readonly error = computed(() => {
    const dataType = this.selectedDataType();
    let error: unknown;

    switch (dataType) {
      case 'anatomical':
        error = this.anatomicalDataResource.error();
        break;
      case 'extraction-site':
        error = this.extractionSiteDataResource.error();
        break;
      case 'dataset':
        error = this.datasetDataResource.error();
        break;
      default:
        return null;
    }

    if (error) {
      return error instanceof Error ? error.message : 'An error occurred while loading data';
    }

    return null;
  });

  constructor() {
    this.initializeEffects();
  }

  private initializeEffects() {
    // Effect to update X-axis options when data type changes
    effect(() => {
      const dataType = this.selectedDataType();
      this.updateXAxisOptions(dataType);
    });

    // Effect to auto-select first organ when organ options change
    effect(() => {
      const organs = this.organOptions();
      if (organs.length > 0 && !this.selectedOrgan()) {
        this.selectedOrgan.set(organs[0]);
      }
    });

    // Effect to update available tools and charts when dependencies change
    effect(() => {
      this.updateAvailableTools();
      this.updateCharts();
    });
  }

  private updateAvailableTools() {
    const organ = this.selectedOrgan();
    const data = this.allData();

    if (!organ || !data.length) {
      this.availableTools.set([]);
      return;
    }

    // Get unique tools available for the current organ
    const organData = data.filter((d) => d.organ === organ);
    const toolsWithData = [...new Set(organData.map((d) => d.tool))];

    this.availableTools.set(toolsWithData);

    // Auto-select all available tools on first load, or filter existing selection
    this.selectedTools.update((currentSelectedTools) => {
      if (currentSelectedTools.length === 0) {
        // First load - select all available tools
        return toolsWithData;
      }
      // Filter existing selection to only include available tools
      const validSelectedTools = currentSelectedTools.filter((tool) => toolsWithData.includes(tool));
      return validSelectedTools.length !== currentSelectedTools.length ? validSelectedTools : currentSelectedTools;
    });
  }

  private updateXAxisOptions(dataType: DataType) {
    const config = this.dataTypeConfigs[dataType];
    this.xAxisOptions.set(config.xAxisOptions);
    if (config.xAxisOptions.length > 0) {
      this.selectedXAxis.set(config.xAxisOptions[0].value);
    }
  }

  private updateCharts() {
    const dataType = this.selectedDataType();
    const organ = this.selectedOrgan();
    const tools = this.selectedTools();
    const sexes = this.selectedSexes();
    const xAxis = this.selectedXAxis();
    const yField = this.selectedYAxis();
    const sortBy = this.selectedSort();
    const config = this.dataTypeConfigs[dataType];

    if (!organ || !this.allData().length || this.loading() || !xAxis) {
      this.vegaSpecs.set([]);
      return;
    }

    // Find the X-axis field mapping
    const xAxisOption = config.xAxisOptions.find((opt) => opt.value === xAxis);
    if (!xAxisOption) {
      this.vegaSpecs.set([]);
      return;
    }

    // Filter data by organ, tools, and sexes - all at once
    let filtered = this.allData().filter(
      (d) => d.organ === organ && (tools.length ? tools.includes(d.tool) : true) && sexes.includes(d.sex),
    );

    if (filtered.length === 0) {
      this.vegaSpecs.set([]);
      return;
    }

    // Handle extraction site label fallback
    if (xAxisOption.field === 'extractionSiteLabel') {
      filtered = filtered.map((item) => ({
        ...item,
        extractionSiteLabel: (item as any).extractionSiteLabel || (item as any).extractionSiteId,
      }));
    }

    const toolNames = tools.length ? tools.map((t) => getToolDisplayName(t)).join(', ') : 'All Tools';
    const sexNames = sexes.join(' & ');
    const title = `${config.label} - ${toolNames} - ${sexNames}`;

    const spec = getBarGraphSpec({
      graphTitle: title,
      values: filtered,
      xField: xAxisOption.field,
      yField: yField,
      toolFilter: tools,
      sexFilter: 'Both',
      sortBy: sortBy,
      order: 'descending',
    });
    this.vegaSpecs.set([spec]);
  }
}
