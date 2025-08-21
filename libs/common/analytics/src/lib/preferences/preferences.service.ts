import { Injectable, signal } from '@angular/core';
import { EventCategory } from '@hra-ui/common/analytics/events';

/**
 * Helper for creating categories enabled/disabled records
 *
 * @param enabled Whether to set categories to enabled or disabled
 * @returns A record of all categories with their values set to `enabled`
 */
function createCategoryPreferences(enabled: boolean): Record<EventCategory, boolean> {
  return Object.values(EventCategory).reduce(
    (acc, category) => {
      acc[category] = enabled;
      return acc;
    },
    {} as Record<EventCategory, boolean>,
  );
}

/** Record where every category is set to enabled */
const ALL_CATEGORIES_ENABLED = createCategoryPreferences(true);
/** Record where every category is set to disabled */
const ALL_CATEGORIES_DISABLED = createCategoryPreferences(false);
/** Record of categories that should always be enabled */
const ALWAYS_ENABLED_CATEGORIES = { [EventCategory.Necessary]: true };
/** Initial categories settings */
const INITIAL_CATEGORY_PREFERENCES = { ...ALL_CATEGORIES_DISABLED, ...ALWAYS_ENABLED_CATEGORIES };

/**
 * User preferences manager service
 */
@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  /** Writable signal containing record of enabled/disable categories */
  private readonly categoriesImpl = signal(INITIAL_CATEGORY_PREFERENCES);

  /** Record of enabled/disable categories */
  readonly categories = this.categoriesImpl.asReadonly();

  /**
   * Test whether a category is enabled or disabled
   *
   * @param category Category to test
   * @returns true if the event category is enabled, false otherwise
   */
  isCategoryEnabled(category: EventCategory): boolean {
    return this.categories()[category];
  }

  /**
   * Enables all event categories
   */
  enableAllCategories(): void {
    this.categoriesImpl.set(ALL_CATEGORIES_ENABLED);
  }

  /**
   * Disable all event categories except the ones that should always be enabled, i.e. `EventCategory.Necessary`
   */
  disableAllCategories(): void {
    this.categoriesImpl.set(INITIAL_CATEGORY_PREFERENCES);
  }

  /**
   * Enable a single event category
   *
   * @param category Category to enable
   */
  enableCategory(category: EventCategory): void {
    this.categoriesImpl.update((current) => ({ ...current, [category]: true }));
  }

  /**
   * Disable a single event category except if it is a category that is always enabled, i.e. `EventCategory.Necessary`
   *
   * @param category Category to disable
   */
  disableCategory(category: EventCategory): void {
    this.categoriesImpl.update((current) => ({ ...current, [category]: false, ...ALWAYS_ENABLED_CATEGORIES }));
  }
}
