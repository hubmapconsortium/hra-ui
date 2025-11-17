import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';

/** Content button interface */
export interface ContentButton {
  /** Link for the button */
  link: string;
  /** Whether the link is external */
  external: boolean;
  /** Image url */
  imageSrc: string;
  /** Date as timestamp or string */
  date: number | string;
  /** Tagline to display on card */
  tagline: string;
  /** Tags to display on bottom of the card (2 total) */
  tags: string[];
  /** Categories the card belongs to */
  categories: string[];
}

/** Sorting behavior type */
export type SortBy = 'newest' | 'oldest' | 'nameAsc' | 'nameDes';

/**
 * A responsive grid container grouped by a single-select button toggle
 */
@Component({
  selector: 'hra-content-button-grid',
  imports: [HraCommonModule, ContentButtonComponent, MatButtonToggleModule, GridContainerComponent],
  templateUrl: './content-button-grid.component.html',
  styleUrl: './content-button-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentButtonGridComponent {
  /** Card data for the grid */
  readonly cardData = input.required<ContentButton[]>();

  /** Categories for button toggle */
  readonly buttonCategories = input<string[]>();

  /** Sorting behavior for cards */
  readonly sortBy = input<SortBy>();

  /** Current category selected */
  readonly category = model<string>('featured');

  /** Returns sorted list of filtered cards by category; if "featured" always order by date */
  readonly filteredCards = computed(() => {
    const category = this.category();
    if (category === 'featured') {
      const filteredFeatured = this.cardData().filter((card) => card.categories.includes('featured'));
      const sortedCards = this.sortCards(filteredFeatured, 'newest');
      return sortedCards;
    }

    const filteredByCategory = this.cardData().filter((card) => card.categories.includes(category));
    const sortedCards = this.sortCards(filteredByCategory, this.sortBy());
    return sortedCards;
  });

  /**
   * Sorts array of cards by current sort behavior (default no sorting)
   * @param cards Cards to sort
   * @param sortBy Sorting behavior to use
   * @returns Sorted list of cards
   */
  private sortCards(cards: ContentButton[], sortBy: SortBy = 'newest'): ContentButton[] {
    switch (sortBy) {
      case 'newest':
        return cards.sort((a, b) => this.compare(b, a, 'date'));
      case 'oldest':
        return cards.sort((a, b) => this.compare(a, b, 'date'));
      case 'nameAsc':
        return cards.sort((a, b) => this.compare(a, b));
      case 'nameDes':
        return cards.sort((a, b) => this.compare(b, a));
      default:
        return cards;
    }
  }

  /**
   * Compares date or tagline of two content buttons
   * @param a first content button
   * @param b second content button
   * @param [property] Property to compare by (date or tagline)
   * @returns Comparison result
   */
  private compare(a: ContentButton, b: ContentButton, property?: string): number {
    const compareFn = new Intl.Collator().compare;
    function toTimestamp(date: string | number) {
      return typeof date === 'string' ? new Date(date).getTime() : date;
    }
    if (property === 'date') {
      return toTimestamp(a.date) - toTimestamp(b.date);
    }
    return compareFn(a.tagline, b.tagline);
  }
}
