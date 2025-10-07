import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent, PageSectionData } from './lib/bottom-sheet.component';
import { TableRow, TableColumn } from '@hra-ui/design-system/table';

/**
 * Service to handle bottom sheet operations.
 * Provides methods to open different types of bottom sheets.
 */
@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  /** Injects the MatBottomSheet service to open bottom sheets */
  private readonly _bottomSheet = inject(MatBottomSheet);

  /**
   * Opens a table bottom sheet with the provided rows and columns.
   * @param rows - The table rows to display
   * @param columns - The table columns to display
   * @param hideHeaders - Whether to hide table headers
   */
  openTableBottomSheet(rows: TableRow[], columns: TableColumn[], hideHeaders = false) {
    return this._bottomSheet.open(BottomSheetComponent, {
      data: {
        variant: 'table',
        rows,
        columns,
        hideHeaders,
      },
    });
  }

  /**
   * Opens a page section bottom sheet with the provided tagline.
   * @param tagline - The tagline to display in the page section
   * @param content - Optional content text for the section
   */
  openPageSectionBottomSheet(tagline: string, content?: string) {
    return this._bottomSheet.open(BottomSheetComponent, {
      data: {
        variant: 'page-section',
        tagline,
        content,
      },
    });
  }

  /**
   * Opens a multiple page sections bottom sheet with the provided sections.
   * @param sections - Array of page section data
   */
  openMultiplePageSectionsBottomSheet(sections: PageSectionData[]) {
    return this._bottomSheet.open(BottomSheetComponent, {
      data: {
        variant: 'page-sections',
        sections,
      },
    });
  }
}
