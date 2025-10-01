import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { HraCommonModule } from '@hra-ui/common';
import { Categories } from '@hra-ui/common/analytics';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule as HraScrollingModule } from '@hra-ui/design-system/scrolling';
import { CategoriesComponent } from './categories/categories.component';

/** Tab identifiers */
export type PrivacyPreferencesTab = 'consent' | 'manage';

/** Interface of data passed to the Privacy Preferences Modal */
export interface PrivacyPreferencesData {
  /** Categories */
  categories: Categories;
  /**
   * Privacy preferences tab
   */
  tab?: PrivacyPreferencesTab;
}

/** Result type returned when the Privacy Preferences Modal is closed */
export type PrivacyPreferencesResult = 'allow-all' | 'allow-necessary' | 'dismiss' | Categories;

/** Mapping of tab IDs to their respective index */
const tabIdToIndex: Record<PrivacyPreferencesTab, number> = {
  consent: 0,
  manage: 1,
};

/**
 * Privacy Preferences Modal Component
 */
@Component({
  selector: 'hra-privacy-preferences',
  imports: [
    HraCommonModule,
    BrandModule,
    ButtonsModule,
    IconsModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    HraScrollingModule,
    CategoriesComponent,
  ],
  templateUrl: './privacy-preferences.component.html',
  styleUrl: './privacy-preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPreferencesComponent {
  /** Injected data */
  protected readonly data = inject<PrivacyPreferencesData>(MAT_DIALOG_DATA);
  /** Tab index */
  protected readonly tabIndex = signal(tabIdToIndex[this.data.tab ?? 'consent']);
  /** Categories */
  protected readonly categories = signal(this.data.categories);
}
