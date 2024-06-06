import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import {
  ColorMapEntry,
  ColorMapFileLoaderService,
  CsvFileLoaderOptions,
  CsvFileLoaderService,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  DEFAULT_NODE_TARGET_KEY,
  DEFAULT_NODE_TARGET_VALUE,
  NodeEntry,
  TOOLTIP_POSITION_BELOW,
} from '@hra-ui/cde-visualization';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data-service.service';
import { validateInteger } from '../../shared/form-validators/is-integer';
import { OrganEntry } from '../../shared/resolvers/organs/organs.resolver';
import { ParseError } from 'papaparse';

export interface MissingKeyError {
  type: 'missing-key';
  keys: string[];
}

export interface IncorrectFileTypeError {
  type: 'incorrect-file-type';
  expected: string;
  received?: string;
}

export interface FileParsingError {
  type: 'parsing-failure';
  errors: ParseError[];
}

export type FileError = MissingKeyError | IncorrectFileTypeError | FileParsingError;

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
    MatDividerModule,
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
  readonly organs = input.required<OrganEntry[]>();

  readonly useVerticalDividers = signal(false);
  readonly useVerticalToggleButtons = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly fbnn = this.fb.nonNullable;
  private readonly router = inject(Router);
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

  get useCustomColorMap(): boolean {
    return this.visualizationForm.value.colorMapType === 'custom';
  }

  readonly nodesLoader = CsvFileLoaderService<NodeEntry>;
  readonly nodesLoaderOptions: CsvFileLoaderOptions = {
    errorTolerance: 0,
    papaparse: {
      header: true,
      dynamicTyping: {
        x: true,
        y: true,
        z: true,
      },
    },
  };

  readonly colorMapLoader = ColorMapFileLoaderService;
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

  cellTypes = [DEFAULT_NODE_TARGET_VALUE];

  nodeLoadErrors?: FileError;

  errorMessage?: string;

  private nodes?: NodeEntry[];
  private customColorMap?: ColorMapEntry[];

  constructor() {
    this.initViewportResizeObserver();
  }

  setNodes(nodes: NodeEntry[]): void {
    this.errorMessage = '';
    this.nodeLoadErrors = this.checkRequiredKeys(nodes, ['Cell Type', 'x', 'y']);
    if (this.nodeLoadErrors) {
      this.errorMessage = `Required columns missing: ${this.nodeLoadErrors.keys.join(', ')}`;
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

  clearNodes(): void {
    this.nodes = undefined;
    this.nodeLoadErrors = undefined;
    this.errorMessage = undefined;
  }

  hasValidNodes(): boolean {
    const { nodes } = this;
    return !!(nodes && nodes.length > 0 && DEFAULT_NODE_TARGET_KEY in nodes[0]);
  }

  setCustomColorMap(colorMap: ColorMapEntry[]): void {
    this.customColorMap = colorMap;
  }

  clearCustomColorMap(): void {
    this.customColorMap = undefined;
  }

  hasValidCustomColorMap(): boolean {
    const { customColorMap: colors } = this;
    return !!(
      colors &&
      colors.length > 0 &&
      DEFAULT_COLOR_MAP_KEY in colors[0] &&
      DEFAULT_COLOR_MAP_VALUE_KEY in colors[0]
    );
  }

  submit(): void {
    if (!this.nodes) {
      return;
    }

    const { nodes, customColorMap, visualizationForm } = this;
    const { nodeTargetValue, colorMapType, metadata } = visualizationForm.value;
    const colorMap = colorMapType === 'custom' && this.hasValidCustomColorMap() ? customColorMap : undefined;
    const normalizedMetadata = this.removeNullishValues({
      ...metadata,
      organId: metadata?.organ?.id,
      organ: metadata?.organ?.label,
    });

    this.dataService.setData(
      this.removeNullishValues({
        nodes,
        nodeTargetKey: DEFAULT_NODE_TARGET_KEY,
        nodeTargetValue,

        colorMap,
        colorMapKey: DEFAULT_COLOR_MAP_KEY,
        colorMapValue: DEFAULT_COLOR_MAP_VALUE_KEY,

        metadata: normalizedMetadata,
      }),
    );

    this.router.navigate(['/visualize']);
  }

  private removeNullishValues<T>(obj: T): { [KeyT in keyof T]?: NonNullable<T[KeyT]> } {
    const result = { ...obj } as Record<string, unknown>;
    for (const key in result) {
      if (result[key] === null || result[key] === undefined) {
        delete result[key];
      }
    }

    return result as { [KeyT in keyof T]?: NonNullable<T[KeyT]> };
  }

  private initViewportResizeObserver(): void {
    const VERTICAL_DIVIDERS_MIN_WIDTH = 1920;
    const VERTICAL_TOGGLE_BUTTONS_MAX_WIDTH = 544;

    const el: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.contentBoxSize[0] ?? entry.borderBoxSize[0];
      const width = box.inlineSize;
      this.useVerticalDividers.set(width >= VERTICAL_DIVIDERS_MIN_WIDTH);
      this.useVerticalToggleButtons.set(width < VERTICAL_TOGGLE_BUTTONS_MAX_WIDTH);
    });

    const initialWidth = el.getBoundingClientRect().width;
    this.useVerticalDividers.set(initialWidth >= VERTICAL_DIVIDERS_MIN_WIDTH);
    this.useVerticalToggleButtons.set(initialWidth < VERTICAL_TOGGLE_BUTTONS_MAX_WIDTH);

    observer.observe(el);
    destroyRef.onDestroy(() => observer.disconnect());
  }

  private checkRequiredKeys(data: object[], keys: string[]): MissingKeyError | undefined {
    const item = data[0];
    const result = [];
    for (const key of keys) {
      if (!(key in item)) {
        result.push(key);
      }
    }

    if (result.length > 0) {
      return { type: 'missing-key', keys: result };
    }

    return undefined;
  }

  loadError(event: FileError) {
    console.log(event);
    if (event.type === 'incorrect-file-type') {
      this.errorMessage = `Invalid file type: ${event.received}`;
    }
  }
}
