import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CellTypeOption, DEFAULT_SETTINGS, VisualizationSettings } from './create-visualization-page-types';
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

  @Input() cellTypes: CellTypeOption[] = [
    { value: 'none', viewValue: 'None' },
    { value: 'endothelial', viewValue: 'Endothelial' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
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

  updateAnchorCellType(value: string) {
    this.updateSettings('anchorCellType', value);
  }

  updateSettings<K extends keyof VisualizationSettings>(key: K, value: VisualizationSettings[K]): void {
    this.settings = produce(this.settings, (draft) => {
      draft[key] = value;
    });
    console.log(this.settings);
  }
}
