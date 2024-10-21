import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import {
  ColorMapEntry,
  ColorMapFileLoaderService,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  DEFAULT_NODE_TARGET_KEY,
  DEFAULT_NODE_TARGET_VALUE,
  NodeEntry,
  TOOLTIP_POSITION_BELOW,
} from '@hra-ui/cde-visualization';
import { FooterComponent } from '@hra-ui/design-system/footer';
import { ParseError } from 'papaparse';

import { CsvFileLoaderOptions, CsvFileLoaderService } from '@hra-ui/common/fs';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';
import { FileLoadError, FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data.service';
import { validateInteger } from '../../shared/form-validators/is-integer';
import { OrganEntry } from '../../shared/resolvers/organs/organs.resolver';

/** Error when missing required columns in uploaded csv */
export interface MissingKeyError {
  /** Error type */
  type: 'missing-key-error';
  /** Required keys missing */
  keys: string[];
}

/** Type for all load errors */
export type ExtendedFileLoadError = FileLoadError | MissingKeyError;

/** File upload component for any type */
type AnyFileUploadComponent = FileUploadComponent<unknown, unknown>;

/** Returns null for all optional values */
function optionalValue<T>(): T | null {
  return null;
}

/** Visualization customization page */
@Component({
  selector: 'cde-create-visualization-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    FileUploadComponent,
    FooterComponent,
    HeaderComponent,
    MarkEmptyFormControlDirective,
    OverlayModule,
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
  /** Organ entries */
  readonly organs = input.required<OrganEntry[]>();

  /** Node data upload component */
  private readonly nodesFileUpload = viewChild.required<AnyFileUploadComponent>('nodesFileUpload');
  /** Color map upload component */
  private readonly customColorMapFileUpload = viewChild<AnyFileUploadComponent>('customColorMapFileUpload');

  /** Form builder */
  private readonly fb = inject(FormBuilder);
  /** Make form control elements in form builder non nullable */
  private readonly fbnn = this.fb.nonNullable;
  /** Router service */
  private readonly router = inject(Router);
  /** Visualization data service */
  private readonly dataService = inject(VisualizationDataService);

  /** Component form controller */
  readonly visualizationForm = this.fbnn.group({
    nodeTargetValue: [DEFAULT_NODE_TARGET_VALUE],
    metadata: this.fb.group({
      title: [optionalValue<string>()],
      technology: [optionalValue<string>()],
      organ: [optionalValue<OrganEntry>()],
      sex: [optionalValue<string>()],
      age: [optionalValue<number>(), [Validators.min(0), Validators.max(120), validateInteger()]],
      thickness: [optionalValue<number>(), Validators.min(0)],
      pixelSize: [optionalValue<number>(), Validators.min(0)],
    }),
    colorMapType: ['default'],
  });

  /** Returns true is custom color map is used */
  get useCustomColorMap(): boolean {
    return this.visualizationForm.value.colorMapType === 'custom';
  }

  /** Node CSV file loader service */
  readonly nodesLoader = CsvFileLoaderService<NodeEntry>;
  /** Options for node CSV loader */
  readonly nodesLoaderOptions: CsvFileLoaderOptions = {
    errorTolerance: 0, // Number of rows in the file that can be invalid before error is thrown
    papaparse: {
      header: true,
      dynamicTyping: {
        x: true,
        y: true,
        z: true,
      },
    },
  };

  /** Color map loader service */
  readonly colorMapLoader = ColorMapFileLoaderService;
  /** Options for color map loader */
  readonly colorMapLoaderOptions: CsvFileLoaderOptions = {
    papaparse: {
      header: true,
    },
  };

  /** Tooltip position config */
  readonly tooltipPosition = TOOLTIP_POSITION_BELOW;

  /** Whether to show upload info tooltip */
  uploadInfoOpen = false;
  /** Whether to show anchor info tooltip */
  anchorInfoOpen = false;
  /** Whether to show metadata info tooltip */
  metadataInfoOpen = false;
  /** Whether to show color map info tooltip */
  colorInfoOpen = false;
  /** Whether to show visualize info tooltip */
  visualizeInfoOpen = false;

  /** Cell types included in uploaded data */
  cellTypes = [DEFAULT_NODE_TARGET_VALUE];

  /** Node CSV load error */
  nodesLoadError?: ExtendedFileLoadError;
  /** Color map CSV load error */
  customColorMapLoadError?: ExtendedFileLoadError;

  /** Error message for nodes uploading */
  get nodesErrorMessage(): string {
    return this.nodesLoadError ? this.formatErrorMessage(this.nodesLoadError) : '';
  }

  /** Error message for color map loading */
  get colorErrorMessage(): string {
    return this.customColorMapLoadError ? this.formatErrorMessage(this.customColorMapLoadError) : '';
  }

  /** Error instructions for node upload error */
  get nodesErrorActionMessage(): string {
    return this.getErrorActionMessage(this.nodesLoadError, 'cell type table');
  }
  /** Error message for color map upload error */
  get colorErrorActionMessage(): string {
    return this.getErrorActionMessage(this.customColorMapLoadError, 'color map');
  }

  /** Current nodes */
  private nodes?: NodeEntry[];
  /** Current color map */
  private customColorMap?: ColorMapEntry[];

  /**
   * Sets node values
   * @param nodes Nodes to set
   */
  setNodes(nodes: NodeEntry[]): void {
    this.nodesLoadError = this.checkRequiredKeys(nodes, ['Cell Type', 'x', 'y']);
    if (this.nodesLoadError) {
      this.nodesFileUpload().reset();
      return;
    }

    const uniqueCellTypes = new Set(nodes.map((node) => node[DEFAULT_NODE_TARGET_KEY]));
    this.nodes = nodes;
    this.cellTypes = Array.from(uniqueCellTypes);

    const defaultCellType = uniqueCellTypes.has(DEFAULT_NODE_TARGET_VALUE)
      ? DEFAULT_NODE_TARGET_VALUE
      : this.cellTypes[0];
    this.visualizationForm.patchValue({
      nodeTargetValue: defaultCellType,
    });
  }

  /**
   * Clears all nodes and node load errors
   */
  clearNodes(): void {
    this.nodes = undefined;
    this.nodesLoadError = undefined;
  }

  /**
   * True if nodes exist and include the default node target
   * @returns boolean
   */
  hasValidNodes(): boolean {
    const { nodes } = this;
    return !!(nodes && nodes.length > 0 && DEFAULT_NODE_TARGET_KEY in nodes[0]);
  }

  /**
   * Sets custom color map
   * @param colorMap Color map entries
   */
  setCustomColorMap(colorMap: ColorMapEntry[]): void {
    this.customColorMapLoadError = this.checkRequiredKeys(colorMap, ['cell_id', 'cell_type', 'cell_color']);
    if (this.customColorMapLoadError) {
      this.customColorMapFileUpload()?.reset();
      return;
    }
    this.customColorMap = colorMap;
  }

  /**
   * Clears custom color map
   */
  clearCustomColorMap(): void {
    this.customColorMap = undefined;
    this.customColorMapLoadError = undefined;
  }

  /**
   * True if color map entries exist and include the default color key/value as the first entry
   * @returns boolean
   */
  hasValidCustomColorMap(): boolean {
    const { customColorMap: colors } = this;
    return !!(
      colors &&
      colors.length > 0 &&
      DEFAULT_COLOR_MAP_KEY in colors[0] &&
      DEFAULT_COLOR_MAP_VALUE_KEY in colors[0]
    );
  }

  /**
   * Submits data and navigates to visualization page
   */
  submit(): void {
    if (!this.nodes) {
      return;
    }

    const { nodes, customColorMap, visualizationForm } = this;
    const { nodeTargetValue, colorMapType, metadata } = visualizationForm.value;
    const colorMap = colorMapType === 'custom' && this.hasValidCustomColorMap() ? customColorMap : undefined;
    const normalizedMetadata = this.removeNullishValues({
      ...metadata,
      sourceData: this.nodesFileUpload().file?.name,
      colorMap: this.customColorMapFileUpload()?.file?.name,
      organId: metadata?.organ?.id,
      organ: metadata?.organ?.label,
      creationTimestamp: Date.now(),
    });

    this.dataService.setData(
      this.removeNullishValues({
        nodes,
        nodeTargetKey: DEFAULT_NODE_TARGET_KEY,
        nodeTargetValue,

        colorMap,
        colorMapKey: DEFAULT_COLOR_MAP_KEY,
        colorMapValueKey: DEFAULT_COLOR_MAP_VALUE_KEY,

        metadata: normalizedMetadata,
      }),
    );

    this.router.navigate(['/visualize']);
  }

  /**
   * Removes nullish values from data
   * @template T Data type
   * @param obj Data
   * @returns Data with nullish values removed
   */
  private removeNullishValues<T>(obj: T): { [KeyT in keyof T]?: NonNullable<T[KeyT]> } {
    const result = { ...obj } as Record<string, unknown>;
    for (const key in result) {
      if (result[key] === null || result[key] === undefined) {
        delete result[key];
      }
    }

    return result as { [KeyT in keyof T]?: NonNullable<T[KeyT]> };
  }

  /**
   * Checks if all required keys are present in the data
   * @param data Data
   * @param keys Required keys
   * @returns Error if any keys are missing
   */
  private checkRequiredKeys(data: object[], keys: string[]): MissingKeyError | undefined {
    const missingKeys = keys.filter((key) => !(key in data[0]));
    return missingKeys.length > 0 ? { type: 'missing-key-error', keys: missingKeys } : undefined;
  }

  /**
   * Formats error message according to the error type
   * @param error Error
   * @returns Formatted error message
   */
  private formatErrorMessage(error: ExtendedFileLoadError): string {
    switch (error.type) {
      case 'missing-key-error':
        return `Required columns missing: ${error.keys.join(', ')}`;

      case 'type-error':
        return `Invalid file type: ${error.received}, expected csv`;

      case 'parse-error': {
        if (Array.isArray(error.cause)) {
          return `Invalid file: ${this.formatCsvErrors(error.cause)}`;
        } else if (error.cause instanceof Error) {
          return 'Required columns missing: cell_color';
        }

        return 'Invalid file: too many invalid rows.';
      }

      default:
        return '';
    }
  }

  /**
   * Returns parse errors as a properly formatted string
   * @param errors Parse errors
   * @returns Formatted string
   */
  private formatCsvErrors(errors: ParseError[]): string {
    const ROW_SAMPLE_SIZE = 5;
    const rows = errors
      .slice(0, ROW_SAMPLE_SIZE)
      .map((e) => e.row)
      .filter((r) => r !== undefined)
      .join(', ');
    const additionalErrorsLength = errors.length - ROW_SAMPLE_SIZE;
    let message = `errors on row${rows.length > 1 ? 's' : ''} ${rows}`;

    if (additionalErrorsLength > 0) {
      message += ` and ${additionalErrorsLength} more rows`;
    }

    return message;
  }

  /**
   * Gets error action message
   * @param error File load error
   * @param fileDescription File type of required upload
   * @returns error action message
   */
  private getErrorActionMessage(error: ExtendedFileLoadError | undefined, fileDescription: string): string {
    switch (error?.type) {
      case undefined:
        return '';
      case 'type-error':
        return `Please upload a ${fileDescription} CSV file.`;
      default:
        return 'Please upload a CSV file with the required columns.';
    }
  }
}
