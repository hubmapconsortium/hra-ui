import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { produce } from 'immer';

import {
  CellTypeTableData,
  ColorMap,
  CsvType,
  DEFAULT_COLOR_MAP,
  DEFAULT_SETTINGS,
  MetaData,
  MetadataSelectOption,
  VisualizationSettings,
} from '../../models/create-visualization-page-types';
import { CellTypeDataService } from '../../services/cell-type-data-service';
import { MockCellTypeDataService } from '../../services/service.mock';

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
  ],
  providers: [
    {
      provide: CellTypeDataService,
      useExisting: MockCellTypeDataService,
    },
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent {
  private readonly cellTypeDataService = inject(CellTypeDataService);

  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLElement>;

  @ViewChild('colorMapInput') colorMapInput!: ElementRef<HTMLElement>;

  defaultCellType = 'type a';

  settings: VisualizationSettings = DEFAULT_SETTINGS;

  uploadedData: CellTypeTableData[] = [];

  colorMap: ColorMap = DEFAULT_SETTINGS.colorMap;

  visualizationForm = new FormGroup({
    anchorCellType: new FormControl<string>(this.defaultCellType),
    metadata: new FormGroup({
      title: new FormControl<string>(''),
      technology: new FormControl<string>(''),
      organ: new FormControl<string>(''),
      sex: new FormControl<string>('female'),
      age: new FormControl<number>(NaN),
      thickness: new FormControl<number>(NaN),
      pixelSize: new FormControl<number>(NaN),
    }),
    colorMapOption: new FormControl<string>('default'),
  });

  dataUploaded = false;

  colorMapUploaded = false;

  uploadedFile = '';

  uploadedColorMapFile = '';

  cellTypes: MetadataSelectOption[] = [];

  organs: MetadataSelectOption[] = [];

  sexes: MetadataSelectOption[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  setDefaultCellType(): void {
    const defaultCellTypeOption = this.cellTypes.find((celltype) => celltype.value === this.defaultCellType);
    if (defaultCellTypeOption) {
      this.cellTypes = this.cellTypes.map((option) =>
        option.value === this.defaultCellType
          ? { ...option, viewValue: `Default: ${defaultCellTypeOption.viewValue}` }
          : option,
      );
      this.visualizationForm.patchValue({
        anchorCellType: defaultCellTypeOption.value,
      });
    } else {
      this.visualizationForm.patchValue({
        anchorCellType: '',
      });
    }
    this.defaultCellType = this.cellTypes[0].value ?? '';
    this.visualizationForm.value.anchorCellType = this.cellTypes[0].value;
  }

  upload(type: CsvType): void {
    const inputRef = type === 'data' ? this.fileInput : this.colorMapInput;
    const fileInputElement: HTMLElement = inputRef.nativeElement;
    fileInputElement.click();
  }

  handleFile(event: Event, type: CsvType) {
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files) {
      return;
    }

    const file = inputTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (type === 'data') {
        this.cellTypeDataService.getCellTypeData().then((result) => {
          this.cellTypes = result.map((result) => {
            return {
              value: result.cellType,
              viewValue: result.cellType
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            };
          });
          this.setDefaultCellType();
          this.uploadedData = result;
        });
      } else {
        this.cellTypeDataService.getColorMap().then((result) => {
          this.colorMap = result;
        });
      }
    };

    if (type === 'data') {
      this.dataUploaded = true;
      this.uploadedFile = file.name;
    } else {
      this.colorMapUploaded = true;
      this.uploadedColorMapFile = file.name;
    }
    fileReader.readAsText(file);
  }

  removeFile(type: CsvType) {
    if (type === 'data') {
      this.dataUploaded = false;
      this.visualizationForm.value.anchorCellType = undefined;
      this.cellTypes = [];
      this.uploadedData = [];
    } else {
      this.colorMapUploaded = false;
      this.colorMap = {};
    }
  }

  getInput(event: Event): string | number {
    const target = event.target as HTMLInputElement;
    return target.value;
  }

  onSubmit() {
    if (this.dataUploaded) {
      this.settings = produce(this.settings, (draft) => {
        draft.data = this.uploadedData;
        draft.metadata = this.visualizationForm.value.metadata as MetaData;
        draft.anchorCellType = this.visualizationForm.value.anchorCellType || undefined;
        draft.colorMap = this.colorMap;
      });
      console.log(this.settings);
      this.visualize.emit(this.settings);
    }
  }

  toggleDefaultColorMap(): void {
    this.colorMap = DEFAULT_COLOR_MAP;
  }
}
