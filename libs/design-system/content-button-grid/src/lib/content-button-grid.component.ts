import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { orderBy } from 'lodash';

/** Content button interface */
export interface ContentButton {
  /** Link for the button */
  link: string;
  /** Whether the link is external */
  external: boolean;
  /** Image url */
  imageSrc: string;
  /** Date string (YYYY-MM-DD) */
  date: string;
  /** Tagline to display on card */
  tagline: string;
  /** Tags to display on bottom of the card (2 total) */
  tags: [string, string];
  /** Whether the card is featured */
  featured?: boolean;
  /** Category the card belongs to */
  category?: string;
}

/** Sorting type */
export type SortType = 'date' | 'alphabetical';

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
  readonly categories = input<string[]>();

  /** Sorting behavior to use */
  readonly sortBehavior = input<SortType>();

  /** Current category selected */
  readonly currentCategory = signal<string>('featured');

  /** Returns sorted list of filtered cards by category; if "featured" always order by date */
  readonly filteredCards = computed(() => {
    const category = this.currentCategory();
    if (category === 'featured') {
      const filteredFeatured = this.cardData().filter((card) => card.featured);
      return orderBy(filteredFeatured, 'date', 'desc');
    }

    return this.sortCards(this.cardData().filter((card) => card.category === category));
  });

  /**
   * Sorts array of cards by current sort behavior (default no sorting)
   * @param cards Cards to sort
   * @returns Sorted list of cards
   */
  private sortCards(cards: ContentButton[]): ContentButton[] {
    let sortedCards = cards;
    if (this.sortBehavior() === 'date') {
      sortedCards = orderBy(cards, 'date', 'desc');
    }
    if (this.sortBehavior() === 'alphabetical') {
      sortedCards = orderBy(cards, 'tagline');
    }

    return sortedCards.map((card) => {
      return {
        ...card,
        date: this.convertDateFormat(card.date),
      };
    });
  }

  /**
   * Converts date string to readable format (ex: September 29, 2025)
   * @param dateStr Date string
   * @returns Date in readable format
   */
  private convertDateFormat(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
