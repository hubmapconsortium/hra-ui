// hra-pop-validation.component.ts
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatIconModule } from '@angular/material/icon';
import { ParsedAnatomicalData } from './utils/models/anatomical-data.model';
import { ParsedExtractionSiteData } from './utils/models/extraction-site-data.model';
import { ParsedDatasetCellData } from './utils/models/dataset-cell-data.model';
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
  getToolDisplayName,
} from './utils/data-type-config';

type AllDataTypes = ParsedAnatomicalData | ParsedExtractionSiteData | ParsedDatasetCellData;

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
  readonly allData = signal<AllDataTypes[]>([]);
  readonly organOptions = signal<string[]>([]);
  readonly selectedOrgan = signal<string>('');
  readonly selectedTools = signal<string[]>([]);
  readonly selectedSexes = signal<string[]>(['Male', 'Female']);
  readonly xAxisOptions = signal<XAxisOption[]>([]);
  readonly selectedXAxis = signal<string>('');
  readonly selectedYAxis = signal<'cellCount' | 'cellPercentage'>('cellCount');
  readonly selectedSort = signal<'totalCellCount' | 'alphabetical'>('totalCellCount');
  readonly availableTools = signal<string[]>([]);
  readonly vegaSpecs = signal<VisualizationSpec[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.initializeEffects();
  }

  private initializeEffects() {
    // Effect to load data when data type changes
    effect(() => {
      const dataType = this.selectedDataType();
      this.loadDataForType(dataType);
      this.updateXAxisOptions(dataType);
    });

    // Effect to update charts when any filter changes
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
    const currentSelectedTools = this.selectedTools();

    if (currentSelectedTools.length === 0) {
      // First load - select all available tools
      this.selectedTools.set(toolsWithData);
    } else {
      // Filter existing selection to only include available tools
      const validSelectedTools = currentSelectedTools.filter((tool) => toolsWithData.includes(tool));

      if (validSelectedTools.length !== currentSelectedTools.length) {
        this.selectedTools.set(validSelectedTools);
      }
    }
  }

  private updateXAxisOptions(dataType: DataType) {
    const config = this.dataTypeConfigs[dataType];
    this.xAxisOptions.set(config.xAxisOptions);
    if (config.xAxisOptions.length > 0) {
      this.selectedXAxis.set(config.xAxisOptions[0].value);
    }
  }

  private loadDataForType(dataType: DataType) {
    this.loading.set(true);
    this.error.set(null);
    this.allData.set([]);
    this.organOptions.set([]);
    this.selectedOrgan.set('');

    switch (dataType) {
      case 'anatomical':
        this.dataService.getAnatomicalData().subscribe({
          next: (data) => {
            this.allData.set(data);
            const organs = [...new Set(data.map((d) => d.organ))];
            this.organOptions.set(organs);
            if (organs.length > 0) {
              this.selectedOrgan.set(organs[0]);
            }
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.message || 'Error loading anatomical data');
            this.loading.set(false);
          },
        });
        break;

      case 'extraction-site':
        this.dataService.getExtractionSiteData().subscribe({
          next: (data) => {
            this.allData.set(data);
            const organs = [...new Set(data.map((d) => d.organ))];
            this.organOptions.set(organs);
            if (organs.length > 0) {
              this.selectedOrgan.set(organs[0]);
            }
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.message || 'Error loading extraction site data');
            this.loading.set(false);
          },
        });
        break;

      case 'dataset':
        this.dataService.getDatasetCellData().subscribe({
          next: (data) => {
            this.allData.set(data);
            const organs = [...new Set(data.map((d) => d.organ))];
            this.organOptions.set(organs);
            if (organs.length > 0) {
              this.selectedOrgan.set(organs[0]);
            }
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.message || 'Error loading dataset data');
            this.loading.set(false);
          },
        });
        break;

      default:
        this.error.set('Unknown data type');
        this.loading.set(false);
        break;
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
