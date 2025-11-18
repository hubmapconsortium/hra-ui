import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
 * Union type for the Page Section Bottom Sheet Data
 */
export type PageSectionBottomSheetData = SinglePageSectionBottomSheetData | MultiplePageSectionsBottomSheetData;

/**
 * Page Section Bottom Sheet Component
 * Displays a bottom sheet with either a single page section or multiple page sections based on the provided data.
 */
@Component({
  selector: 'hra-page-section-bottom-sheet',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, PageSectionComponent, ScrollingModule],
  templateUrl: './page-section-bottom-sheet.component.html',
  styleUrl: './page-section-bottom-sheet.component.scss',
})
export class PageSectionBottomSheetComponent {
  /** Reference to the bottom sheet */
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<PageSectionBottomSheetComponent>);

  /** Data injected into the bottom sheet */
  protected readonly data = inject<PageSectionBottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  /** Function to close the bottom sheet */
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
