import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { produce } from 'immer';

import {
  ColorMap,
  DEFAULT_COLOR_MAP,
  DEFAULT_SETTINGS,
  MetaData,
  MetadataSelectOption,
  VisualizationSettings,
} from './create-visualization-page-types';

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
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent implements OnInit {
  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();

  defaultCellType = 'endothelial';

  settings: VisualizationSettings = DEFAULT_SETTINGS;

  colorMap: ColorMap = DEFAULT_COLOR_MAP;

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

  cellTypes: MetadataSelectOption[] = [
    { value: 'endothelial', viewValue: 'Endothelial' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
  ];

  organs: MetadataSelectOption[] = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
  ];

  sexes: MetadataSelectOption[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  ngOnInit(): void {
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
    console.log(this.cellTypes);
  }

  upload() {
    this.dataUploaded = true;
    //load the data
  }

  removeCSV() {
    this.dataUploaded = false;
    this.settings = produce(this.settings, (draft) => {
      draft.data = {
        x: 0,
        y: 0,
        cellType: '',
      };
    });
  }

  getInput(event: Event): string | number {
    const target = event.target as HTMLInputElement;
    return target.value;
  }

  onSubmit() {
    console.warn(this.visualizationForm.value);
    this.settings = produce(this.settings, (draft) => {
      draft.metadata = this.visualizationForm.value.metadata as MetaData;
      draft.anchorCellType = this.visualizationForm.value.anchorCellType || undefined;
      draft.colorMap = this.colorMap;
    });
    console.warn(this.settings);
    this.visualize.emit(this.settings);
  }
}
