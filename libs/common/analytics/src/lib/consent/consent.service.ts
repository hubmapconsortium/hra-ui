import { Injectable, signal } from '@angular/core';
import { EventCategory, EventType } from '@hra-ui/common/analytics/events';

/** Set of categories and whether each is enabled/disabled */
export type Categories = Record<EventCategory, boolean>;

/**
 * Helper for creating categories enabled/disabled records
 *
 * @param enabled Whether to set categories to enabled or disabled
 * @returns A record of all categories with their values set to `enabled`
 */
function createCategoryPreferences(enabled: boolean): Categories {
  return Object.values(EventCategory).reduce((acc, category) => {
    acc[category] = enabled;
    return acc;
  }, {} as Categories);
}

/** Record where every category is set to enabled */
const ALL_CATEGORIES_ENABLED = createCategoryPreferences(true);
/** Record where every category is set to disabled */
const ALL_CATEGORIES_DISABLED = createCategoryPreferences(false);
/** Record of categories that should always be enabled */
const ALWAYS_ENABLED_CATEGORIES = { [EventCategory.Necessary]: true };
/** Initial categories settings */
export const INITIAL_CATEGORY_SETTINGS = { ...ALL_CATEGORIES_DISABLED, ...ALWAYS_ENABLED_CATEGORIES };

/**
 * User preferences manager service
 */
@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  /** Writable signal containing record of enabled/disable categories */
  private readonly categories_ = signal(INITIAL_CATEGORY_SETTINGS);

  /** Record of enabled/disable categories */
  readonly categories = this.categories_.asReadonly();

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
   * Check whether an event is enabled or disabled
   *
   * @param _type Event type
   * @param category Event category
   * @returns Whether the event is enabled
   */
  isEventEnabled(_type: EventType, category?: EventCategory): boolean {
    return category !== undefined && this.isCategoryEnabled(category);
  }

  /**
   * Enables all event categories
   */
  enableAllCategories(): void {
    this.categories_.set(ALL_CATEGORIES_ENABLED);
  }

  /**
   * Disable all event categories except the ones
   * that should always be enabled, i.e. `EventCategory.Necessary`
   */
  disableAllCategories(): void {
    this.categories_.set(INITIAL_CATEGORY_SETTINGS);
  }

  /**
   * Update the enabled/disabled event categories
   *
   * @param updates Category updates
   */
  updateCategories(updates: Partial<Categories>): void {
    this.categories_.update((current) => ({
      ...current,
      ...updates,
      ...ALWAYS_ENABLED_CATEGORIES,
    }));
  }

  /**
   * Enable a single event category
   *
   * @param category Category to enable
   */
  enableCategory(category: EventCategory): void {
    this.updateCategories({ [category]: true });
  }

  /**
   * Disable a single event category except if it is a category
   * that is always enabled, i.e. `EventCategory.Necessary`
   *
   * @param category Category to disable
   */
  disableCategory(category: EventCategory): void {
    this.updateCategories({ [category]: false });
  }
}
