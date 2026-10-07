import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  LOCALE_ID,
  viewChild,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { CardsModule } from '@hra-ui/design-system/cards';
import { TagItem } from '@hra-ui/design-system/cards/gallery-card';
import { ListViewComponent, ListViewGroup } from '@hra-ui/design-system/content-templates/list-view';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates/page-label';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { EndOfResultsIndicatorComponent } from '@hra-ui/design-system/indicators/end-of-results';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { NgScrollbar } from 'ngx-scrollbar';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import { FooterComponent } from '../../components/footer/footer.component';
import { ResearchCategoryId, ResearchData, ResearchItem, ResearchProjectId } from '../../schemas/research.schema';
import { ScrollbarStore } from '../../state/scrollbar/scrollbar.store';
import { TagsStore } from '../../state/tags/tags.store';
import { getDefaultThumbnail } from '../../utils/default-thumbnail';
import { parseSearch } from '../research-page/state/serialization';
import { normalizeSearchString } from '../research-page/state/with-filters.feature';

/** Display mode for research items */
export type ResearchCategoryView = 'gallery' | 'list' | 'events';

/** Group of research items for a single year */
export interface ResearchYearGroup {
  /** Year label */
  label: string;
  /** Items in the group, newest first */
  items: ResearchItem[];
}

/**
 * Research page for a single category (news, events, publications, etc.).
 * Displays items grouped by year with a search box but without the filter sidebar.
 */
@Component({
  selector: 'cns-research-category-page',
  imports: [
    HraCommonModule,
    CardsModule,
    EndOfResultsIndicatorComponent,
    FooterComponent,
    GalleryGridComponent,
    GalleryGridItemDirective,
    ListViewComponent,
    MatDivider,
    NgScrollbar,
    PageLabelComponent,
    SearchFilterComponent,
    SectionLinkComponent,
  ],
  templateUrl: './research-category-page.component.html',
  styleUrl: './research-category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchCategoryPageComponent {
  /** Research items to display */
  readonly items = input.required<ResearchData>();

  /** Page title */
  readonly title = input.required<string>();

  /** Display mode */
  readonly view = input<ResearchCategoryView>('list');

  /** Scrollbar store for managing viewport scrolling */
  protected readonly scrollbarStore = inject(ScrollbarStore);

  /** Scrollbar component reference */
  private readonly scrollbar = viewChild.required(NgScrollbar);

  /** Tags store for resolving tag labels */
  private readonly tagsStore = inject(TagsStore);

  /** Locale used for date formatting */
  private readonly locale = inject(LOCALE_ID);

  /** Search text synced with the `search` query parameter */
  protected readonly search = linkedQueryParam('search', {
    parse: parseSearch,
    replaceUrl: true,
    preserveFragment: true,
  });

  /** Items matching the search text */
  protected readonly filteredItems = computed(() => {
    const items = this.items();
    const search = this.search()?.trim();
    if (!search) {
      return items;
    }

    const normalizedSearch = normalizeSearchString(search);
    return items.filter(
      (item) =>
        normalizeSearchString(item.title).includes(normalizedSearch) ||
        normalizeSearchString(item.description).includes(normalizedSearch),
    );
  });

  /** Filtered items grouped by year (newest year first), each group sorted newest first */
  protected readonly groups = computed<ResearchYearGroup[]>(() => {
    const sorted = [...this.filteredItems()].sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime());
    const groups = new Map<number, ResearchItem[]>();
    for (const item of sorted) {
      const year = item.dateStart.getFullYear();
      let group = groups.get(year);
      if (!group) {
        group = [];
        groups.set(year, group);
      }
      group.push(item);
    }

    return Array.from(groups, ([year, items]) => ({ label: year.toString(), items }));
  });

  /** Year groups converted to list view format */
  protected readonly listGroups = computed<ListViewGroup[]>(() =>
    this.groups().map(({ label, items }) => ({
      group: label,
      items: items.map((item) => ({
        content: this.view() === 'events' ? this.formatEventContent(item) : item.description,
      })),
    })),
  );

  /** Registers the scrollbar with the scrollbar store */
  constructor() {
    effect((onCleanup) => {
      this.scrollbarStore.setScrollbar(this.scrollbar());
      onCleanup(() => this.scrollbarStore.clearScrollbar());
    });
  }

  /**
   * Gets the thumbnail URL for a research item, using the default thumbnail if not provided
   *
   * @param item research item to get thumbnail for
   * @returns thumbnail URL
   */
  getThumbnail(item: ResearchItem): string {
    return item.thumbnail || getDefaultThumbnail(item.category, item.type);
  }

  /**
   * Gets tag items from array of tag ids using the store's tags map
   * @param category research category for the tags (e.g. 'publication', 'event')
   * @param projects tag ids
   * @returns tag items (limited to 2 for display purposes)
   */
  getTagItems(category: ResearchCategoryId, projects: ResearchProjectId[]): TagItem[] {
    return this.tagsStore.getItemsByIds([category, ...projects]).slice(0, 2);
  }

  /**
   * Formats an event as markdown: a linked title followed by its date range and details
   *
   * @param item event to format
   * @returns markdown content
   */
  private formatEventContent(item: ResearchItem): string {
    const { title, dateStart, dateEnd, location, link } = item;
    const itemTitle = link ? `[${title}](${link})` : title;
    const start = formatDate(dateStart, 'mediumDate', this.locale);
    const end = formatDate(dateEnd, 'mediumDate', this.locale);
    const dates = start === end ? start : `${start} - ${end}`;
    const subtitle = `${dates} ${location ? `| ${location}` : ''}`;
    return `${itemTitle}\n\n${subtitle}`;
  }
}
