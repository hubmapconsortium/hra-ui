import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { produce } from 'immer';

import { ColorMap, CsvType, MetaData, VisualizationSettings } from '../../models/create-visualization-page-types';
import { FileUploadService, MetadataSelectOption } from '../../services/file-upload-service';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { CsvLoaderService } from '../../services/csv-loader/csv-loader.service';

const DEFAULT_SETTINGS: VisualizationSettings = {
  data: [],
  metadata: {
    sex: 'female',
  },
  colorMap: {},
};

const DEFAULT_CELL_TYPE = 'endothelial';

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
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
  readonly fileUploadService = inject(FileUploadService);
  readonly formBuilder = inject(FormBuilder);

  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();

  @ViewChild('colorMapInput') colorMapInput!: ElementRef<HTMLElement>;

  defaultCellType = DEFAULT_CELL_TYPE;

  settings: VisualizationSettings = DEFAULT_SETTINGS;

  visualizationForm = this.formBuilder.group({
    anchorCellType: [this.defaultCellType],
    metadata: this.formBuilder.group({
      title: [],
      technology: [],
      organ: [],
      sex: ['female'],
      age: [Validators.min(0)],
      thickness: [Validators.min(0)],
      pixelSize: [Validators.min(0)],
    }),
    colorMapOption: ['default'],
  });

  data?: unknown[];

  dataUploaded = false;

  colorMapUploaded = false;

  uploadedFile = '';

  uploadedColorMapFile = '';

  get anchorCellTypes(): MetadataSelectOption[] {
    return this.fileUploadService.anchorTypes();
  }

  get colorMap(): ColorMap {
    return this.fileUploadService.colorMap();
  }

  organs: MetadataSelectOption[] = [];

  sexes: MetadataSelectOption[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  service = inject(CsvLoaderService);
  loadCsv = this.service.createLoader({
    // dynamicTyping: {
    //   x: true,
    //   y: true,
    //   z: true
    // }
  });

  log(name: string, data?: unknown) {
    console.log(`From ${name}:`, data);
  }

  upload(_type: CsvType): void {
    const inputRef = this.colorMapInput;
    const fileInputElement: HTMLElement = inputRef.nativeElement;
    fileInputElement.click();
  }

  async handleFile(event: Event, type: CsvType) {
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files) {
      return;
    }

    const file = inputTarget.files[0];
    await this.fileUploadService.load(file, type, this.defaultCellType).then(() => {
      if (type === 'data') {
        this.dataUploaded = true;
        this.uploadedFile = file.name;
      } else {
        this.colorMapUploaded = true;
        this.uploadedColorMapFile = file.name;
      }
    });
  }

  removeFile(type: CsvType) {
    this.fileUploadService.remove(type);

    if (type === 'data') {
      this.dataUploaded = false;
    } else {
      this.colorMapUploaded = false;
    }
  }

  toggleDefaultColorMap(): void {
    this.fileUploadService.useDefaultColors();
  }

  getInput(event: Event): string | number {
    const target = event.target as HTMLInputElement;
    return target.value;
  }

  onSubmit() {
    if (this.dataUploaded) {
      this.settings = produce(this.settings, (draft) => {
        draft.data = this.fileUploadService.data();
        draft.metadata = this.visualizationForm.value.metadata as MetaData;
        draft.anchorCellType = this.visualizationForm.value.anchorCellType || undefined;
        draft.colorMap = this.fileUploadService.colorMap();
      });
      console.log(this.settings);
      this.visualize.emit(this.settings);
    }
  }
}
