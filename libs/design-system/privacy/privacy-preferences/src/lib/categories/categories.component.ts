import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { Categories } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { CATEGORY_DEFS } from './category-defs';

/**
 * Categories Component
 */
@Component({
  selector: 'hra-categories',
  imports: [HraCommonModule, CdkAccordionModule, ButtonsModule, IconsModule, MatDividerModule, MatSlideToggleModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  /**
   * Categories  of categories component
   */
  readonly categories = model.required<Categories>();
  /** Definitions of all categories */
  protected readonly categoryDefs = CATEGORY_DEFS;

  /** Toggle a category on or off
   * @param id - ID of the category to toggle
   * @param checked - Whether the category is enabled or disabled
   */
  toggleCategory(id: EventCategory, checked: boolean): void {
    this.categories.update((current) => ({ ...current, [id]: checked }));
  }
}
