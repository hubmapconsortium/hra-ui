import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

export type BottomSheetVariant = 'table' | 'page-section';

export interface BottomSheetData {
  variant: BottomSheetVariant;
  tagline?: string;
  rows?: TableRow[];
  columns?: TableColumn[];
}

@Component({
  selector: 'hra-bottom-sheet',
  imports: [CommonModule, ButtonsModule, MatIconModule, TableComponent, PageSectionComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<BottomSheetComponent>);

  readonly data = inject<BottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
