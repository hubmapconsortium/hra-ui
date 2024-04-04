import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MetadataSelectOption,
  DEFAULT_SETTINGS,
  MetaData,
  VisualizationSettings,
} from './create-visualization-page-types';
import { produce } from 'immer';

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
  ],
  templateUrl: './create-visualization-page.component.html',
  styleUrl: './create-visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVisualizationPageComponent implements OnInit {
  @Input() defaultCellType = 'endothelial';

  @Input() cellTypes: MetadataSelectOption[] = [
    { value: 'endothelial', viewValue: 'Endothelial' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
  ];

  @Input() organs: MetadataSelectOption[] = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
  ];

  @Input() sexes: MetadataSelectOption[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();
  settings: VisualizationSettings = DEFAULT_SETTINGS;

  dataUploaded = false;

  ngOnInit(): void {
    const defaultCellTypeOption = this.cellTypes.find((celltype) => celltype.value === this.defaultCellType);
    if (defaultCellTypeOption) {
      this.cellTypes = this.cellTypes.map((option) =>
        option.value === this.defaultCellType
          ? { ...option, viewValue: `Default: ${defaultCellTypeOption.viewValue}` }
          : option,
      );
      this.updateSettings('anchorCellType', defaultCellTypeOption.value);
    } else {
      this.updateSettings('anchorCellType', 'none');
    }
    console.log(this.cellTypes);
  }

  upload() {
    this.dataUploaded = true;
    //load the data
  }

  removeCSV() {
    this.dataUploaded = false;
    this.settings.data = {
      x: 0,
      y: 0,
      cellType: '',
    };
  }

  updateSettings<K extends keyof VisualizationSettings, J extends keyof MetaData>(
    key: K,
    value: string | number,
    metadataKey?: J,
  ): void {
    let newValue: VisualizationSettings[K] | MetaData;

    if (metadataKey) {
      const newMetadata = produce(this.settings.metadata, (draft) => {
        draft[metadataKey] = value as MetaData[J];
      });
      newValue = newMetadata;
    } else {
      newValue = value as VisualizationSettings[K];
    }

    this.settings = produce(this.settings, (draft) => {
      draft[key] = newValue as VisualizationSettings[K];
    });
    console.log(this.settings);
  }

  getInput(event: Event): string | number {
    const target = event.target as HTMLInputElement;
    return target.value;
  }
}
