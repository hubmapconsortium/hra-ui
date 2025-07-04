import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import {
  ColorMapEntry,
  ColorMapFileLoaderService,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  TOOLTIP_POSITION_BELOW,
} from '@hra-ui/cde-visualization';
import { CsvFileLoaderOptions, CsvFileLoaderService } from '@hra-ui/common/fs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbsComponent } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { NavHeaderComponent } from '@hra-ui/design-system/nav-header';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { StepIndicatorComponent } from '@hra-ui/design-system/step-indicator';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { DeprecatedWorkflowCardComponent } from '@hra-ui/design-system/workflow-card';
import { DEFAULT_NODE_TARGET_SELECTOR } from '@hra-ui/node-dist-vis';
import { ColorMapView, NodesView } from '@hra-ui/node-dist-vis/models';
import { ParseError } from 'papaparse';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';
import { FileLoadError, FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data.service';
import SIDENAV_CONTENT from '../../shared/data/sidenav-content.json';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    BreadcrumbsComponent,
    ButtonsModule,
    DeprecatedWorkflowCardComponent,
    FileUploadComponent,
    MarkEmptyFormControlDirective,
    NavigationModule,
    NavHeaderComponent,
    OverlayModule,
    StepIndicatorComponent,
    TooltipCardComponent,
    ErrorIndicatorComponent,
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
  /** Organ entries */
  readonly organs = input.required<OrganEntry[]>();

  /** Data for sidenav cards */
  readonly sideNavData = SIDENAV_CONTENT;

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

  /** Cell type headers to match for preselection */
  private readonly acceptableCellTypeHeaders = ['celltype', 'cell type', 'cell_type'];
  /** Ontology ID headers to match for preselection */
  private readonly acceptableOntologyHeaders = [
    'ontologyid',
    'cellontologyid',
    'ontology id',
    'cell ontology id',
    'ontology_id',
    'cell_ontology_id',
  ];

  /** Component form controller */
  readonly visualizationForm = this.fbnn.group({
    headers: this.fb.group({
      xAxis: [{ value: '', disabled: true }],
      yAxis: [{ value: '', disabled: true }],
      cellType: [{ value: '', disabled: true }],
      zAxis: [{ value: optionalValue<string>(), disabled: true }],
      ontologyId: [{ value: optionalValue<string>(), disabled: true }],
    }),
    parameters: this.fb.group({
      nodeTargetValue: [{ value: DEFAULT_NODE_TARGET_SELECTOR, disabled: true }],
      distanceThreshold: [{ value: 1000, disabled: true }],
      pixelSizeX: [{ value: 1, disabled: true }, Validators.min(1)],
      pixelSizeY: [{ value: 1, disabled: true }, Validators.min(1)],
      pixelSizeZ: [{ value: 1, disabled: true }, Validators.min(1)],
    }),
    metadata: this.fb.group({
      title: [optionalValue<string>()],
      technology: [optionalValue<string>()],
      organ: [optionalValue<OrganEntry>()],
      sex: [optionalValue<string>()],
      age: [optionalValue<number>(), [Validators.min(0), Validators.max(120), validateInteger()]],
      thickness: [optionalValue<number>(), Validators.min(0)],
    }),
    colorMapType: ['default'],
  });

  /** Returns true is custom color map is used */
  get useCustomColorMap(): boolean {
    return this.visualizationForm.value.colorMapType === 'custom';
  }

  /** Node CSV file loader service */
  readonly nodesLoader = CsvFileLoaderService<Record<string, unknown>>;
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

  /** Tooltip content */
  readonly tooltips: TooltipContent[][] = [
    [
      {
        description:
          'Use the template to format single-cell spatial feature tables for exploration. The cell type column can include damage and proliferation markers.',
      },
    ],
    [
      {
        description: 'Verify column headers and edit as needed. Select optional column headers.',
      },
    ],
    [
      {
        title: 'Anchor Cell Type',
        description:
          'The anchor cell type represents the cell type to which the nearest cell distance distributions should be computed and visualized. Euclidian distance is used to compute the distance between two cells. \n“Endothelial” is used as the default anchor cell type. If an “Endothelial” cell label is not present, the first listed cell type label is used as the anchor cell type.',
      },
      {
        title: 'Distance Threshold (µm)',
        description: 'Configure the distance threshold to modify visualizations for analysis.',
      },
      {
        title: 'Pixel Size (µm/pixel)',
        description:
          'Pixel size is used as a scaling factor to convert coordinates to micrometers. Use 1 if coordinates are already in micrometers.',
      },
    ],
    [
      {
        description:
          'Information in these fields will not change the visualization output. Metadata may be helpful for taking screenshots of the uploaded data and resulting visualizations in the Visualization App.',
      },
    ],
    [
      {
        description:
          'Use default colors or customize the visualization by uploading a preferred color map CSV file. Cell type colors may be changed individually while exploring the visualization in the Visualization App.',
      },
    ],
    [
      {
        description: 'Data on the Create Visualization page cannot be modified after a visualization is generated.',
      },
    ],
  ];

  /** Whether to show upload info tooltip */
  uploadInfoOpen = false;
  /** Whether to show organize data tooltip */
  organizeDataInfoOpen = false;

  /** Whether to show parameters tooltip */
  parametersInfoOpen = false;

  /** Whether to show metadata info tooltip */
  metadataInfoOpen = false;

  /** Whether to show color map info tooltip */
  colorInfoOpen = false;

  /** Whether to show visualize info tooltip */
  visualizeInfoOpen = false;

  /** Cell types included in uploaded data */
  cellTypes = [DEFAULT_NODE_TARGET_SELECTOR];

  /** Headers for node data */
  dataHeaders: string[] = [];

  /** Node CSV load error */
  nodesLoadError?: ExtendedFileLoadError;
  /** Color map CSV load error */
  customColorMapLoadError?: ExtendedFileLoadError;

  /** Node CSV load progress*/
  nodeProgress = 0;
  /** Color map CSV load progress */
  colorProgress = 0;

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

  /** Error message for missing data columns */
  get columnErrorActionMessage(): string | undefined {
    if (!this.nodes) {
      return undefined;
    }
    const { xAxis, yAxis, cellType } = this.visualizationForm.controls['headers'].value;
    const xError = xAxis ? undefined : 'X Axis';
    const yError = yAxis ? undefined : 'Y Axis';
    const ctError = cellType ? undefined : 'Cell Type';
    const errorColumns = [xError, yError, ctError].filter((e) => !!e);

    return errorColumns.length > 0
      ? `Please select the required column header${errorColumns.length === 1 ? '' : 's'}: ${[xError, yError, ctError].filter((e) => !!e).join(', ')}`
      : undefined;
  }

  /** Current nodes */
  private nodes?: Record<string, unknown>[];
  /** Current color map */
  private customColorMap?: ColorMapEntry[];

  /**
   * Sets node values
   * @param nodes Nodes to set
   */
  setNodes(nodes: Record<string, unknown>[]): void {
    this.setHeaders(nodes);

    const cellTypeHeader = this.visualizationForm.controls['headers'].value.cellType as string;
    const uniqueCellTypes = new Set(nodes.map((node) => node[cellTypeHeader] as string));
    this.nodes = nodes;
    this.cellTypes = Array.from(uniqueCellTypes);

    const defaultCellType = uniqueCellTypes.has(DEFAULT_NODE_TARGET_SELECTOR)
      ? DEFAULT_NODE_TARGET_SELECTOR
      : this.cellTypes[0];
    this.visualizationForm.controls['parameters'].patchValue({
      nodeTargetValue: defaultCellType,
    });
  }

  /**
   * Sets node data headers for visualization form
   * @param nodes Node data entries
   */
  private setHeaders(nodes: Record<string, unknown>[]): void {
    this.dataHeaders = nodes[0] ? Object.keys(nodes[0]) : [];
    this.visualizationForm.controls['headers'].setValue({
      xAxis: this.preSelectedHeader('x'),
      yAxis: this.preSelectedHeader('y'),
      cellType: this.preSelectedHeader('cellType'),
      zAxis: this.preSelectedHeader('z'),
      ontologyId: this.preSelectedHeader('ontologyId'),
    });
    this.visualizationForm.controls['headers'].enable();
    this.visualizationForm.controls['parameters'].enable();
  }

  /**
   * If a header in the data matches one of the preselected options for a field, return that header
   * @param field Field to look for matches
   * @returns selected header
   */
  private preSelectedHeader(field: string): string | null {
    if (['x', 'y', 'z'].includes(field)) {
      return this.dataHeaders.find((h) => h.toLowerCase() === field) || null;
    } else if (field === 'cellType') {
      return this.dataHeaders.find((h) => this.acceptableCellTypeHeaders.includes(h.toLowerCase())) || null;
    } else if (field === 'ontologyId') {
      return this.dataHeaders.find((h) => this.acceptableOntologyHeaders.includes(h.toLowerCase())) || null;
    }
    return null;
  }

  /**
   * Clears all nodes and node load errors
   */
  clearNodes(): void {
    this.nodeProgress = 0;
    this.nodes = undefined;
    this.nodesLoadError = undefined;
    this.setHeaders([]);
    this.visualizationForm.controls['headers'].disable();
    this.visualizationForm.controls['parameters'].disable();
  }

  /**
   * True if nodes exist and include the default node target
   * @returns boolean
   */
  hasValidNodes(): boolean {
    // Set the cell type header value when valid nodes checked
    const cellTypeHeader = this.visualizationForm.controls['headers'].value.cellType as string;
    if (cellTypeHeader && this.nodes) {
      const uniqueCellTypes = new Set(this.nodes.map((node) => node[cellTypeHeader] as string));
      this.cellTypes = Array.from(uniqueCellTypes);
    }
    const { nodes } = this;
    return !!(nodes && nodes.length > 0 && cellTypeHeader in nodes[0]);
  }

  /**
   * Determines whether all required fields have been provided
   * @returns true if all required data has been filled in
   */
  hasValidData(): boolean {
    const { xAxis, yAxis, cellType } = this.visualizationForm.controls['headers'].value;
    const { nodeTargetValue, pixelSizeX, pixelSizeY, pixelSizeZ, distanceThreshold } =
      this.visualizationForm.controls['parameters'].value;
    return (
      !!xAxis &&
      !!yAxis &&
      !!cellType &&
      !!nodeTargetValue &&
      !!pixelSizeX &&
      !!pixelSizeY &&
      !!pixelSizeZ &&
      !!distanceThreshold
    );
  }

  /**
   * Sets custom color map
   * @param colorMap Color map entries
   */
  setCustomColorMap(colorMap: ColorMapEntry[]): void {
    this.customColorMapLoadError = this.checkRequiredKeys(colorMap, [
      DEFAULT_COLOR_MAP_KEY,
      DEFAULT_COLOR_MAP_VALUE_KEY,
    ]);
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
    this.colorProgress = 0;
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
    const { colorMapType, metadata } = visualizationForm.value;
    const headers = visualizationForm.value.headers;

    const nodesView = new NodesView(nodes, {
      'Cell Type': headers?.cellType ?? '',
      'Cell Ontology ID': headers?.ontologyId ?? undefined,
      X: headers?.xAxis ?? '',
      Y: headers?.yAxis ?? '',
      Z: headers?.zAxis ?? undefined,
    });

    const colorMapView =
      colorMapType === 'custom' && this.hasValidCustomColorMap() && customColorMap
        ? new ColorMapView(customColorMap, {
            'Cell Type': DEFAULT_COLOR_MAP_KEY,
            'Cell Color': DEFAULT_COLOR_MAP_VALUE_KEY,
          })
        : undefined;

    const nodeTargetSelector = visualizationForm.value.parameters
      ? visualizationForm.value.parameters.nodeTargetValue
      : undefined;
    const normalizedMetadata = this.removeNullishValues({
      ...metadata,
      sourceFileName: this.nodesFileUpload().file?.name,
      colorMapFileName: this.customColorMapFileUpload()?.file?.name,
      organ: metadata?.organ?.label,
      creationTimestamp: Date.now(),
    });

    const nullishRemovedData = this.removeNullishValues({
      nodes: nodesView,
      nodeTargetSelector,
      colorMap: colorMapView,
      metadata: normalizedMetadata,
    });

    this.dataService.setData(nullishRemovedData);
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
        return `Required column${error.keys.length === 1 ? '' : 's'} missing: ${error.keys.join(', ')}`;

      case 'type-error':
        return `Invalid file type: ${error.received}, expected csv`;

      case 'parse-error': {
        if (Array.isArray(error.cause)) {
          return `Invalid file: ${this.formatCsvErrors(error.cause)}`;
        } else if (error.cause instanceof Error) {
          return `Required color format not detected. Please use [R, G, B].`;
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
        return 'Please upload a file with the required columns.';
    }
  }
}
