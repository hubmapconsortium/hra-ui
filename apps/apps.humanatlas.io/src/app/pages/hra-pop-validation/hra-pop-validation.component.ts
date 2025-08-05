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
import { getAnatomicalBarGraphSpec } from './utils/visualization';
import { DataType, DATA_TYPE_CONFIGS, Y_AXIS_OPTIONS, SORT_OPTIONS, XAxisOption } from './utils/data-type-config';

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
  readonly chartPairs = signal<{ tool: string; maleChart?: VisualizationSpec; femaleChart?: VisualizationSpec }[]>([]);
  readonly showPairedLayout = signal<boolean>(false);
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

    let filtered = this.allData().filter((d) => d.organ === organ && (tools.length ? tools.includes(d.tool) : true));

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

    const availableTools = tools.length ? tools : [...new Set(filtered.map((d) => d.tool))];
    const specs: VisualizationSpec[] = [];
    const chartPairs: { tool: string; maleChart?: VisualizationSpec; femaleChart?: VisualizationSpec }[] = [];

    // Determine if we should use paired layout
    const bothSexesSelected = sexes.includes('Male') && sexes.includes('Female');
    let shouldUsePairedLayout = bothSexesSelected;

    // Check if both sexes actually have data for any tool
    if (bothSexesSelected) {
      shouldUsePairedLayout = availableTools.some((tool) => {
        const toolData = filtered.filter((d) => d.tool === tool);
        const hasMaleData = toolData.some((d) => d.sex === 'Male');
        const hasFemaleData = toolData.some((d) => d.sex === 'Female');
        return hasMaleData && hasFemaleData;
      });
    }

    this.showPairedLayout.set(shouldUsePairedLayout);

    if (shouldUsePairedLayout) {
      // Paired layout: Male and Female side by side for each tool
      availableTools.forEach((tool) => {
        const toolData = filtered.filter((d) => d.tool === tool);
        if (toolData.length === 0) {
          return;
        }

        const pair: { tool: string; maleChart?: VisualizationSpec; femaleChart?: VisualizationSpec } = { tool };

        // Create chart for each selected sex for this tool
        sexes.forEach((sex) => {
          const sexData = toolData.filter((d) => d.sex === sex);
          if (sexData.length === 0) {
            return;
          }

          const spec = getAnatomicalBarGraphSpec({
            graphTitle: `${sex} - ${tool.charAt(0).toUpperCase() + tool.slice(1)} - ${config.label}`,
            values: sexData,
            xField: xAxisOption.field,
            yField: yField,
            toolFilter: [tool],
            sexFilter: sex as 'Male' | 'Female',
            sortBy: sortBy,
            order: 'descending',
          });

          if (sex === 'Male') {
            pair.maleChart = spec;
          } else {
            pair.femaleChart = spec;
          }
        });

        chartPairs.push(pair);
      });
    } else {
      // Grid layout: All charts can sit side by side
      availableTools.forEach((tool) => {
        const toolData = filtered.filter((d) => d.tool === tool);
        if (toolData.length === 0) {
          return;
        }

        sexes.forEach((sex) => {
          const sexData = toolData.filter((d) => d.sex === sex);
          if (sexData.length === 0) {
            return;
          }

          const spec = getAnatomicalBarGraphSpec({
            graphTitle: `${sex} - ${tool.charAt(0).toUpperCase() + tool.slice(1)} - ${config.label}`,
            values: sexData,
            xField: xAxisOption.field,
            yField: yField,
            toolFilter: [tool],
            sexFilter: sex as 'Male' | 'Female',
            sortBy: sortBy,
            order: 'descending',
          });

          specs.push(spec);
        });
      });
    }

    this.vegaSpecs.set(specs);
    this.chartPairs.set(chartPairs);
  }

  // Event handlers
  onDataTypeChange(dataType: DataType) {
    this.selectedDataType.set(dataType);
  }

  onOrganChange(organ: string) {
    this.selectedOrgan.set(organ);
  }

  onToolChange(event: { tool: string; checked: boolean }) {
    const currentTools = this.selectedTools();
    if (event.checked) {
      this.selectedTools.set([...currentTools, event.tool]);
    } else {
      this.selectedTools.set(currentTools.filter((t) => t !== event.tool));
    }
  }

  onSexChange(event: { sex: string; checked: boolean }) {
    const currentSexes = this.selectedSexes();
    if (event.checked) {
      this.selectedSexes.set([...currentSexes, event.sex]);
    } else {
      this.selectedSexes.set(currentSexes.filter((s) => s !== event.sex));
    }
  }

  onXAxisChange(xAxis: string) {
    this.selectedXAxis.set(xAxis);
  }

  onYAxisChange(yAxis: 'cellCount' | 'cellPercentage') {
    this.selectedYAxis.set(yAxis);
  }

  onSortChange(sort: 'totalCellCount' | 'alphabetical') {
    this.selectedSort.set(sort);
  }
}
