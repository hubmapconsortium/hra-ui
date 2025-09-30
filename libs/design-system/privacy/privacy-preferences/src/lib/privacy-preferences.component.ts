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

export type PrivacyPreferencesTab = 'consent' | 'manage';

export interface PrivacyPreferencesData {
  categories: Categories;
  tab?: PrivacyPreferencesTab;
  disableClose?: boolean;
}

export type PrivacyPreferencesResult = 'allow-all' | 'allow-necessary' | 'dismiss' | Categories;

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
  protected readonly data = inject<PrivacyPreferencesData>(MAT_DIALOG_DATA);

  /** Tab index */
  protected readonly tabIndex = signal(tabIdToIndex[this.data.tab ?? 'consent']);

  protected readonly categories = signal(this.data.categories);
}
