import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
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
  YAxisValue,
  SortValue,
  getToolDisplayName,
} from '../../utils/data-type-config';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Configuration Selector Component
 *
 * Provides user interface controls for filtering and configuring
 * the HRApop data visualization display options.
 */
@Component({
  selector: 'hra-config-selector',
  standalone: true,
  imports: [
    HraCommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    ResultsIndicatorComponent,
  ],
  templateUrl: './config-selector.component.html',
  styleUrl: './config-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigSelectorComponent {
  /** Available data type configuration options */
  readonly dataTypeOptions = input.required<DataTypeConfig[]>();

  /** Available organ options for selection */
  readonly organOptions = input.required<string[]>();

  /** Available X-axis options based on selected data type */
  readonly xAxisOptions = input.required<XAxisOption[]>();

  /** Available Y-axis options for chart display */
  readonly yAxisOptions = input.required<YAxisOption[]>();

  /** Available sort options for data organization */
  readonly sortOptions = input.required<SortOption[]>();

  /** Loading state indicator */
  readonly loading = input<boolean>(false);

  /** Tools that have data available for the current organ */
  readonly availableTools = input.required<string[]>();

  /** Two-way binding for selected data type */
  readonly selectedDataType = model.required<DataType>();

  /** Two-way binding for selected organ */
  readonly selectedOrgan = model.required<string>();

  /** Two-way binding for selected annotation tools */
  readonly selectedTools = model.required<string[]>();

  /** Two-way binding for selected sexes */
  readonly selectedSexes = model.required<string[]>();

  /** Two-way binding for selected X-axis */
  readonly selectedXAxis = model.required<string>();

  /** Two-way binding for selected Y-axis */
  readonly selectedYAxis = model.required<YAxisValue>();

  /** Two-way binding for selected sort method */
  readonly selectedSort = model.required<SortValue>();

  /** All possible annotation tools */
  readonly allTools = ['azimuth', 'celltypist', 'popv', 'sc_proteomics'];

  /** Available sex options */
  readonly availableSexes = ['Male', 'Female'];

  /**
   * Handles changes to tool selection
   * @param tool - The tool identifier
   * @param checked - Whether the tool should be selected
   */
  onToolChange(tool: string, checked: boolean): void {
    this.selectedTools.update((previous) => {
      return checked ? [...previous, tool] : previous.filter((t) => t !== tool);
    });
  }

  /**
   * Handles changes to sex selection
   * @param selectedSexes - Array of selected sex values
   */
  onSexesChange(selectedSexes: string[]): void {
    this.selectedSexes.set(selectedSexes);
  }

  /**
   * Checks if a tool is available (has data) for the current selection
   * @param tool - The tool identifier to check
   * @returns True if the tool has available data
   */
  isToolAvailable(tool: string): boolean {
    return this.availableTools().includes(tool);
  }

  /**
   * Gets the proper display name for a tool
   * @param tool - The tool identifier
   * @returns The formatted display name
   */
  getToolDisplayName(tool: string): string {
    return getToolDisplayName(tool);
  }

  /** Converts a label to a feature name for event tracking */
  getFeatureName(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
  }
}
