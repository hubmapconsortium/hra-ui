import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface VisualizationSettings {
  data: CellTypeTableData;
  anchorCellType?: string;
  metadata: MetaData;
  colorMap: Color[];
}

export interface CellTypeTableData {
  x: number;
  y: number;
  cellType: string;
  z?: number;
  ontologyId?: string;
}

export interface MetaData {
  title?: string;
  sex?: string;
  thickness?: number;
  technology?: string;
  age?: number;
  pixelSize?: number;
  organ?: string;
}

export interface Color {
  cellType: number[];
}

export interface CellTypeOption {
  value: string;
  default?: boolean;
  viewValue: string;
}

const defaultSettings: VisualizationSettings = {
  data: {
    x: 0,
    y: 0,
    cellType: '',
  },
  metadata: {},
  colorMap: [],
};

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
export class CreateVisualizationPageComponent {
  settings: VisualizationSettings = defaultSettings;

  dataUploaded = false;

  @Output() readonly visualize = new EventEmitter<VisualizationSettings>();

  selectedValue: string = 'a';

  cellTypes: CellTypeOption[] = [
    { value: 'a', viewValue: 'Endothelial', default: true },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
  ];

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
    this.settings = { ...this.settings, anchorCellType: value };
  }
}
