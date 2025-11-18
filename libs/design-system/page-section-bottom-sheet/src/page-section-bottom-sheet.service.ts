import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PageSectionBottomSheetComponent, PageSectionData } from './lib/page-section-bottom-sheet.component';

/**
 * Service to handle page section bottom sheet operations.
 * Provides methods to open different types of page section bottom sheets.
 */
@Injectable({ providedIn: 'root' })
export class PageSectionBottomSheetService {
  /** Injects the MatBottomSheet service to open bottom sheets */
  private readonly _bottomSheet = inject(MatBottomSheet);

  /**
   * Opens a page section bottom sheet with the provided tagline.
   * @param tagline - The tagline to display in the page section
   * @param content - Optional content text for the section
   */
  openPageSectionBottomSheet(tagline: string, content?: string) {
    return this._bottomSheet.open(PageSectionBottomSheetComponent, {
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
    return this._bottomSheet.open(PageSectionBottomSheetComponent, {
      data: {
        variant: 'page-sections',
        sections,
      },
    });
  }
}
