import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ColorMap, ColorMapItem, VisualizationSettings } from '../../models/create-visualization-page-types';
import { CsvLoaderService } from '../../services/csv-loader/csv-loader.service';
import { validateInteger } from '../../shared/form-validators/is-integer';
import { OverlayModule } from '@angular/cdk/overlay';
import { TOOLTIP_POSITION_LEFT_SIDE } from '@hra-ui/cde-visualization';

/** Metadata select dropdown option */
export interface MetadataSelectOption {
  /** Value */
  value: string;
  /** User text */
  viewValue: string;
}

/** Node data row */
export interface CellTypeTableData {
  /** x position */
  x: number;
  /** y position */
  y: number;
  /** Cell type */
  cellType: string;
  /** Optional z position */
  z?: number;
  /** Ontology id */
  ontologyId?: string;
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
    OverlayModule,
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
  /** Emits user data */
  readonly visualize = output<VisualizationSettings>();

  /** Form builder */
  private readonly formBuilder = inject(FormBuilder);

  /** Component form controller */
  visualizationForm = this.formBuilder.nonNullable.group({
    anchorCellType: [''],
    metadata: this.formBuilder.nonNullable.group({
      title: [''],
      technology: [''],
      organ: [''],
      sex: [''],
      age: [undefined, [Validators.min(0), Validators.max(120), validateInteger()]],
      thickness: [undefined, Validators.min(0)],
      pixelSize: [undefined, Validators.min(0)],
    }),
    colorMapOption: ['default'],
  });

  /** Node data */
  data?: CellTypeTableData[];
  /** Color map data */
  colorMap?: ColorMap;
  /** ??? */
  selectedValue?: string;
  /** Organ options */
  organs: MetadataSelectOption[] = [];
  /** File loader factory service */
  service = inject(CsvLoaderService);
  /** Node data file loader */
  loadCsv = this.service.createLoader<CellTypeTableData>({
    dynamicTyping: {
      x: true,
      y: true,
      z: true,
    },
  });
  /** Color map file loader */
  loadColorMap = this.service.createLoader<ColorMapItem>({
    dynamicTyping: {
      cell_id: true,
    },
    transformItem: (item) =>
      ({
        ...item,
        cell_color: JSON.parse(`${item['cell_color']}`),
      }) as ColorMapItem,
  });

  /** Node cell type values */
  anchorCellTypes: MetadataSelectOption[] = [];
  /** Whether to use the default color map */
  useDefaultColorMap = true;

  uploadInfoOpen = false;
  anchorInfoOpen = false;
  metadataInfoOpen = false;
  colorInfoOpen = false;
  visualizeInfoOpen = false;

  readonly tooltipPosition = TOOLTIP_POSITION_LEFT_SIDE;

  /**
   * Sets the loaded node data
   *
   * @param data Nodes data
   */
  setData(data: CellTypeTableData[]): void {
    const cellTypes = data.map((item) => item.cellType);
    const uniqueCellTypes = Array.from(new Set(cellTypes));

    this.data = data;
    this.anchorCellTypes = uniqueCellTypes.map((type) => ({
      value: type,
      viewValue: type,
    }));
  }

  /**
   * Toggle to/from using the default color map
   */
  toggleDefaultColorMap(): void {
    this.useDefaultColorMap = !this.useDefaultColorMap;
  }

  /**
   * Emits the user data
   */
  onSubmit() {
    if (this.data) {
      this.visualize.emit({
        ...this.visualizationForm.getRawValue(),
        data: this.data,
        colorMap: this.useDefaultColorMap ? undefined : this.colorMap,
      });
    }
  }
}
