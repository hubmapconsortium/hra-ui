import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
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
} from '@hra-ui/cde-visualization';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data-service.service';
import { validateInteger } from '../../shared/form-validators/is-integer';

/** Metadata select dropdown option */
interface MetadataSelectOption {
  /** Value */
  value: string;
  /** User text */
  viewValue: string;
}

function optionalValue<T>(): T | null {
  return null;
}

/** Visualization customization page */
@Component({
  selector: 'cde-create-visualization-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FileUploadComponent,
    MatDividerModule,
    HeaderComponent,
    FooterComponent,
    MarkEmptyFormControlDirective,
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
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
      organ: [optionalValue<string>()],
      sex: [optionalValue<string>()],
      age: [optionalValue<number>(), validateInteger()],
      thickness: [optionalValue<number>()],
      pixelSize: [optionalValue<number>()],
    }),
    colorMapType: ['default'],
  });

  get useCustomColorMap(): boolean {
    return this.visualizationForm.value.colorMapType === 'custom';
  }

  readonly nodesLoader = CsvFileLoaderService<NodeEntry>;
  readonly nodesLoaderOptions: CsvFileLoaderOptions = {
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

  cellTypes = [DEFAULT_NODE_TARGET_VALUE];

  private nodes?: NodeEntry[];
  private customColorMap?: ColorMapEntry[];

  /** Organ options */
  organs: MetadataSelectOption[] = [];

  setNodes(nodes: NodeEntry[]): void {
    this.nodes = nodes;

    const uniqueCellTypes = new Set(nodes.map((node) => node[DEFAULT_NODE_TARGET_KEY]));
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
    this.dataService.setData(
      this.removeNullishValues({
        nodes,
        nodeTargetKey: DEFAULT_NODE_TARGET_KEY,
        nodeTargetValue,

        colorMap,
        colorMapKey: DEFAULT_COLOR_MAP_KEY,
        colorMapValue: DEFAULT_COLOR_MAP_VALUE_KEY,

        metadata: this.removeNullishValues(metadata),
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
}
