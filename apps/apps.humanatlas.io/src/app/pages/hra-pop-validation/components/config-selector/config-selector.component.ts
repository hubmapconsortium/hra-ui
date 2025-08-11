// components/config-selector/config-selector.component.ts
import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';
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
  // Read-only inputs that don't need outputs
  readonly dataTypeOptions = input.required<DataTypeConfig[]>();
  readonly organOptions = input.required<string[]>();
  readonly xAxisOptions = input.required<XAxisOption[]>();
  readonly yAxisOptions = input.required<YAxisOption[]>();
  readonly sortOptions = input.required<SortOption[]>();
  readonly loading = input<boolean>(false);
  readonly availableTools = input.required<string[]>(); // Tools that have data

  readonly selectedDataType = model.required<DataType>();
  readonly selectedOrgan = model.required<string>();
  readonly selectedTools = model.required<string[]>();
  readonly selectedSexes = model.required<string[]>();
  readonly selectedXAxis = model.required<string>();
  readonly selectedYAxis = model.required<'cellCount' | 'cellPercentage'>();
  readonly selectedSort = model.required<'totalCellCount' | 'alphabetical'>();

  readonly allTools = ['azimuth', 'celltypist', 'popv', 'sc_proteomics'];
  readonly availableSexes = ['Male', 'Female'];

  onDataTypeChange(dataType: DataType): void {
    this.selectedDataType.set(dataType);
  }

  onOrganChange(organ: string): void {
    this.selectedOrgan.set(organ);
  }

  onToolChange(tool: string, checked: boolean): void {
    const currentTools = this.selectedTools();
    if (checked) {
      this.selectedTools.set([...currentTools, tool]);
    } else {
      this.selectedTools.set(currentTools.filter((t) => t !== tool));
    }
  }

  onSexChange(sex: string, checked: boolean): void {
    const currentSexes = this.selectedSexes();
    if (checked) {
      this.selectedSexes.set([...currentSexes, sex]);
    } else {
      this.selectedSexes.set(currentSexes.filter((s) => s !== sex));
    }
  }

  onXAxisChange(xAxis: string): void {
    this.selectedXAxis.set(xAxis);
  }

  onYAxisChange(yAxis: 'cellCount' | 'cellPercentage'): void {
    this.selectedYAxis.set(yAxis);
  }

  onSortChange(sort: 'totalCellCount' | 'alphabetical'): void {
    this.selectedSort.set(sort);
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
