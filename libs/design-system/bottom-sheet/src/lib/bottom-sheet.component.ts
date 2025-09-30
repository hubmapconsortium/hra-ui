import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { HraCommonModule } from '@hra-ui/common';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/**
 * Interface for individual page section data
 */
export interface PageSectionData {
  /** Tagline for the page section */
  tagline: string;
  /** Optional content text for the section */
  content?: string;
}

/**
 * Interface for the Table Bottom Sheet Data
 */
interface TableBottomSheetData {
  /** Variant of the bottom sheet data */
  variant: 'table';
  /** rows for the table */
  rows: TableRow[];
  /** columns for the table */
  columns: TableColumn[];
  /** Optional flag to hide headers */
  hideHeaders?: boolean;
}

/**
 * Interface for the Page Section Bottom Sheet Data (single section)
 */
interface SinglePageSectionBottomSheetData {
  /** Variant of the bottom sheet data */
  variant: 'page-section';
  /** Tagline for the page section */
  tagline: string;
  /** Optional content text for the section */
  content?: string;
}

/**
 * Interface for the Multiple Page Sections Bottom Sheet Data
 */
interface MultiplePageSectionsBottomSheetData {
  /** Variant of the bottom sheet data */
  variant: 'page-sections';
  /** Array of page sections */
  sections: PageSectionData[];
}

/**
 * Union type for the Bottom Sheet Data
 */
export type BottomSheetData =
  | TableBottomSheetData
  | SinglePageSectionBottomSheetData
  | MultiplePageSectionsBottomSheetData;

/**
 * Bottom Sheet Component
 * Displays a bottom sheet with either a table, single page section, or multiple page sections based on the provided data.
 */
@Component({
  selector: 'hra-bottom-sheet',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, TableComponent, PageSectionComponent, ScrollingModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  /** Reference to the bottom sheet */
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<BottomSheetComponent>);

  /** Data injected into the bottom sheet */
  protected readonly data = inject<BottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  /** Function to close the bottom sheet */
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
