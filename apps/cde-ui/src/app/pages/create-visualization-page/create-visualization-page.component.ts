import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ColorMap, ColorMapItem, VisualizationSettings } from '../../models/create-visualization-page-types';
import { CellTypeTableData, MetadataSelectOption } from '../../services/file-upload-service';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { CsvLoaderService } from '../../services/csv-loader/csv-loader.service';
import { MatDividerModule } from '@angular/material/divider';
import { validateInteger } from '../../shared/form-validators/is-integer';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MarkEmptyFormControlDirective } from '../../components/empty-form-control/empty-form-control.directive';

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
  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();

  private readonly formBuilder = inject(FormBuilder);

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

  data?: CellTypeTableData[];
  colorMap?: ColorMap;
  selectedValue?: string;
  organs: MetadataSelectOption[] = [];
  service = inject(CsvLoaderService);
  loadCsv = this.service.createLoader<CellTypeTableData>({
    dynamicTyping: {
      x: true,
      y: true,
      z: true,
    },
  });
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

  anchorCellTypes: MetadataSelectOption[] = [];
  useDefaultColorMap = true;

  setData(data: CellTypeTableData[]): void {
    const cellTypes = data.map((item) => item.cellType);
    const uniqueCellTypes = Array.from(new Set(cellTypes));

    this.data = data;
    this.anchorCellTypes = uniqueCellTypes.map((type) => ({
      value: type,
      viewValue: type,
    }));
  }

  toggleDefaultColorMap(): void {
    this.useDefaultColorMap = !this.useDefaultColorMap;
  }

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
