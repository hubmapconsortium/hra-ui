// components/config-selector/config-selector.component.ts
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  DataType,
  DataTypeConfig,
  XAxisOption,
  YAxisOption,
  SortOption,
  getToolDisplayName,
} from '../../utils/data-type-config';

@Component({
  selector: 'hra-config-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatButtonToggleModule],
  templateUrl: './config-selector.component.html',
  styleUrl: './config-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigSelectorComponent {
  // Modern Angular signal-based inputs
  readonly dataTypeOptions = input.required<DataTypeConfig[]>();
  readonly selectedDataType = input.required<DataType>();
  readonly organOptions = input.required<string[]>();
  readonly selectedOrgan = input.required<string>();
  readonly selectedTools = input.required<string[]>();
  readonly selectedSexes = input.required<string[]>();
  readonly xAxisOptions = input.required<XAxisOption[]>();
  readonly selectedXAxis = input.required<string>();
  readonly yAxisOptions = input.required<YAxisOption[]>();
  readonly selectedYAxis = input.required<'cellCount' | 'cellPercentage'>();
  readonly sortOptions = input.required<SortOption[]>();
  readonly selectedSort = input.required<'totalCellCount' | 'alphabetical'>();
  readonly loading = input<boolean>(false);
  readonly availableTools = input.required<string[]>(); // Tools that have data

  // All possible tool options - these could also be inputs if you want more flexibility
  readonly allTools = ['azimuth', 'celltypist', 'popv', 'sc_proteomics'];
  readonly availableSexes = ['Male', 'Female'];

  // Modern Angular signal-based outputs
  readonly dataTypeChange = output<DataType>();
  readonly organChange = output<string>();
  readonly toolChange = output<{ tool: string; checked: boolean }>();
  readonly sexChange = output<{ sex: string; checked: boolean }>();
  readonly xAxisChange = output<string>();
  readonly yAxisChange = output<'cellCount' | 'cellPercentage'>();
  readonly sortChange = output<'totalCellCount' | 'alphabetical'>();

  onDataTypeChange(dataType: DataType): void {
    this.dataTypeChange.emit(dataType);
  }

  onOrganChange(organ: string): void {
    this.organChange.emit(organ);
  }

  onToolChange(tool: string, checked: boolean): void {
    this.toolChange.emit({ tool, checked });
  }

  onSexChange(sex: string, checked: boolean): void {
    this.sexChange.emit({ sex, checked });
  }

  onXAxisChange(xAxis: string): void {
    this.xAxisChange.emit(xAxis);
  }

  onYAxisChange(yAxis: 'cellCount' | 'cellPercentage'): void {
    this.yAxisChange.emit(yAxis);
  }

  onSortChange(sort: 'totalCellCount' | 'alphabetical'): void {
    this.sortChange.emit(sort);
  }

  // Helper method to check if a tool is available (has data)
  isToolAvailable(tool: string): boolean {
    return this.availableTools().includes(tool);
  }

  // Helper method to get proper tool display name
  getToolDisplayName(tool: string): string {
    return getToolDisplayName(tool);
  }
}
